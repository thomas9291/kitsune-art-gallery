import useSWR from "swr";
import React, { useState } from "react";

import { UploadImage } from "../components/UploadImageForm";
import LoadingComponent from "../components/loadingComponent";

import { SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import DetailCart from "../components/DetailCart";
import "../styles/swiper.module.css";
import { SwiperContainer } from "../components/swiperContainer";

export default function HomePage() {
  const { data: artData, isLoading } = useSWR("/api/artData", {
    fallbackData: [],
  });

  const [art, setArt] = useState("");
  async function handlerArt(data) {
    setArt(data);
    const urlImage = `https://kitsune-gallery1234.s3.eu-central-1.amazonaws.com/${data.name}`;
    const artName = data.name
      .replace(".jpg", "")
      .replaceAll("_", " ")
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
  if (isLoading) {
    return <LoadingComponent />;
  }
  return (
    <div className="flex flex-col items-center justify-center relative m-5">
      <div className="m-4">
        <UploadImage artState={handlerArt} />
      </div>
      <div className=" m-5 flex">
        <SwiperContainer>
          {artData.map((item) => {
            return (
              <SwiperSlide style={swiperStyle} key={item.id}>
                <DetailCart src={item.url} nameArt={item.name} />
              </SwiperSlide>
            );
          })}
        </SwiperContainer>
      </div>
    </div>
  );
}
