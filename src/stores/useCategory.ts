import { create } from 'zustand';
import apiUtils from '@utils/apiUtils';
import { ADMIN_API } from '@routes/apiRoutes';
import { ErrorToast } from '@utils/ToastUtils';

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
    // const { CRUD_CATEGORY } = ADMIN_API;
    try {
      const res = await apiUtils({
        // url: CRUD_CATEGORY,
        url: 'dd',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      if (!res) {
        ErrorToast('카테고리 목록 불러오기 실패');
        return;
      }
      const category = res.data
        .map((category: any) => ({
          id: category._id,
          name: category.name,
          createdAt: category.createdAt,
        }))
        .sort(
          (a: Category, b: Category) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        );
      set(() => {
        return { categoryList: category };
      });
    } catch (error) {
      console.error('카테고리 목록 요청 실패', error);
    }
  },
}));
