import { Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import classes from "./swiperContainer.module.css";

import { EffectCoverflow, Pagination } from "swiper/modules";

import React from "react";

export const SwiperContainer = (props) => {
  return (
    <Swiper
      className={classes.swiperContainer}
      effect={"coverflow"}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={"auto"}
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }}
      pagination={true}
      modules={[EffectCoverflow, Pagination]}
    >
      {props.children}
    </Swiper>
  );
};
