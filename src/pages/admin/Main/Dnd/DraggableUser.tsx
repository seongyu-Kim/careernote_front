import Button from '@components/Button/Button';
import * as Styled from '@pages/admin/Main/AdminMain.styled';
import { useUserDrag } from '@utils/dndUtils';
import { User } from '@/type/user';

interface DraggableUserProps {
  user: User;
  onDelete: () => void;
}
{
  /**드래그앤드랍 되는 요소 */
}
const DraggableUser = ({ user, onDelete }: DraggableUserProps) => {
  const [{ isDragging }, drag] = useUserDrag(user);
  return (
    <Styled.UserItem ref={drag} style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move' }}>
      <Styled.UserEmail>{user.email}</Styled.UserEmail>
      <Styled.PostCount>{user.postCount}</Styled.PostCount>
      <Button
        textColor="white"
        backgroundColor='#E25151'
        border="none"
        width="20%"
        onClick={onDelete}
        useTransition={true}
        transitionDuration={0.3}
        useHover={true}
        hoverBackgroundColor="#CD4444">
        탈퇴
      </Button>
    </Styled.UserItem>
  );
};
export default DraggableUser;
