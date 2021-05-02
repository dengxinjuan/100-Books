import SingleBook from "../books/SingleBook";
const reads = ["Qj1HAAAAMAAJ", "Lq6DpdANFdYC"];
//this page will dispaly user's progress, dispaply user's reads, and wishlist

const Profile = () => {
  return (
    <>
      <h1>This is Profile page!</h1>
      You already reads:
      {reads.map((i) => (
        <SingleBook id={i} />
      ))}
    </>
  );
};

export default Profile;
