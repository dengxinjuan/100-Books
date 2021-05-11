import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
//import classes from "*.module.css";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

/** Presentational component for showing bootstrap-style alerts.
 *
 * { LoginForm, SignupForm, ProfileForm } -> Alert
 **/

function MyAlert({ type = "danger", messages = [] }) {
  console.debug("Alert", "type=", type, "messages=", messages);
  const classes = useStyles();

  return (
    <div className={classes.root} role="alert">
      {messages.map((error) => (
        <p className="mb-0 small" key={error}>
          <Alert severity="error">{error}</Alert>
        </p>
      ))}
    </div>
  );
}

export default MyAlert;
