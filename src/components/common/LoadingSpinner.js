import React from "react";
import "./LoadingSpinner.css";

/** Loading message used by components that fetch API data. */

function LoadingSpinner() {
  return (
    <div className="LoadingSpinner">
      Loading ...
      <img
        src="https://miro.medium.com/max/2400/1*kW-mFsR5zjhrpmfmLRdSrQ.png"
        alt="loading"
      />
    </div>
  );
}

export default LoadingSpinner;
