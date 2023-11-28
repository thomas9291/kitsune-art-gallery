import Image from "next/image";
import React from "react";
import classes from "./DetailCart.module.css";

function DetailCart(props) {
  return (
    <>
      <div style={classes.imagesStyleContainer}>
        <img src={props.src} alt={"waiting image"} className={classes.img} />
      </div>
    </>
  );
}
export default DetailCart;
