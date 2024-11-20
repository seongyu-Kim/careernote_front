import { create } from 'zustand';
import apiUtils from '@utils/apiUtils';
import { BOARD_API, NOTICE_API } from '@routes/apiRoutes';

const { ALL_BOARD } = BOARD_API;
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
  fetchAllPosts: () => Promise<void>;
  setCategory: (category: string) => void;
}

export const usePostStore = create<PostStore>((set, get) => ({
  selectedCategory: '자유게시판',
  posts: [],
  filteredPosts: [],

  // 카테고리 설정
  setCategory: (category) => set({ selectedCategory: category }),

  // 모든 게시글 가져오기
  fetchAllPosts: async () => {
    try {
      const [notices, posts] = await Promise.all([
        apiUtils({ url: ALL_NOTICES, method: 'GET' }).then((res) => res.Notices), //공지 호출
        apiUtils({ url: ALL_BOARD, method: 'GET' }).then((res) => res.boards), //게시글 호출
      ]);

      set({ posts: [...notices, ...posts] }); //공지, 게시글 합체
      console.log('전체 게시글(자유게시판):', [...notices, ...posts]);

      const { selectedCategory } = get();
      let filtered: Post[] = [];

      if (selectedCategory === '자유게시판') {
        filtered = [...notices, ...posts];
      } else if (selectedCategory === '공지') {
        // 공지일 경우 category 필드가 없는 게시글만
        filtered = [...notices, ...posts].filter((post) => !post.category);
      } else {
        // 등업, 취업정보, 스터디
        filtered = [...notices, ...posts].filter((post) => post.category === selectedCategory);
      }

      set({ filteredPosts: filtered });
    } catch (error) {
      console.error('전체 게시글 가져오기 실패:', error);
    }
  },
}));
