import React from "react";
import classes from "./logo.module.css";
import Link from "next/link";

const LogoImage = () => {
  const imgeSrc = "/images/logoPhoto/kitsuneLogo.jpg";
  console.log("image url: ", imgeSrc);
  return (
    <div className={classes.container}>
      <Link href={"/"}>
        <div className={classes.headerContainer}>
          <h2 className={classes.header}>Kitsune Gallery</h2>
        </div>
        <div className={classes.imgContainer}>
          <img src={imgeSrc} alt="logo" className={classes.img} />
        </div>
      </Link>
    </div>
  );
};
export default LogoImage;
