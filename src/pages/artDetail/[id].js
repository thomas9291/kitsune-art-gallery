import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import LoadingComponent from "../../components/loadingComponent";
import { CommentForm } from "@/components/commentForm";
import Link from "next/link";
import { s3Client } from "../../../utils";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import classes from "./artData.module.css";
import { DetailCartIdPage } from "../../components/detailCartIdPage";
import StartRating from "../../components/stars";
import { CommentCart } from "../../components/commentCart";
import { SwiperSlide } from "swiper/react";
import { CubeSwiper } from "@/components/cubeSwiper";
import useLocalStorageState from "use-local-storage-state";

export default function DetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [ratingLocalStorage, setStarsRatingLocalStorage] = useLocalStorageState(
    "stars-rating",
    0
  );
  useEffect(() => {
    // You can perform any additional actions when the filledStars state changes
    console.log(
      "filled start from useEffect component stars: ",
      ratingLocalStorage
    );
  }, [ratingLocalStorage]);

  const [comment, setComment] = useState(false);
  const { data: artDetail, isLoading } = useSWR(`/api/artData/${id}`);

  async function handlerComment(comment) {
    try {
      const response = await fetch(`/api/artData/${id}`, {
        method: "Post",
        body: JSON.stringify(comment),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        setComment(true);
      }
    } catch (error) {
      console.error(error);
    }
  }
  async function handlerDeleteArt(id) {
    const command = new DeleteObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
      Key: artDetail.name,
    });
    if (confirm("are you sure you want to delete?")) {
      try {
        await s3Client.send(command);
        console.log("s3 object success deleted!");
      } catch (error) {
        console.log(error);
      }
      await fetch(`/api/artData/${id}`, {
        method: "DELETE",
      });
      router.push("/");
    }
  }
  if (isLoading) {
    return <LoadingComponent />;
  }
  const btnStyle = {
    backgroundColor: "red",
    color: "white",
    padding: "6px",
    borderRadius: "5px",
    marginTop: "20px",
  };

  return (
    <div className="flex flex-col items-center m-2">
      <Link href={"/"} className="text-sky-400/50">
        Back to the Home Page
      </Link>
      <div>
        <button onClick={() => handlerDeleteArt(artDetail.id)} style={btnStyle}>
          Delete Art
        </button>
      </div>
      <div className={classes.containerForm}>
        <div className={classes.detailCartContainer}>
          <DetailCartIdPage
            nameArt={artDetail.name
              .replaceAll("_", " ")
              .replace(".jpg", "")
              .toUpperCase()}
            src={artDetail.url}
          />
        </div>
        <div className={classes.formItems}>
          <div className={classes.stars}>
            <StartRating
              ratingLocalStorage={ratingLocalStorage}
              setStarsRatingLocalStorage={setStarsRatingLocalStorage}
            />
          </div>
          <CommentForm onSubmit={handlerComment} />
          <div className={classes.commentsContainer}>
            {artDetail.comments.length === 0 ? (
              <p className="text-white">waiting for comment</p>
            ) : (
              <div className="w-64 text-sky-200 bg-sky-700 p-1 rounded">
                <CubeSwiper>
                  {artDetail.comments.map((item, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <CommentCart commentsItems={item.comment} />
                      </SwiperSlide>
                    );
                  })}
                </CubeSwiper>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
