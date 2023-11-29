import React from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import DetailCart from "../../components/DetailCart";
import LoadingComponent from "../../components/loadingComponent";
import Link from "next/link";
import { s3Client } from "../../../utils";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";

export default function DetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const { data: artDetail, isLoading } = useSWR(`/api/artData/${id}`);

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
      <DetailCart
        nameArt={artDetail.name
          .replaceAll("_", " ")
          .replace(".jpg", "")
          .toUpperCase()}
        src={artDetail.url}
      />
    </div>
  );
}
