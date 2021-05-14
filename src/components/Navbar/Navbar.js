import React from "react";
import { BiCameraMovie } from "react-icons/bi";

const Navbar = () => {
  return (
    <div className="nav">
      <div className="nav-icon">
        <BiCameraMovie fontSize={48} />
        <p>ParticeepMovies</p>
      </div>
    </div>
  );
};

export default Navbar;
