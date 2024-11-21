import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Styled from './PostCard.styled';
import { useAlertStore } from '@stores/store';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import DropDown from '@components/DropDown/DropDown';
import Comment from '@components/Comment/Comment';
import apiUtils from '@utils/apiUtils';
import { BOARD_COMMENT_API, NOTICE_COMMENT_API } from '@routes/apiRoutes';
import { Button, Input } from 'components';
import { useUserStore } from '@stores/userStore';
import { ErrorToast, SuccessToast } from '@utils/ToastUtils';
const { BOARD_COMMENTS, CUD_BOARD_COMMENT } = BOARD_COMMENT_API;
const { NOTICE_COMMENTS, CUD_NOTICE_COMMENT } = NOTICE_COMMENT_API;
interface PostCardProps {
  // post 관련
  post: {
    id: string;
    category: string;
    title: string;
    writer: string;
    date: string;
    content: string;
  };
  user?: string; // writer랑 일치하면 수정,삭제 가능
  level?: string; // 관리자이면 모든 글 수정, 삭제 가능
  onDelete: (postId: string) => void;
}
interface CommentProps {
  id: string;
  nickName: string;
  content: string;
  date: string;
  isOwnComment: boolean;
  count: number;
}
const PostCard = ({ post, user, level, onDelete }: PostCardProps) => {
  const { openAlert } = useAlertStore();
  const navigate = useNavigate();
  const { postId } = useParams();

  const userId = useUserStore((state) => state.user?.user_id);
  const userLevelId = useUserStore((state) => state.user?.level._id);

  const [comments, setComments] = useState<CommentProps[]>([]);
  const [commentText, setCommentText] = useState('');
  const [commentTrigger, setCommentTrigger] = useState(0);


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
  const options = [
    {
      label: '수정',
      action: handleEdit,
      visible: post.writer === user || (level === '관리자' && post.category === '공지'),
    },
    {
      label: '삭제',
      action: () =>
        openAlert('삭제하시겠습니까?', () => onDelete(post.id)),
      visible: post.writer === user || level === '관리자', // 관리자 또는 작성자 모두 삭제 가능
    },
  ].filter((option) => option.visible);

  {/*댓글*/ }

  // 댓글 가져오기
  useEffect(() => {
    const fetchPostDetails = async () => {
      if (post.category === '공지') {
        try {
          // 공지 댓글 API 
          const noticeCommentResponse = await apiUtils({
            url: NOTICE_COMMENTS(postId as string),
            method: 'GET',
          });
          console.log('공지 댓글', noticeCommentResponse);
          // 서버에서 받은 데이터 가공
          const formattedComments = noticeCommentResponse.noticecomments.map((comment: any) => ({
            id: comment._id,
            nickName: comment.user_id.nickname,
            content: comment.content,
            date: new Date(comment.createdAt).toLocaleDateString(),
            isOwnComment: comment.user_id._id === userId,
          }));
          setComments(formattedComments);
        } catch (error) {
          console.error('공지 댓글 조회 실패', error);
        }
        return;
      } else {
        try {
          // 일반 게시글 댓글 API 
          const boardCommentResponse = await apiUtils({
            url: BOARD_COMMENTS(postId as string),
            method: 'GET',
          });
          console.log('게시글 댓글 ', boardCommentResponse);
          // 서버에서 받은 데이터 가공
          const formattedComments = boardCommentResponse.boardcomments.map((comment: any) => ({
            id: comment._id,
            nickName: comment.user_id.nickname,
            content: comment.content,
            date: new Date(comment.createdAt).toLocaleDateString(),
            isOwnComment: comment.user_id._id === userId,
          }));
          setComments(formattedComments);
        } catch (error) {
          console.error('게시글 댓글 조회 실패:', error);
        }
      }
    };

    fetchPostDetails();
  }, [commentTrigger])

  // 댓글 삭제
  const handleCommentDelete = async (id: string) => {
    openAlert('댓글을 삭제하시겠습니까?', () => handleCommentDeleteConfirm(id));
  };
  const handleCommentDeleteConfirm = async (id: string) => {
    let data;
    if (post.category === '공지') {
      try {
        data = {
          "user_id": userId,
          "comment_id": id,
          "level": userLevelId
        }
        const response = await apiUtils({
          url: CUD_NOTICE_COMMENT,
          method: 'DELETE',
          data: data
        });
        console.log('공지 댓글 삭제 성공', response);
        SuccessToast('댓글이 삭제되었습니다.')
        setCommentTrigger((prev) => prev + 1);
      } catch (error) {
        console.log('공지 댓글 삭제 성공', error);
        ErrorToast('다시 시도해주세요.')
      }
    } else {
      try {
        data = {
          "user_id": userId,
          "comment_id": id,
          "level": userLevelId
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
  const handleCommentSubmit = async () => {
    let data;
    if (post.category === '공지') {
      data = {
        content: commentText,
        user_id: userId,
        board_id: postId
      };
      try {
        const response = await apiUtils({
          url: CUD_NOTICE_COMMENT,
          method: 'POST',
          data: data,
        });
        console.log('공지 댓글 생성 완료', response);
        SuccessToast('댓글이 등록되었습니다.')
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
        setCommentTrigger((prev) => prev + 1);
      }
    }
  };

  // 댓글 수정
  const handleCommentEdit = async (id: string, content: string) => {
    let data;
    if (post.category === '공지') {
      data = {
        "content": content,
        "user_id": userId,
        "comment_id": id
      }
      try {
        const response = await apiUtils({
          url: CUD_NOTICE_COMMENT,
          method: 'PUT',
          data: data
        })
        console.log('공지 댓글 수정 성공', response);
        SuccessToast('댓글이 수정되었습니다.');
      } catch (error) {
        console.log('공지 댓글 수정 실패', error);
        ErrorToast('댓글 수정에 살패했습니다.')
      }
    } else {
      data = {
        "content": content,
        "user_id": userId,
        "comment_id": id
      }
      try {
        const response = await apiUtils({
          url: CUD_BOARD_COMMENT,
          method: 'PUT',
          data: data
        })
        console.log('게시글 댓글 수정 성공', response);
        SuccessToast('댓글이 수정되었습니다.');
      } catch (error) {
        console.log('게시글 댓글 수정 실패', error);
        ErrorToast('댓글 수정에 살패했습니다.')
      } finally {
        setCommentTrigger((prev) => prev + 1);
      }
    };
  }
  return (
    <Styled.Container>
      <Styled.ContainerHeader >
        <Styled.Category category={post.category ?? '공지'}>
          {post.category ?? '공지'}
        </Styled.Category>
        <DropDown
          options={options}
          icon={<BiDotsVerticalRounded size={24} />}
          noOptionsMessage="권한 없음"
        />
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
        >
          등록
        </Button>
      </Styled.CommentContainer>

    </Styled.Container>
  );
};

export default PostCard;
