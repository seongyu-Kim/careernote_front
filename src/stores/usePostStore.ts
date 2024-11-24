import { create } from 'zustand';
import apiUtils from '@utils/apiUtils';
import { BOARD_API, NOTICE_API } from '@routes/apiRoutes';

const { ALL_BOARD } = BOARD_API;
const { CATEGORY } = BOARD_API;
const { ALL_NOTICES } = NOTICE_API;

interface Post {
  _id: string;
  title: string;
  category: string;
  user: User;
  createdAt: string;
  [key: string]: any;
}

interface User {
  _id: string;
  nickname: string;
  level: string;
}

interface PostStore {
  selectedCategory: string;
  posts: Post[];
  postsByCategory: Post[];
  totalPostCount: number;
  fetchAllPosts: (page?: number, size?: number) => Promise<void>;
  fetchPostsByCategory: (page?: number, size?: number) => Promise<void>;
  fetchNoticePosts: (page?: number, size?: number) => Promise<void>;
  setCategory: (category: string) => void;
  currentPage: number;
  setCurrentPage: (page?: number) => void;
}

export const usePostStore = create<PostStore>((set, get) => ({
  selectedCategory: '전체게시판',
  posts: [],
  postsByCategory: [],
  totalPostCount: 0,
  currentPage: 1,

  // 모든 게시글
  fetchAllPosts: async (page = 1, size = 20) => {
    try {
      const { selectedCategory } = get();

      const notices =
        page === 1
          ? await apiUtils({
              url: `${ALL_NOTICES}?page=${page}&size=${size}`,
              method: 'GET',
            }).then((res) => res.notice || [])
          : [];

      const posts = await apiUtils({
        url: `${ALL_BOARD}?page=${page}&size=${size}`,
        method: 'GET',
      });

      const { boards, count } = posts;

      if (selectedCategory === '전체게시판') {
        set({ posts: [...notices, ...boards] });
      }

      set({ totalPostCount: count });
    } catch (error) {
      console.error('게시글 가져오기 실패:', error);
    }
  },

  // 카테고리별 게시글
  fetchPostsByCategory: async (page = 1, size = 20) => {
    try {
      const { selectedCategory } = get();
      if (selectedCategory !== '전체게시판' && selectedCategory !== '공지') {
        const postsByCategory = await apiUtils({
          url: `${CATEGORY(selectedCategory)}?page=${page}&size=${size}`,
          method: 'GET',
        });

        set({ postsByCategory: postsByCategory?.posts || [] });
        set({ totalPostCount: postsByCategory.count });
      }
    } catch (error) {
      console.error('카테고리별 게시글 가져오기 실패:', error);
    }
  },

  // 공지
  fetchNoticePosts: async (page = 1, size = 20) => {
    try {
      const notices = await apiUtils({
        url: `${ALL_NOTICES}?page=${page}&size=${size}`,
        method: 'GET',
      }).then((res) => res.notice || []);

      set({ posts: notices });
      set({ totalPostCount: notices.length });
    } catch (error) {
      console.error('공지사항 가져오기 실패:', error);
    }
  },

  // 카테고리
  setCategory: async (category: string) => {
    set({ selectedCategory: category });
    set({ currentPage: 1 });

    if (category === '공지') {
      await get().fetchNoticePosts(1, 20);
    } else if (category === '전체게시판') {
      await get().fetchAllPosts(1, 20);
    } else {
      await get().fetchPostsByCategory(1, 20);
    }
  },

  setCurrentPage: (page: number = 1) => set({ currentPage: page }),
}));
