import React, { useState } from "react";
import filledStarsSvg from "../../../public/star-filled.svg";
import emptyStarsSvg from "../../../public/star-empty.svg";
import classes from "./starts.module.css";

const StarRating = () => {
  const [filledStars, setFilledStars] = useState(5);

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <img
          key={i}
          src={i <= filledStars ? filledStarsSvg.src : emptyStarsSvg.src}
          onClick={() => setFilledStars(i)}
          alt={`star ${i}`}
          className={classes.img}
        />
      );
    }
    return stars;
  };

  return <div className={classes.container}>{renderStars()}</div>;
};

export default StarRating;