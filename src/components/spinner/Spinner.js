import React from "react";

import "./Spinner.scss";

const Spinner = () => {
  return (
    // <div class="spinner">
    //   <div class="cube1" />
    //   <div class="cube2" />
    // </div>
    <div className="sk-folding-cube">
      <div className="sk-cube1 sk-cube" />
      <div className="sk-cube2 sk-cube" />
      <div className="sk-cube4 sk-cube" />
      <div className="sk-cube3 sk-cube" />
    </div>
  );
};

export default Spinner;
