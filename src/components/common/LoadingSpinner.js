import React from "react";
import "./LoadingSpinner.css";
import LinearProgress from "@material-ui/core/LinearProgress";

/** Loading message used by components that fetch API data. */

function LoadingSpinner() {
  return (
    <div className="LoadingSpinner">
      Loading ...
      <LinearProgress />
    </div>
  );
}

export default LoadingSpinner;
