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
import { PostProps } from '@/type/post';
import { commentApiUtils } from '@utils/editDeleteUtils';
const { BOARD_COMMENTS } = BOARD_COMMENT_API;
const { NOTICE_COMMENTS } = NOTICE_COMMENT_API;
const { DETAILS_BOARD } = BOARD_API;
const { DETAILS_BOARD: DETAILS_NOTICE } = NOTICE_API;
interface PostCardProps {
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
const PostCard = ({ onDelete }: PostCardProps) => {
  const { openAlert } = useAlertStore();
  const navigate = useNavigate();
  const { postId } = useParams();
  const location = useLocation();
  const { category } = location.state || {};
  const user = useUserStore((state) => state.user);
  const userId = user?.user_id;
  const userName = user?.nickName;
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
      try {
        const isNotice = !category || category === '공지';
        const response = await apiUtils({
          url: isNotice ? DETAILS_NOTICE(postId) : DETAILS_BOARD(postId),
          method: 'GET',
        });

        console.log(`${isNotice ? '공지' : '게시글'} 상세 데이터:`, response);

        // 상세 데이터 처리
        const res = isNotice ? response.noticeDoc : response.DetailBoard;
        const updatedPost: PostProps = {
          id: res._id,
          title: res.title,
          content: res.content,
          category: isNotice ? '공지' : res.category?.name || '알 수 없음',
          writer: res.user?.nickname || '알 수 없는 사용자',
          date: new Date(res.updatedAt).toLocaleString(),
        };
        setPost(updatedPost);

        // 댓글 데이터 처리
        const commentsKey = isNotice ? 'NoticeComment' : 'BoardComment';
        const formattedComments = res[commentsKey].map((comment: any) => ({
          id: comment._id,
          nickName: comment.user.nickname,
          content: comment.content,
          date: new Date(comment.updatedAt).toLocaleDateString(),
          isOwnComment: comment.user._id === userId,
        }));
        setComments(formattedComments);
      } catch (error) {
        console.error(`${!category || category === '공지' ? '공지' : '게시글'} API 요청 실패:`, error);
      }
    };

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
    await commentApiUtils(id, 'DELETE', post.category);
    setCommentTrigger((prev) => prev + 1);
  };

  // 댓글 등록
  const handleCommentSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (commentText.trim() === '') {
      WarnToast('댓글의 내용을 입력하세요');
      return;
    }
    const data = { content: commentText };
    await commentApiUtils(postId as string, 'POST', post.category, data)
    setCommentTrigger((prev) => prev + 1);
    setCommentText('');

  };

  // 댓글 수정
  const handleCommentEdit = async (id: string, content: string) => {
    const data = { newContent: content };
    await commentApiUtils(id, 'PUT', post.category, data);
    setCommentTrigger((prev) => prev + 1);
  };


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
      <Styled.CommentTitle>댓글 ({comments.length || 0})</Styled.CommentTitle>
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
