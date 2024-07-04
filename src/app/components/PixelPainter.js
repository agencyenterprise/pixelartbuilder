import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

function isSelectedPixel(paintedPixels, x, y) {
  return paintedPixels[x] && paintedPixels[x][y];
}

function updatePixelRef({
  paintedPixels,
  x,
  y,
  color,
  isBeadsArt = false
}) {
  if (x < 0 || y < 0) {
    return paintedPixels;
  }
  /**
   * For beads art, the previous pixel and the ones right above and below it should be NULL
   * Selected: x:1, Y:2
   * X will be blocked pixels
   * 0 0 X 0 0
   * 0 X 1 X 0
   * 0 0 X 0 0
   *
   */
  if (isBeadsArt) {
    paintedPixels = updatePixelRef({paintedPixels, x: x - 1, y, color: null});
    paintedPixels = updatePixelRef({paintedPixels, x: x + 1, y, color: null});
    paintedPixels = updatePixelRef({paintedPixels, x, y: y - 1, color: null});
    paintedPixels = updatePixelRef({paintedPixels, x, y: y + 1, color: null});
  }

  return {
    ...paintedPixels,
    [x]: {
      ...paintedPixels[x],
      [y]: color
    }
  };
}

function isPixelBlocked(paintedPixels, x, y) {
  return paintedPixels[x] && paintedPixels[x][y] === null;
}

export function PixelPainter({
  image,
  imageOverlap,
  imageSize,
  pixelSize,
  colorSelected,
  isBeadsArt,
}) {
  const paintedPixelsRef = useRef({});
  const [isMouseDown, setIsMouseDown] = useState(false);

  const paintPixel = (e, x, y) => {
    if (isMouseDown || e.type === 'click') {
      const paintedPixels = paintedPixelsRef.current;
      // if beads at, check if the pixel isn't blocked (null)
      if (isBeadsArt && isPixelBlocked(paintedPixels, x, y)) {
        return;
      }
      if (e.type === 'click' && isSelectedPixel(paintedPixels, x, y) && colorSelected === paintedPixels[x][y]) {
        e.target.style.backgroundColor = '';
        paintedPixelsRef.current = updatePixelRef({
          x, y,
          paintedPixels,
          isBeadsArt
        });
        return;
      }
      e.target.style.backgroundColor = colorSelected;
      paintedPixelsRef.current = updatePixelRef({
        x, y,
        paintedPixels,
        color: colorSelected,
        isBeadsArt
      });
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

  useEffect(() => {
    paintedPixelsRef.current = {};
  }, [pixelSize, imageSize]);

  const [width, height] = imageSize;
  return (
    <div
      key={image}
      className={twMerge("flex flex-wrap bg-white", imageOverlap && 'absolute bg-transparent')}
      style={{ width: imageSize[0], height: imageSize[1] }}
    >
      {Array.from({ length: height / pixelSize }).map((_, x) => (
        <div key={pixelSize.toString() + x} className="flex">
          {Array.from({ length: width / pixelSize }).map((_, y) => (
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
