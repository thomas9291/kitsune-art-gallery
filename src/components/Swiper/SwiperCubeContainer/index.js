import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import { EffectCoverflow, Pagination } from "swiper/modules";

import "./SwiperCubeContainer.module.css";

export const SwiperCubeContainer = () => {
  const imageStyle = {
    width: "30%",
    display: "flex",
    flexDirection: "column",
  };
  return (
    <>
      <Swiper
        className="swiper"
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
        <SwiperSlide style={imageStyle}>
          <img src="https://images.unsplash.com/photo-1682687981630-cefe9cd73072?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8" />
        </SwiperSlide>
        <SwiperSlide style={imageStyle}>
          <img src="https://images.unsplash.com/photo-1682687981630-cefe9cd73072?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8" />
        </SwiperSlide>
        <SwiperSlide style={imageStyle}>
          <img src="https://images.unsplash.com/photo-1682687981630-cefe9cd73072?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8" />
        </SwiperSlide>
      </Swiper>
    </>
  );
};
