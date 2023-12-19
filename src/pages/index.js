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
import classes from "../components/swiperContainer/swiperContainer.module.css";

import DetailCart from "../components/DetailCart";
import LogoImage from "../components/logoImage";

import { SwiperContainer } from "../components/swiperContainer";

export default function HomePage() {
  const router = useRouter();
  const [art, setArt] = useState("");
  const { data: artData, isLoading } = useSWR("/api/artData", {
    fallbackData: [],
  });

  const galleryArray = [];
  const akumaDemo = artData.find((element) => element.name === "bouffon vert");
  const bijutsuDemo = artData.find((element) => element.name === "dragon");
  const heikiDemo = artData.find(
    (element) => element.name === "lance et tanto"
  );
  const herumettoDemo = artData.find(
    (element) => element.name === "demon face"
  );
  const bushiDemo = artData.find(
    (element) => element.name === "armure dragon d´or"
  );
  galleryArray.push(
    akumaDemo,
    bijutsuDemo,
    heikiDemo,
    herumettoDemo,
    bushiDemo
  );
  console.log("galleryArray from home page: ", galleryArray);

  async function handlerArt(data) {
    setArt(data);
    console.log("data from home page: ", data);
    const urlImage = `https://kitsune-gallery1234.s3.eu-central-1.amazonaws.com/${data.image.name}`;

    const response = await fetch("/api/artData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: urlImage,
        name: data.name,
        category: data.category,
      }),
    });
    if (response.ok) {
      router.reload();
    }
  }
  if (isLoading) {
    return <LoadingComponent />;
  }
  if (galleryArray.length === 0) {
    return (
      <div className="m-4 text-center">
        <UploadImage artState={handlerArt} />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center relative m-5">
      <div className="app">
        <div className="m-4  flex justify-evenly items-center">
          <div>
            <LogoImage />
          </div>
          <div>
            <UploadImage artState={handlerArt} />
          </div>
        </div>
        <h1 className="text-white text-center font-serif">
          Please select a gallery
        </h1>
        <div className=" m-5 flex flex-col ">
          <SwiperContainer>
            {galleryArray.map((item) => {
              return (
                <SwiperSlide className={classes.swiperSlide} key={item.id}>
                  <DetailCart
                    src={item.url}
                    nameArt={item.category.toUpperCase()}
                    linkedId={
                      <Link href={`/${item.category.toLowerCase()}`}>
                        Show Gallery
                      </Link>
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
