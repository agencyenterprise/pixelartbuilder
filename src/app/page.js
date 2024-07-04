'use client';

import { default as NextImage } from "next/image";
import { useEffect, useState } from "react";
import imageResize from "image-resize";
import { twMerge } from "tailwind-merge";
import { prominent } from 'color.js'

import { UploadImage } from "./components/UploadImage";
import { Controls } from "./components/Controls";
import { MobileWarning } from "./components/MobileWarning";

export default function Home() {
  const [image, setImage] = useState(null);
  const [imageSize, setImageSize] = useState([0, 0]); // [width, height]
  const [pixelSize, setPixelSize] = useState(15);
  const [imageOverlap, setImageOverlap] = useState(true);
  const [colorPalette, setColorPalette] = useState([]);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [colorSelected, setColorSelected] = useState('#000000');

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

    // const canvas = document.getElementById("canvas");
    // const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = res;
    img.onload = async () => {
      const scale = img.width / img.height;
      const width = 800;
      const height = width / scale;
      setImageSize([width, height]);
      // canvas.width = width;
      // canvas.height = height;
      // ctx.drawImage(img, 0, 0, width, height);
      setImage(res);
      const colors = await prominent(res, { amount: 20, format: 'hex' })
      setColorPalette(colors);
      setColorSelected(colors[0]);
    };
  };

  const paintPixel = (e) => {
    if (isMouseDown || e.type === 'click') {
      e.target.style.backgroundColor = colorSelected;
    }
  };

  useEffect(() => {
    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isMouseDown, colorSelected]);

  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="hidden md:flex flex-wrap h-fit mt-5 gap-5">
        <div>
          <h1 className="text-5xl text-center ">Pixel Art Builder</h1>
          <UploadImage onDropFiles={handleDragAndDropFiles} onFileChange={handleFileChange} />
        </div>
        {image && <Controls
          imageOverlap={imageOverlap}
          setImageOverlap={setImageOverlap}
          setPixelSize={setPixelSize}
          pixelSize={pixelSize}
          colorPalette={colorPalette}
          colorSelected={colorSelected}
          setColorSelected={setColorSelected}
        />}
      </div>
      <div className="hidden md:block mt-2 overflow-hidden">
        {!image && "Upload an image to get started."}
        {image && (
          <div className={twMerge("flex w-full items-center", !image && "hidden", imageOverlap && 'relative')}>
            <NextImage src={image} alt="Uploaded Image" width={imageSize[0]} height={imageSize[1]} />
            <div className={twMerge("flex flex-wrap bg-white", imageOverlap && 'absolute bg-transparent')} style={{ width: imageSize[0], height: imageSize[1] }}>
              {Array.from({ length: imageSize[0] / pixelSize }).map((_, i) => (
                <div key={pixelSize.toString() + i} className="flex flex-col">
                  {Array.from({ length: imageSize[1] / pixelSize }).map((_, j) => (
                    <div
                      key={pixelSize.toString() + j}
                      className={twMerge("pixel border border-gray-700", imageOverlap && 'border-white')}
                      style={{ '--pixel-size': `${pixelSize}px` }}
                      onClick={paintPixel}
                      onMouseMove={paintPixel}
                    />
                  ))}
                </div>
              ))}
            </div>
            {/* <canvas id="canvas" width="1000" height="1000"></canvas> */}
          </div>
        )}
      </div>
      <MobileWarning />
    </main>
  );
}
