import React from "react";
import { Link } from "react-router-dom";

const Frontpage = () => {
  return (
    <div>
      <Link to="/LisaaTeos">Lisää teos</Link>
      <p>
        <Link to="/search">Hakuun</Link>
      </p>
    </div>
  );
};

export default Frontpage;
