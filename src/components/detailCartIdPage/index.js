import React from "react";
import classes from "./detailCartIdPage.module.css";

export const DetailCartIdPage = (props) => {
  return (
    <div>
      <div>
        <button className={classes.btn}>{props.linkedId}</button>
      </div>
      <div className={classes.containerHeader}>
        <h1 className={classes.header}>{props.nameArt}</h1>
      </div>
      <div className={classes.containerImg}>
        <img src={props.src} alt={"waiting image"} className={classes.img} />
      </div>
    </div>
  );
};
