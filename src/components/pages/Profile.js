import UserContext from "../auth/UserContext";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../common/LoadingSpinner";
import ProfileData from "./ProfileData";
import BookApi from "../../Api/api";

//this page will dispaly user's progress, dispaply user's reads, and wishlist

const Profile = () => {
  const { currentUser } = useContext(UserContext);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function getData() {
      try {
        const data = await BookApi.getTheUser(currentUser.username);
        console.log(data);
        setUserData(data);
        //console.log(userData);
      } catch (e) {
        console.error(e);
      }
    }
    getData();
  }, []);

  if (!userData) return <LoadingSpinner />;

  return (
    <>
      <h1>This is Profile page!</h1>
      <button>
        <Link to="/profileForm" exact>
          Edit Profile
        </Link>
      </button>
      <ProfileData currentUser={userData} />
    </>
  );
};

export default Profile;
