import React, { useState } from "react";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../../../utils";

import classes from "./form.module.css";

export function UploadImage({ artState }) {
  const [image, setImage] = useState(undefined);
  const [uploadingState, setUploadingState] = useState("");
  const [isArt, setIsArt] = useState(false);

  function handlerIsArt() {
    setIsArt(!isArt);
  }

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
          artState(image);

          setTimeout(() => {
            setUploadingState("");
            handlerIsArt();
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
    <>
      {!isArt && (
        <button onClick={handlerIsArt} className={classes.btn}>
          Add Art
        </button>
      )}

      {isArt && (
        <div className={classes.container}>
          <button onClick={handlerIsArt} className={classes.btn}>
            Back
          </button>
          <form
            className={`flex flex-col border-solid border-2 border-blue-400 p-6 rounded`}
            onSubmit={uploadImage}
          >
            Upload form
            <input
              className={`border-solid border-2 border-blue-400 my-2 rounded p-1`}
              type="file"
              name="image"
              onChange={handleChange}
              accept="image/*"
            />
            <button
              className={`border-solid border-2 border-blue-400 my-2 p-1 rounded`}
              type="submit"
            >
              upload
            </button>
          </form>
          <div>{uploadingState}</div>
        </div>
      )}
    </>
  );
}
