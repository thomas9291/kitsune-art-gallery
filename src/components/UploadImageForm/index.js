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

    const file = new FormData(e.target);
    const obj = Object.fromEntries(file);
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
          artState(obj);

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
            <input
              className={`border-solid border-2 border-blue-400 my-2 rounded p-1`}
              type="text"
              name="name"
              placeholder="write the art name
              "
              required
            />
            <div>
              <select name="category" id="category">
                <option value="">--choose a category--</option>
                <option value="Akuma">Akuma</option>
                <option value="Bijutsu">Bijustu</option>
                <option value="Bushi">Bushi</option>
                <option value="Heiki">Heiki</option>
                <option value="Herumetto">Herumetto</option>
                required
              </select>
            </div>
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
