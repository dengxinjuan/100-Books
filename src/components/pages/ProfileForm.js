import React, { useState, useContext } from "react";
import Alert from "../common/Alert";
import UserContext from "../auth/UserContext";

// eslint-disable-next-line
//import useTimedMessage from "../hooks/useTimedMessage";
import BookApi from "../../Api/api";

//*style start here */

import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

//import
const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
  },
}));

/** Profile editing form.
 *
 * Displays profile form and handles changes to local form state.
 * Submitting the form calls the API to save, and triggers user reloading
 * throughout the site.
 *
 * Confirmation of a successful save is normally a simple <Alert>, but
 * you can opt-in to our fancy limited-time-display message hook,
 * `useTimedMessage`, but switching the lines below.
 *
 * Routed as /profile
 * Routes -> ProfileForm -> Alert
 */

function ProfileForm() {
  const classes = useStyles(); //style
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    username: currentUser.username,
    //,password: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  // switch to use our fancy limited-time-display message hook
  const [saveConfirmed, setSaveConfirmed] = useState(false);
  // const [saveConfirmed, setSaveConfirmed] = useTimedMessage()

  /** on form submit:
   * - attempt save to backend & report any errors
   * - if successful
   *   - clear previous error messages and password
   *   - show save-confirmed message
   *   - set current user info throughout the site
   */

  async function handleSubmit(evt) {
    evt.preventDefault();

    let profileData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      //,password: formData.password,
    };

    let username = formData.username;
    let updatedUser;

    try {
      updatedUser = await BookApi.saveProfile(username, profileData);
    } catch (errors) {
      debugger;
      setFormErrors(errors);
      return;
    }

    setFormData((f) => ({ ...f, password: "" }));
    setFormErrors([]);
    setSaveConfirmed(true);

    // trigger reloading of user information throughout the site
    setCurrentUser(updatedUser);
  }

  /** Handle form data changing */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((f) => ({
      ...f,
      [name]: value,
    }));
    setFormErrors([]);
  }

  return (
    <Container className={classes.container} maxWidth="xs">
      <form>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <h1>Edit Profile</h1>
          </Grid>
          <Grid item xs={12}>
            <p>Hello, {formData.username}!</p>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              variant="outlined"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              variant="outlined"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              variant="outlined"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Grid>
          {/*<div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
              />
  </div>*/}

          {formErrors.length ? (
            <Alert type="danger" messages={formErrors} />
          ) : null}

          {saveConfirmed ? (
            <Alert type="success" messages={["Updated successfully."]} />
          ) : null}

          <Grid item xs={12}>
            {/*<button
              className="btn btn-primary btn-block mt-4"
              onClick={handleSubmit}
            >
              Save Changes
            </button>*/}

            <Button
              color="primary"
              fullWidth
              type="submit"
              variant="contained"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default ProfileForm;
