import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

function isSelectedPixel(paintedPixels, x, y) {
  return paintedPixels.some(([px, py]) => px === x && py === y);
}

export function PixelPainter({ image, imageOverlap, imageSize, pixelSize, colorSelected }) {
  const [paintedPixels, setPaintedPixels] = useState([]); // [x, y, color]
  const [isMouseDown, setIsMouseDown] = useState(false);

  const paintPixel = (e, x, y) => {
    if (isMouseDown || e.type === 'click') {
      if (e.type === 'click' && isSelectedPixel(paintedPixels, x, y)) {
        e.target.style.backgroundColor = '';
        setPaintedPixels(paintedPixels.filter(([px, py]) => px !== x || py !== y));
        return;
      }
      e.target.style.backgroundColor = colorSelected;
      setPaintedPixels([...paintedPixels, [x, y, colorSelected]]);
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
    <div
      key={image}
      className={twMerge("flex flex-wrap bg-white", imageOverlap && 'absolute bg-transparent')}
      style={{ width: imageSize[0], height: imageSize[1] }}
    >
      {Array.from({ length: imageSize[0] / pixelSize }).map((_, x) => (
        <div key={pixelSize.toString() + x} className="flex flex-col">
          {Array.from({ length: imageSize[1] / pixelSize }).map((_, y) => (
            <div
              key={pixelSize.toString() + y}
              className={twMerge("pixel border border-gray-700", imageOverlap && 'border-white')}
              style={{ '--pixel-size': `${pixelSize}px` }}
              onClick={(e) => {
                paintPixel(e, x, y);
              }}
              onMouseMove={(e) => {
                paintPixel(e, x, y);
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

