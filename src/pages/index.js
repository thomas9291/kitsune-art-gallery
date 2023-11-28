import React, { useState } from "react";

import { UploadImage } from "../components/UploadImageForm";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import { EffectCoverflow, Pagination } from "swiper/modules";

import DetailCart from "../components/DetailCart";
import "../styles/swiper.module.css";

export default function HomePage({ setArt, art }) {
  const [imageName, setImageName] = useState("");
  async function handlerArt(data) {
    setArt(data);
    const urlImage = `https://kitsune-gallery1234.s3.eu-central-1.amazonaws.com/${data.name}`;
    const artName = data.name
      .replace(".jpg", "")
      .replace("_", " ")
      .toUpperCase();

    const response = await fetch("/api/artData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: urlImage, name: artName }),
    });
    if (response.ok) {
      console.log("success data fetched!");
    }
  }

  const swiperStyle = {
    width: "30%",
    display: "flex",
    flexDirection: "column",
  };

  return (
    <div className="flex flex-col items-center justify-center relative m-5">
      <div className="m-4">
        <UploadImage artState={handlerArt} />
      </div>
      <div className=" m-5 flex">
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
          <SwiperSlide style={swiperStyle}>
            <DetailCart
              nameArt="Name Of Art"
              src={
                "https://kitsune-gallery1234.s3.eu-central-1.amazonaws.com/demon_boufon_vert.jpg"
              }
            />
          </SwiperSlide>
          <SwiperSlide style={swiperStyle}>
            <DetailCart
              nameArt="Name Of Art"
              src={
                "https://kitsune-gallery1234.s3.eu-central-1.amazonaws.com/demon_boufon_vert.jpg"
              }
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

{
  /*  {arr5.map((item, index) => {
   return (
     <SwiperSlide style={swiperStyle} key={index}>
       <DetailCart src={item} />
     </SwiperSlide>
   );
 })} */
}
