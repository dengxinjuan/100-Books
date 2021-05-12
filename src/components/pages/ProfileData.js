import SingleBook from "../books/SingleBook";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BookApi from "./../../Api/api";
import LoadingSpinner from "../common/LoadingSpinner";

/*STYEL*/
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: 100,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
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
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <label for="100books">Reading progress:</label>
            <h1>You read {userData.reads.length} books!</h1>
            <progress id="100books" value={userData.reads.length} max="100">
              {userData.reads.length}
            </progress>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <div>
              <h2>{userData.username}</h2>{" "}
              <Button size="small" variant="contained">
                <Link to="/profileForm" exact>
                  Edit Profile
                </Link>
              </Button>
            </div>
            <h1>Firstname: {userData.firstName}</h1>
            <h1>Last Name: {userData.lastName}</h1>
            <h1>Email: {userData.email}</h1>
          </Paper>
        </Grid>
        You already reads:
        {userData.reads.map((i) => (
          <SingleBook id={i} />
        ))}
      </Grid>
    </div>
  );
};

export default ProfileData;
