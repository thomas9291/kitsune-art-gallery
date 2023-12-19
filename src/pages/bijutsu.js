import useSWR from "swr";
import React from "react";
import Link from "next/link";

import { UploadImage } from "../components/UploadImageForm";
import LoadingComponent from "../components/loadingComponent";

import { SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import classes from "../components/swiperContainer/swiperContainer.module.css";

import DetailCart from "../components/DetailCart";
import LogoImage from "../components/logoImage";
import { FilterDropDown } from "../components/filterDropdown";

import { SwiperContainer } from "../components/swiperContainer";

export default function Bijutsu() {
  const { data: artData, isLoading } = useSWR("/api/artData", {
    fallbackData: [],
  });
  const bijutsuData = artData.filter(
    (element) => element.category === "Bijutsu"
  );

  if (isLoading) {
    return <LoadingComponent />;
  }
  if (bijutsuData.length === 0) {
    return (
      <div className="m-4 text-center">
        <h1>waiting for Bijutsu</h1>
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
          <div className="w-52">
            <FilterDropDown />
          </div>
        </div>
        <div className=" m-5 flex flex-col ">
          <SwiperContainer>
            {bijutsuData.map((item) => {
              return (
                <SwiperSlide className={classes.swiperSlide} key={item.id}>
                  <DetailCart
                    src={item.url}
                    nameArt={item.name.toUpperCase()}
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
