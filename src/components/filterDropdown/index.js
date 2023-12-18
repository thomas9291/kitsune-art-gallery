import React, { useState } from "react";
import classes from "./filterDropdown.module.css";
import Link from "next/link";

export const FilterDropDown = () => {
  const [filter, setFilter] = useState(false);
  const dropdownHandler = () => {
    setFilter(!filter);
  };
  return (
    <>
      {!filter && (
        <button onClick={dropdownHandler} className={classes.btn}>
          Please select a category
        </button>
      )}
      {filter && (
        <ul className={classes.listContainer}>
          <button onClick={dropdownHandler} className={classes.btn}>
            Close
          </button>
          <Link href={"/akuma"} className={classes.link}>
            Akuma
          </Link>
          <Link href={"/bijutsu"} className={classes.link}>
            Bijutsu
          </Link>
          <Link href={"/heiki"} className={classes.link}>
            Heiki
          </Link>
          <Link href={"/herumetto"} className={classes.link}>
            Herumetto
          </Link>
          <Link href={"/bushi"} className={classes.link}>
            Bushi
          </Link>
        </ul>
      )}
    </>
  );
};
