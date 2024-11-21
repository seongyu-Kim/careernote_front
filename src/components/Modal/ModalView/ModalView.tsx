import { useModal } from '@stores/store';
import FindPassword from '@pages/user/FindPassword/FindPassword';
import { MyInfo } from '@pages/user/MyInfo/MyInfo';
//모달 상태 따라서 분기 처리
export default function ModalView() {
  const { modalState } = useModal();
  if (modalState === 'findPassword') {
    return <FindPassword />;
  }
  if (modalState === 'MyInfo') {
    return <MyInfo />;
  }
  return null;
}
