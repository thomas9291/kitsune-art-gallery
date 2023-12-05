import React from "react";
import classes from "./commentCart.module.css";

export const CommentCart = (props) => {
  return (
    <div className={classes.container}>
      <p className={classes.comment}>{props.commentsItems}</p>
    </div>
  );
};
