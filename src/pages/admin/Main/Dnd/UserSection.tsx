import * as Styled from '@pages/admin/Main/AdminMain.styled';
import DraggableUser from './DraggableUser';
import { User, UserLevel } from '@/type/user';
import { useUserDrop } from '@utils/dndUtils';

interface UserSectionProps {
  title: string;
  level: UserLevel;
  users: User[];
  onUserDrop: (user: string, newLevel: UserLevel) => void;
  onDelete: (id: string, userEmail: string) => void;
}
{
  /**드래그앤드랍 영역 */
}
const UserSection = ({ title, level, users, onUserDrop, onDelete }: UserSectionProps) => {
  const [{ isOver }, drop] = useUserDrop((user: User) => {
    const newLevel = user.level === '삐약이' ? '꼬꼬닭' : '삐약이';
    if (user && user.id) {
      onUserDrop(user.id, newLevel);
    }
  });

  return (
    <>
      <Styled.SectionSubtitle>{title}</Styled.SectionSubtitle>
      <Styled.UserSection
        ref={drop}
        style={{
          backgroundColor: isOver ? '#f0f0f0' : '#ececec',
        }}>
        <Styled.UserList>
          {users.map((user) => (
            <DraggableUser key={user.email} user={user} onDelete={() => onDelete(user.id, user.email)} />
          ))}
        </Styled.UserList>
      </Styled.UserSection>
    </>
  );
};
export default UserSection;
