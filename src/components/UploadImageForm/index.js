import React, { useState } from "react";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../../../utils";

import classes from "./form.module.css";

export function UploadImage() {
  const [image, setImage] = useState(undefined);
  const [uploadingState, setUploadingState] = useState("");

  function handleChange(e) {
    const files = e.currentTarget.files;
    files && setImage(files[0]);
  }

  async function uploadImage(e) {
    e.preventDefault();

    // Check if an image is selected
    if (!image) {
      setUploadingState("Please select an image.");
      return;
    }

    const file = new FormData();
    file.append("image", image);

    const command = new PutObjectCommand({
      Bucket: "kitsune-gallery1234",
      Key: image.name,
      Body: image,
      ContentType: "image/jpeg",
      ACL: "public-read",
      Metadata: {
        "Content-Type": "image/jpeg",
      },
    });

    try {
      const response = await s3Client.send(command);

      if (response) {
        if (response.$metadata.httpStatusCode === 200) {
          setUploadingState("Done.");
          setTimeout(() => {
            setUploadingState("");
          }, 1000);
        } else {
          setUploadingState(`Upload failed!`);
        }
      }
    } catch (err) {
      console.error(err);
      setUploadingState(`Error: ${err.message}`);
    }
  }

  return (
    <div className={classes.container}>
      <form
        className={`flex flex-col border-solid border-2 border-white p-6`}
        onSubmit={uploadImage}
      >
        Upload form
        <input
          className={`border-solid border-2 border-white my-2`}
          type="file"
          name="image"
          onChange={handleChange}
          accept="image/*"
        />
        <button
          className={`border-solid border-2 border-white my-2`}
          type="submit"
        >
          upload
        </button>
      </form>
      <div>{uploadingState}</div>
    </div>
  );
}
