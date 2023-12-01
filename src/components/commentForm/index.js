import React from "react";
import classes from "./commentForm.module.css";

export const CommentForm = ({ onSubmit }) => {
  async function handlerComment(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const value = Object.fromEntries(data);
    onSubmit(value);
    event.target.reset();
  }
  return (
    <div>
      <form onSubmit={handlerComment}>
        <textarea
          name="comment"
          id="comment"
          cols="30"
          rows="5"
          placeholder="Made a comment here!"
          required
        ></textarea>
        <div>
          <button className={classes.btn} type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
