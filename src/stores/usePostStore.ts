import { create } from 'zustand';
import apiUtils from '@utils/apiUtils';
import { BOARD_API, NOTICE_API } from '@routes/apiRoutes';

const { ALL_BOARD, CATEGORY } = BOARD_API;
const { ALL_NOTICES } = NOTICE_API;

interface Post {
  _id: number;
  title: string;
  category: string;
  user: User;
  createdAt: string;
  [key: string]: any;
}

interface User {
  _id: number;
  nickname: string;
  level: string;
}

interface PostStore {
  selectedCategory: string;
  posts: Post[];
  filteredPosts: Post[];
  totalPostCount: number;
  fetchAllPosts: (page?: number, size?: number) => Promise<void>;
  setCategory: (category: string) => void;
}

export const usePostStore = create<PostStore>((set, get) => ({
  selectedCategory: '자유게시판', // 기본 카테고리
  posts: [],
  filteredPosts: [],
  totalPostCount: 0,

  // 모든 게시글 API 호출
  fetchAllPosts: async (page = 1, size = 20) => {
    try {
      const { selectedCategory } = get();

      // 공지사항(첫 페이지에서만 요청)
      const notices =
        page === 1
          ? await apiUtils({
              url: `${ALL_NOTICES}?page=${page}&size=${size}`,
              method: 'GET',
            }).then((res) => res.Notices)
          : [];

      // 게시글
      const posts = await apiUtils({
        url:
          selectedCategory === '자유게시판'
            ? `${ALL_BOARD}?page=${page}&size=${size}`
            : `${CATEGORY(selectedCategory)}?page=${page}&size=${size}`,
        method: 'GET',
      });

      const { boards, count } = posts;
      console.log('카테고리별 일반 게시글:', boards);

      console.log('공지 + 게시글:', notices, posts);
      console.log('전체 게시글 수:', count);
      console.log(page, size);

      // 공지 + 게시글
      set({ posts: [...notices, ...boards] });

      // 필터링
      let filtered: Post[] = [];
      if (selectedCategory === '자유게시판') {
        filtered = [...notices, ...boards];
      } else if (selectedCategory === '공지') {
        filtered = [...notices];
      } else {
        filtered = [...boards];
      }

      set({ filteredPosts: filtered, totalPostCount: count });
    } catch (error) {
      console.error('게시글 가져오기 실패:', error);
    }
  },

  setCategory: (category) => set({ selectedCategory: category }),
}));
