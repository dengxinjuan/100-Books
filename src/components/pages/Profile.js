import SingleBook from "../books/SingleBook";
import UserContext from "../auth/UserContext";
import { useContext } from "react";
//const reads = ["Qj1HAAAAMAAJ", "Lq6DpdANFdYC"];
//this page will dispaly user's progress, dispaply user's reads, and wishlist

const Profile = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  console.log(currentUser);
  const reads = currentUser.reads;
  return (
    <>
      <h1>This is Profile page!</h1>
      <h1>{currentUser.username}</h1>
      You already reads:
      {reads.map((i) => (
        <SingleBook id={i} />
      ))}
    </>
  );
};

export default Profile;
