import useGetUser from "./useGetUser";
import "./userAvatar.css";

function UserAvatar() {
  const { user } = useGetUser();
  const { fullName, avatar } = user.user_metadata;

  return (
    <div className="user-avatar-container">
      <img
        className="user-image"
        src={avatar || "default-user.jpg"}
        alt={`Avatar of ${fullName}`}
      />
      <span>{fullName}</span>
    </div>
  );
}

export default UserAvatar;
