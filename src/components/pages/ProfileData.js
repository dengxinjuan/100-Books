import SingleBook from "../books/SingleBook";
import { useState, useEffect } from "react";
import BookApi from "./../../Api/api";
import LoadingSpinner from "../common/LoadingSpinner";

const ProfileData = ({ currentUser }) => {
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
    <div>
      <h1>{userData.username}</h1>
      <h1>{userData.firstName}</h1>
      <h1>{userData.lastName}</h1>
      <h1>{userData.email}</h1>
      You already reads:
      {userData.reads.map((i) => (
        <SingleBook id={i} />
      ))}
    </div>
  );
};

export default ProfileData;
