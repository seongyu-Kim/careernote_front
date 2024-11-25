import { create } from 'zustand';
import apiUtils from '@utils/apiUtils';
import { ADMIN_API } from '@routes/apiRoutes';
import { SuccessToast, ErrorToast } from '@utils/ToastUtils';

const { CRD_CATEGORY } = ADMIN_API;

interface Category {
  name: string;
  _id: string;
}

interface CategoryState {
  categories: Category[];
  fetchCategories: () => Promise<void>;
  selectedWriteCategory: string;
  setSelectedWriteCategory: (category: string) => void;
  addCategory: (categoryName: string) => Promise<void>;
  deleteCategory: (categoryName: string) => Promise<void>;
}

export const useCategoryStore = create<CategoryState>((set, get) => ({
  categories: [],
  selectedWriteCategory: '선택', // 기본값 설정
  setSelectedWriteCategory: (category: string) => set({ selectedWriteCategory: category }),

  // 카테고리 목록
  fetchCategories: async () => {
    try {
      const response = await apiUtils({
        url: CRD_CATEGORY,
        method: 'GET',
      });
      set({ categories: response.data });
      console.log(get().categories);
    } catch (error) {
      ErrorToast('카테고리 목록을 가져오는 데 실패했습니다.');
    }
  },

  addCategory: async (categoryName: string) => {
    if (!categoryName) return;

    try {
      const response = await apiUtils({
        url: CRD_CATEGORY,
        method: 'POST',
        data: { name: categoryName },
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      console.log('response:', response);

      if (response.message === '카테고리 생성 완료') {
        SuccessToast('카테고리 생성 성공');

        await get().fetchCategories();
      } else {
        throw new Error('응답 데이터');
      }
    } catch (error) {
      ErrorToast('카테고리 생성 실패');
      throw error;
    }
  },

  // 카테고리 삭제
  deleteCategory: async (categoryName: string) => {
    try {
      await apiUtils({
        url: CRD_CATEGORY,
        method: 'DELETE',
        data: { name: categoryName },
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      set((state) => ({
        categories: state.categories.filter((category) => category.name !== categoryName), // 이름 비교
      }));

      SuccessToast('카테고리 삭제 성공');
    } catch (error) {
      ErrorToast('카테고리 삭제 실패');
      console.error(error);
    }
  },
}));
