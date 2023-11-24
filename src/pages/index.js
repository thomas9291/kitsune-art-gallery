import React from "react";

import { UploadImage } from "../components/UploadImageForm";
import { SwiperCubeContainer } from "@/components/Swiper/SwiperCubeContainer";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center relative">
      <div>
        <UploadImage />
      </div>
      <div className=" m-5 flex">
        <SwiperCubeContainer />
      </div>
    </div>
  );
}
