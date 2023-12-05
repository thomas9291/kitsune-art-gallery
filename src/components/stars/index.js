import React, { useState } from "react";
import filledStarsSvg from "../../../public/star-filled.svg";
import emptyStarsSvg from "../../../public/star-empty.svg";
import classes from "./starts.module.css";
/* import useLocalStorageState from "use-local-storage-state"; */

const StarRating = ({ ratingLocalStorage, setStarsRatingLocalStorage }) => {
  const renderStars = () => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      stars.push(
        <img
          key={i}
          src={i <= ratingLocalStorage ? filledStarsSvg.src : emptyStarsSvg.src}
          onClick={() => setStarsRatingLocalStorage(i)}
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
