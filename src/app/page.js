'use client';

import { default as NextImage } from "next/image";
import { useState } from "react";
import imageResize from "image-resize";
import { twMerge } from "tailwind-merge";
import { prominent } from 'color.js'

import { UploadImage } from "./components/UploadImage";
import { Controls } from "./components/Controls";
import { MobileWarning } from "./components/MobileWarning";
import { PixelPainter } from "./components/PixelPainter";
import { Intro } from "./components/Intro";

export default function Home() {
  const [image, setImage] = useState(null);
  const [imageSize, setImageSize] = useState([0, 0]); // [width, height]
  const [pixelSize, setPixelSize] = useState(15);
  const [colorPalette, setColorPalette] = useState([]);
  const [colorSelected, setColorSelected] = useState('#000000');

  // Controls
  const [imageOverlap, setImageOverlap] = useState(true);
  const [hideImage, setHideImage] = useState(false);
  const [isBeadsArt, setIsBeadsArt] = useState(true);

  const handleFileChange = async (e) => {
    e.preventDefault();

    const file = e.target.files[0];

    if (file.size > 3000000) {
      alert("Please upload image file less than 3MB.");
      return;
    }

    uploadFile(file);
  };

  const handleDragAndDropFiles = (files) => {
    if (files[0].type.split("/")[0] !== "image") {
      alert("Please upload image file only.");
      return false;
    }

    if (files[0].size > 3000000) {
      alert("Please upload image file less than 3MB.");
      return false;
    }

    uploadFile(files[0]);
  };

  const uploadFile = async (file) => {
    const res = await imageResize(file, {
      format: "png,jpeg,webp",
      quality: 1,
      height: 100,
    });

    const img = new Image();
    img.src = res;
    img.onload = async () => {
      const scale = img.width / img.height;
      const width = 1000;
      const height = width / scale;
      setImageSize([width, height]);
      setImage(res);
      const colors = await prominent(res, { amount: 20, format: 'hex' })
      setColorPalette(colors);
      setColorSelected(colors[0]);
    };
  };

  return (
    <main className="flex flex-col items-center grow my-3">
      <div className="print:hidden hidden md:flex flex-wrap justify-between h-fit mt-5 gap-5 container">
        <UploadImage className={twMerge(!image && "mx-auto")} onDropFiles={handleDragAndDropFiles} onFileChange={handleFileChange} />
        {image && <Controls
          imageOverlap={imageOverlap}
          setImageOverlap={setImageOverlap}
          setPixelSize={setPixelSize}
          pixelSize={pixelSize}
          colorPalette={colorPalette}
          colorSelected={colorSelected}
          setColorSelected={setColorSelected}
          hideImage={hideImage}
          setHideImage={setHideImage}
          isBeadsArt={isBeadsArt}
          setIsBeadsArt={setIsBeadsArt}
        />}
      </div>
      <div className="hidden print:block md:block mt-2 overflow-hidden">
        {!image && <Intro />}
        {image && (
          <div className={twMerge("flex w-full items-center", !image && "hidden", imageOverlap && 'relative')}>
            <NextImage
              className={twMerge('print:invisible', hideImage && 'invisible')}
              src={image}
              alt="Uploaded Image"
              width={imageSize[0]} height={imageSize[1]}
            />
            <PixelPainter
              image={image}
              imageOverlap={imageOverlap}
              imageSize={imageSize}
              pixelSize={pixelSize}
              colorSelected={colorSelected}
              isBeadsArt={isBeadsArt}
            />
          </div>
        )}
      </div>
      <MobileWarning />
    </main>
  );
}
