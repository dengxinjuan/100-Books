import React, { useContext, useState, useEffect } from "react";
import UserContext from "../auth/UserContext";

import { makeStyles } from "@material-ui/core/styles";
import CardActions from "@material-ui/core/CardActions";

const ResuableButton = ({ id }) => {
  return (
    <div>
      {currentUser && (
        <CardActions>
          <Button
            size="small"
            variant="contained"
            color="secondary"
            onClick={handleRead}
            disabled={read}
          >
            {read ? "READ" : "Mark As READ"}
          </Button>
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={removeRead}
            disabled={!read}
          >
            remove
          </Button>
        </CardActions>
      )}
    </div>
  );
};

export default ResuableButton;
