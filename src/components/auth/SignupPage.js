import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import MyAlert from "../common/Alert";

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

const SignupPage = ({ signup }) => {
  const classes = useStyles();
  const history = useHistory();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  async function handleSubmit(evt) {
    evt.preventDefault();
    let result = await signup(formData);
    if (result.success) {
      history.push("/");
    } else {
      setFormErrors(result.errors);
    }
  }

  /** Update form data field */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((data) => ({ ...data, [name]: value }));
  }

  return (
    <Container className={classes.container} maxWidth="xs">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <h1>Sign Up</h1>
              </Grid>
              <Grid item xs={12}>
                {/*<label>Username</label>
                <input
                  name="username"
                  className="form-control"
                  value={formData.username}
                  onChange={handleChange}
                />*/}

                <TextField
                  fullWidth
                  label="Username"
                  name="username"
                  variant="outlined"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                {/*<label>Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                />*/}

                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  variant="outlined"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                {/*<label>First name</label>
                <input
                  name="firstName"
                  className="form-control"
                  value={formData.firstName}
                  onChange={handleChange}
                />*/}

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
                {/*<label>Last name</label>
                <input
                  name="lastName"
                  className="form-control"
                  value={formData.lastName}
                  onChange={handleChange}
                />*/}

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
                {/*<label>Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                />*/}

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
            </Grid>

            {formErrors.length ? (
              <MyAlert type="danger" messages={formErrors} />
            ) : null}
          </Grid>

          <Grid item xs={12}>
            <Button
              color="primary"
              fullWidth
              type="submit"
              variant="contained"
              onSubmit={handleSubmit}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default SignupPage;
