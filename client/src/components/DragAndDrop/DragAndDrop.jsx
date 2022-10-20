import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

export default function UploadPhotos({ setCloudinary, pushCloud }) {
  const [image, setImage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);

  const uploadImage = async (files, e) => {
    e.preventDefault();
    console.log(files);

    const arrayCloud = (data) => {
      data.forEach(async (element) => {
        const filesCloud = element;
        console.log(filesCloud[0]);
        const data = new FormData();
        console.log(data);
        data.append("file", filesCloud[0]);
        data.append("upload_preset", "zbs9x0z0");
        setLoading(true);
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/do3dbemlj/image/upload",
          {
            method: "POST",
            body: data,
          }
        );
        const file = await res.json();
        // console.log(filesCloud[0]);
        console.log(res);
        setImage(file.secure_url);
        // console.log(file.public_id);
        // console.log(file.secure_url);
        setLoading(false);
        const cloudinary = { public_id: file.public_id, url: file.secure_url };
        pushCloud.push(cloudinary.url);
        console.log(pushCloud);
        setCloudinary(cloudinary);
      });
    };
    arrayCloud(files);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles([
        ...files,
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ),
      ]);
    },
  });
  console.log(files);

  const handleDelete = (element, e) => {
    e.preventDefault();
    let afterDelete = files.filter((e) => e[0].name !== element[0].name);
    setFiles(afterDelete);
  };

  const images = files.map((file) => (
    <div key={file[0].name}>
      <div>
        <img src={file[0].preview} style={{ width: "200px" }} alt="preview" />
        <button onClick={(e) => handleDelete(file, e)}>X</button>
      </div>
    </div>
  ));

  // console.log(files[0]);
  return (
    <div className="App">
      {/* <img src={files[0].preview}></img> */}
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drop files here</p>
      </div>
      <div>{images}</div>
      <button onClick={(e) => uploadImage(files, e)}>SAVE PHOTOS</button>
    </div>
  );
}
