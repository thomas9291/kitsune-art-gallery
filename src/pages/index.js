import useSWR from "swr";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { UploadImage } from "../components/UploadImageForm";
import LoadingComponent from "../components/loadingComponent";

import { SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import DetailCart from "../components/DetailCart";

import { SwiperContainer } from "../components/swiperContainer";

export default function HomePage() {
  const router = useRouter();
  const [art, setArt] = useState("");
  const { data: artData, isLoading } = useSWR("/api/artData", {
    fallbackData: [],
  });

  async function handlerArt(data) {
    setArt(data);
    const urlImage = `https://kitsune-gallery1234.s3.eu-central-1.amazonaws.com/${data.name}`;

    const response = await fetch("/api/artData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: urlImage, name: data.name }),
    });
    if (response.ok) {
      console.log("success data fetched!");
      router.reload();
    }
  }

  const swiperStyle = {
    width: "30%",
  };
  if (isLoading) {
    return <LoadingComponent />;
  }
  if (artData.length === 0) {
    return (
      <div className="m-4 text-center">
        <UploadImage artState={handlerArt} />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center relative m-5">
      <div className="app">
        <div className="m-4 text-center">
          <UploadImage artState={handlerArt} />
        </div>
        <div className=" m-5 flex flex-col ">
          <SwiperContainer>
            {artData.map((item) => {
              return (
                <SwiperSlide style={swiperStyle} key={item.id}>
                  <DetailCart
                    src={item.url}
                    nameArt={item.name
                      .replaceAll("_", " ")
                      .replace(".jpg", "")
                      .toUpperCase()}
                    linkedId={
                      <Link href={`/artDetail/${item.id}`}>Show Detail</Link>
                    }
                  />
                </SwiperSlide>
              );
            })}
          </SwiperContainer>
        </div>
      </div>
    </div>
  );
}
