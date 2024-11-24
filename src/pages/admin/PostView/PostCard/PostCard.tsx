import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import * as Styled from './PostCard.styled';
import { useAlertStore } from '@stores/store';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import apiUtils from '@utils/apiUtils';
import { ErrorToast, SuccessToast, WarnToast } from '@utils/ToastUtils';
import { BOARD_API, BOARD_COMMENT_API, NOTICE_API, NOTICE_COMMENT_API } from '@routes/apiRoutes';
import { Button, DropDown, Comment } from 'components';
import { useUserStore } from '@stores/userStore';
const { CUD_BOARD_COMMENT } = BOARD_COMMENT_API;
const { CUD_NOTICE_COMMENT, NOTICE_COMMENTS } = NOTICE_COMMENT_API;
const { DETAILS_BOARD, CUD_BOARD } = BOARD_API;
const { DETAILS_BOARD: DETAILS_NOTICE } = NOTICE_API;
interface PostCardProps {
  onDelete: (postId: string) => void;
}
interface PostProps {
  title: string;
  content: string;
  category: string;
  date: string;
  writer: string;
  id: string;
}
interface CommentProps {
  id: string;
  nickName: string;
  content: string;
  date: string;
  isOwnComment: boolean;
  count: number;
}
const PostCard = ({ onDelete }: PostCardProps) => {
  const { openAlert } = useAlertStore();
  const navigate = useNavigate();
  const { postId } = useParams();
  const location = useLocation();
  const { category } = location.state || {};
  const user = useUserStore((state) => state.user);
  const userId = user?.user_id;
  const userName = user?.nickName;
  const userLevelId = user?.level._id;
  const userLevel = user?.level.name || '';

  const [comments, setComments] = useState<CommentProps[]>([]);
  const [commentText, setCommentText] = useState('');
  const [commentTrigger, setCommentTrigger] = useState(0);

  const [post, setPost] = useState<PostProps>({
    title: '',
    content: '',
    category: '',
    date: '',
    writer: '',
    id: '',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 상세 조회
  useEffect(() => {
    if (!postId) {
      console.error('해당 postId가 없습니다.');
      return;
    }

    const fetchPostDetails = async () => {
      if (!category || category === '공지') { //공지는 카테고리 필드가 없음 나중에 수정 요망
        try {
          // 공지 API 
          const noticeResponse = await apiUtils({
            url: DETAILS_NOTICE(postId),
            method: 'GET',
          });

          console.log('공지 상세 데이터:', noticeResponse);
          const res = noticeResponse.notice;
          const updatedPost: PostProps = {
            ...res,
            date: new Date(res.updatedAt).toLocaleString(),
            writer: '관리자',
            category: '공지'
          };

          setPost(updatedPost);
          const formattedComments = res.comments.map((comment: any) => ({
            id: comment._id,
            nickName: comment.user.nickname,
            content: comment.content,
            date: new Date(comment.updatedAt).toLocaleDateString(),
            isOwnComment: comment.user._id === userId,
          }));
          setComments(formattedComments);

        } catch (noticeError) {
          console.warn('공지 API 실패, 일반 게시글 API 시도:', noticeError);
        }
      }
      else {
        try {
          // 공지 외 카테고리 API 
          const boardResponse = await apiUtils({
            url: DETAILS_BOARD(postId),
            method: 'GET',
          });

          console.log('게시글 상세 데이터:', boardResponse);
          const res = boardResponse.DetailBoard;
          const updatedPost: PostProps = {

            id: res._id,
            title: res.title,
            content: res.content,
            category: res.category?.name || '알 수 없음',
            writer: res.user?.nickname || '알 수 없는 사용자',
            date: new Date(res.updatedAt).toLocaleString(),
          };
          setPost(updatedPost);
          const formattedComments = res.boardcomment.map((comment: any) => ({
            id: comment._id,
            nickName: comment.user_id.nickname,
            content: comment.content,
            date: new Date(comment.updatedAt).toLocaleDateString(),
            isOwnComment: comment.user_id._id === userId,
          }));
          setComments(formattedComments);
        } catch (boardError) {
          console.error('게시글 상세 조회 실패:', boardError);
        }
      }
    }
    fetchPostDetails();
  }, [postId, commentTrigger]);

  // 글 수정 페이지로 이동
  const handleEdit = () => {
    // 수정할 글의 데이터를 state로 전달하여 /write 페이지로 이동
    const targetPath = post.category === '공지' ? '/admin-write' : '/write';
    navigate(targetPath, {
      state: {
        category: post.category,
        title: post.title,
        writer: post.writer,
        date: post.date,
        content: post.content,
        postId: post.id
      },
    });
  };
  // 드롭다운에 보여질 옵션 (수정, 삭제)
  const options = [
    {
      label: '수정',
      action: handleEdit,
      visible: post.writer === userName || (userLevel === '관리자' && post.category === '공지'),
    },
    {
      label: '삭제',
      action: () =>
        openAlert('삭제하시겠습니까?', () => onDelete(postId as string)),
      visible: post.writer === userName || userLevel === '관리자', // 관리자 또는 작성자 모두 삭제 가능
    },
  ].filter((option) => option.visible);

  {/*댓글*/ }

  // 댓글 삭제
  const handleCommentDelete = async (id: string) => {
    openAlert('댓글을 삭제하시겠습니까?', () => handleCommentDeleteConfirm(id));
  };
  const handleCommentDeleteConfirm = async (id: string) => {
    let data;
    if (post.category === '공지') {
      try {
        const response = await apiUtils({
          url: NOTICE_COMMENTS(id),
          method: 'DELETE',
        });
        console.log('공지 댓글 삭제 성공', response);
        SuccessToast('댓글이 삭제되었습니다.');
        setCommentTrigger((prev) => prev + 1);
      } catch (error) {
        console.log('공지 댓글 삭제 성공', error);
        ErrorToast('다시 시도해주세요.')
      }
    } else {
      try {
        data = {
          "user_id": userId,
          "boardcomment_id": id,
          "board_id": postId
        }
        const response = await apiUtils({
          url: CUD_BOARD_COMMENT,
          method: 'DELETE',
          data: data
        });
        console.log('게시글 댓글 삭제 성공', response);
        SuccessToast('댓글이 삭제되었습니다.');
        setCommentTrigger((prev) => prev + 1);
      } catch (error) {
        console.log('게시글 댓글 삭제 성공', error);
        ErrorToast('다시 시도해주세요.');
      };
    };
  };

  // 댓글 등록
  const handleCommentSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (commentText === '') {
      WarnToast('댓글의 내용을 입력하세요');
      return;
    }
    let data;
    if (post.category === '공지') {
      data = {
        content: commentText,
        user_id: userId,
        notice_id: postId
      };
      try {
        const response = await apiUtils({
          url: CUD_NOTICE_COMMENT,
          method: 'POST',
          data: data,
        });
        console.log('공지 댓글 생성 완료', response);
        SuccessToast('댓글이 등록되었습니다.')
        setCommentTrigger((prev) => prev + 1);
      } catch (error) {
        console.log('공지 댓글 생성 실패', error);
        ErrorToast('댓글 등록이 실패했습니다.');
      } finally {
        setCommentText('');
      }
    } else {
      data = {
        content: commentText,
        user_id: userId,
        board_id: postId
      }
      try {
        const response = await apiUtils({
          url: CUD_BOARD_COMMENT,
          method: 'POST',
          data: data,
        });
        console.log('게시글 댓글 생성 완료', response);
        SuccessToast('댓글이 등록되었습니다.');
        setCommentTrigger((prev) => prev + 1);
      } catch (error) {
        console.log('게시글 댓글 생성 실패', error);
        ErrorToast('댓글 등록이 실패했습니다.')
      } finally {
        setCommentText('');
      }
    }
  };

  // 댓글 수정
  const handleCommentEdit = async (id: string, content: string) => {
    let data;
    if (post.category === '공지') {
      data = {
        "content": content
      }
      try {
        const response = await apiUtils({
          url: NOTICE_COMMENTS(id),
          method: 'PUT',
          data: data
        })
        console.log('공지 댓글 수정 성공', response);
        SuccessToast('댓글이 수정되었습니다.');
        setCommentTrigger((prev) => prev + 1);
      } catch (error) {
        console.log('공지 댓글 수정 실패', error);
        ErrorToast('댓글 수정에 살패했습니다.')
      }
    } else {
      data = {
        "content": content,
        "user_id": userId,
        "boardcomment_id": id
      }
      try {
        const response = await apiUtils({
          url: CUD_BOARD_COMMENT,
          method: 'PUT',
          data: data
        })
        console.log('게시글 댓글 수정 성공', response);
        SuccessToast('댓글이 수정되었습니다.');
        setCommentTrigger((prev) => prev + 1);
      } catch (error) {
        console.log('게시글 댓글 수정 실패', error);
        ErrorToast('댓글 수정에 살패했습니다.')
      }
    };
  }

  return (
    <Styled.Container>
      <Styled.ContainerHeader >
        <Styled.Category category={post.category ?? '공지'}>
          {post.category ?? '공지'}
        </Styled.Category>
        {(post.writer === userName || userLevel === '관리자') &&
          <DropDown
            options={options}
            icon={<BiDotsVerticalRounded size={24} />}
            noOptionsMessage="권한 없음"
          />}
      </Styled.ContainerHeader>
      <Styled.Title>{post.title || '알 수 없는 글'}</Styled.Title>
      <Styled.Writer>{post.writer || '알 수 없는 사용자'}</Styled.Writer>
      <Styled.Date>{post.date}</Styled.Date>
      <Styled.Content>{post.content}</Styled.Content>

      {/* 댓글 컴포넌트 */}
      <Styled.Title>댓글 ({comments.length || 0})</Styled.Title>
      <>
        {comments.map((comment, index) => (
          <Comment
            key={index}
            nickName={comment.nickName}
            content={comment.content}
            date={comment.date}
            isOwnComment={comment.isOwnComment}
            levelName={userLevel}
            onEdit={(updatedContent) => handleCommentEdit(comment.id, updatedContent)}
            onDelete={() => handleCommentDelete(comment.id)}
          />
        ))}
      </>
      <Styled.CommentContainer>
        <Styled.Textarea
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setCommentText(e.target.value)}
          value={commentText}
          placeholder="댓글을 입력하세요."
        />
        <Button
          onClick={handleCommentSubmit}
          width='100px'
          backgroundColor="#79B0CB"
          padding="5px 10px"
          textColor="white"
          border="none"
          useHover={true}
          useTransition={true}
          transitionDuration={0.3}
          hoverBackgroundColor="#3F82AC"
        >
          등록
        </Button>
      </Styled.CommentContainer>

    </Styled.Container>
  );
};

export default PostCard;
