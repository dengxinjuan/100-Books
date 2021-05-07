import SingleBook from "../books/SingleBook";

const ProfileData = ({ currentUser }) => {
  return (
    <div>
      <h1>{currentUser.username}</h1>
      <h1>{currentUser.firstName}</h1>
      <h1>{currentUser.lastName}</h1>
      <h1>{currentUser.email}</h1>
      You already reads:
      {currentUser.reads.map((i) => (
        <SingleBook id={i} />
      ))}
    </div>
  );
};

export default ProfileData;
