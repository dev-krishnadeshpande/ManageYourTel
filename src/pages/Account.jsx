import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import "./account.css";

const Account = () => {
  return (
    <>
      <h3>Update your account</h3>
      <div className="update-user-details-container">
        <div>
          <UpdateUserDataForm />
        </div>
        <div>
          <UpdatePasswordForm />
        </div>
      </div>
    </>
  );
};

export default Account;
