import * as Styled from '@components/AdminMain/AdminMain.styled';
import DraggableUser from "./DraggableUser";
import { User, UserLevel } from "@/type/user";
import { useUserDrop } from "@utils/dndUtils";

interface UserSectionProps {
  title: string;
  level: UserLevel;
  users: User[];
  onUserDrop: (user: User, newLevel: UserLevel) => void;
  onDelete: (id: string) => void;
}
{/**드래그앤드랍 영역 */ }
const UserSection = ({ title, level, users, onUserDrop, onDelete }: UserSectionProps) => {
  const [{ isOver }, drop] = useUserDrop((user) => onUserDrop(user, level));

  return (
    <>
      <Styled.SectionSubtitle>
        {title}
      </Styled.SectionSubtitle>
      <Styled.UserSection
        ref={drop}
        style={{
          backgroundColor: isOver ? '#f0f0f0' : '#ececec',
        }}
      >
        <Styled.UserList>
          {users.map((user) => (
            <DraggableUser
              key={user.email}
              user={user}
              onDelete={() => onDelete(user.id)}
            />
          ))}
        </Styled.UserList>
      </Styled.UserSection>
    </>
  );
};
export default UserSection;