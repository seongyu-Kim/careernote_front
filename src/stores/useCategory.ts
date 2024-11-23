import { create } from 'zustand';
import apiUtils from '@utils/apiUtils';
import { ADMIN_API } from '@routes/apiRoutes';

interface CategortStore {
  categoryList: Category[];
  getCategory: () => void;
}

interface Category {
  id: string;
  name: string;
  createdAt: string;
}

export const useCategory = create<CategortStore>((set) => ({
  categoryList: [],
  getCategory: async () => {
    const { CRUD_CATEGORY } = ADMIN_API;
    try {
      const res = await apiUtils({
        url: CRUD_CATEGORY,
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      const category = res.data
        .map((category: Category) => ({
          id: category.id,
          name: category.name,
          createdAt: category.createdAt,
        }))
        .sort(
          (a: Category, b: Category) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        );
      console.log(category);
      set({ categoryList: category });
    } catch (error) {
      console.error('카테고리 목록 요청 실패', error);
    }
  },
}));
