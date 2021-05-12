import SingleBook from "../books/SingleBook";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BookApi from "./../../Api/api";
import LoadingSpinner from "../common/LoadingSpinner";

/*STYEL*/
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 10,
  },
  container: {
    padding: theme.spacing(3),
  },
}));

const ProfileData = ({ currentUser }) => {
  const [userData, setUserData] = useState(null);
  const classes = useStyles();

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
  }, [currentUser.username, userData]);

  if (!userData) return <LoadingSpinner />;
  return (
    <Container className={classes.container}>
      <label for="100books">Reading progress:</label>
      You read {userData.reads.length} books!
      <progress id="100books" value={userData.reads.length} max="100">
        {userData.reads.length}
      </progress>
      <h1>{userData.username}</h1>{" "}
      <button>
        <Link to="/profileForm" exact>
          Edit Profile
        </Link>
      </button>
      <h1>{userData.firstName}</h1>
      <h1>{userData.lastName}</h1>
      <h1>{userData.email}</h1>
      You already reads:
      {userData.reads.map((i) => (
        <SingleBook id={i} />
      ))}
    </Container>
  );
};

export default ProfileData;
