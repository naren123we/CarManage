import React, { useEffect, useRef, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import "./UploadImage.css";
import { Button, Group } from "@mantine/core";
const UploadImage = ({
  propertyDetails,
  setPropertyDetails,
  nextStep,
  prevStep,
}) => {
  const [imageURLs, setImageURLs] = useState(propertyDetails.image || []);
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const handleNext = () => {
    setPropertyDetails((prev) => ({ ...prev, image: imageURLs }));
    nextStep();
  };

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "djew8twjp",
        uploadPreset: "vx0dyjgc",
        maxFiles: 10,
      },
      (err, result) => {
        if (result.event === "success") {
          setImageURLs((prevURLs) => [...prevURLs, result.info.secure_url]);
        }
      }
    );
  }, []);
  return (
    <div className="flexColCenter uploadWrapper">
      {imageURLs.length === 0 ? (
        <div
          className="flexColCenter uploadZone"
          onClick={() => widgetRef.current?.open()}
        >
          <AiOutlineCloudUpload size={50} color="grey" />
          <span>Upload Images</span>
        </div>
      ) : (
        <div
          className="uploadedImages"
          onClick={() => widgetRef.current?.open()}
        >
          {imageURLs.map((url, index) => (
            <img key={index} src={url} alt={`Uploaded ${index + 1}`} />
          ))}
        </div>
      )}

      <Group position="center" mt={"xl"}>
        <Button variant="default" onClick={prevStep}>
          Back
        </Button>
        <Button onClick={handleNext} disabled={imageURLs.length === 0}>
          Next
        </Button>
      </Group>
    </div>
  );
};

export default UploadImage;
