import { useModal } from '@stores/store';
import FindPassword from '@pages/user/FindPassword/FindPassword';
import { MyInfo } from '@pages/user/MyInfo/MyInfo';
import AddCategory from '@pages/admin/AddCategory/AddCategory';
//모달 상태 따라서 분기 처리
export default function ModalView() {
  const { modalState } = useModal();
  if (modalState === 'findPassword') {
    return <FindPassword />;
  }
  if (modalState === 'MyInfo') {
    return <MyInfo />;
  }
  if (modalState === 'addCategory') {
    return <AddCategory />;
  }
  return null;
}
