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
      <h2>You read {num} books!</h2>
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
