import UserContext from "../auth/UserContext";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../common/LoadingSpinner";
import ProfileData from "./ProfileData";
import BookApi from "../../Api/api";

//this page will dispaly user's progress, dispaply user's reads, and wishlist

const Profile = () => {
  const { currentUser } = useContext(UserContext);
  const num = currentUser.reads.length;

  return (
    <>
      <h1>This is Profile page!</h1>
      <label for="100books">Reading progress:</label>
      You read {num} books!
      <progress id="100books" value={num} max="100">
        {num}
      </progress>
      <button>
        <Link to="/profileForm" exact>
          Edit Profile
        </Link>
      </button>
      {currentUser.username ? (
        <ProfileData currentUser={currentUser} />
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};

export default Profile;
