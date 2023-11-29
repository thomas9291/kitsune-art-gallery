import Image from "next/image";
import React from "react";
import classes from "./DetailCart.module.css";

function DetailCart(props) {
  return (
    <>
      <div className={classes.btnContainer}>
        <button className={classes.btn}>{props.linkedId}</button>
      </div>
      <div className={classes.containerHeader}>
        <h1 className={classes.header}>{props.nameArt}</h1>
      </div>
      <div>
        <img src={props.src} alt={"waiting image"} className={classes.img} />
      </div>
    </>
  );
}
export default DetailCart;
