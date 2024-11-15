import { useModal } from '@stores/store';
import FindPassword from '@components/Modal/FindPasswordModal/FindPassword';
//모달 상태 따라서 분기 처리
export default function ModalView() {
  const { modalState } = useModal();
  if (modalState === 'findPassword') {
    return <FindPassword />;
  }
  return null;
}
