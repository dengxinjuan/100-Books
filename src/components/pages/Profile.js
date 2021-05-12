import UserContext from "../auth/UserContext";
import { useContext } from "react";
import LoadingSpinner from "../common/LoadingSpinner";
import ProfileData from "./ProfileData";

//this page will dispaly user's progress, dispaply user's reads, and wishlist

const Profile = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <>
      {currentUser.username ? (
        <ProfileData currentUser={currentUser} />
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};

export default Profile;
