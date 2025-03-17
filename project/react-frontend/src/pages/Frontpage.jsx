import React from "react";
import { Link } from "react-router-dom";

const Frontpage = () => {
  //const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      {/* {user && user.isAdmin && ( */}
        <Link to="/LisaaTeos">Lisää teos</Link>
      {/* )} */}
      <p>
        <Link to="/search">Hakuun</Link>
      </p>
      <div className="w-1/2 bg-purple-300">ASDSADD</div>
    </div>
  );
};

export default Frontpage;
