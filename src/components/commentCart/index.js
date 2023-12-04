import React from "react";
import classes from "./commentCart.module.css";

export const CommentCart = (props) => {
  return (
    <div className={classes.container}>
      <p>{props.commentsItems}</p>
    </div>
  );
};
