import Switch from "react-switch";
import { twMerge } from "tailwind-merge";

export function Controls({
  imageOverlap,
  setImageOverlap,
  setPixelSize,
  pixelSize,
  colorPalette,
  colorSelected,
  setColorSelected,
  hideImage,
  setHideImage,
  isBeadsArt,
  setIsBeadsArt,
}){
  return (
    <div className="space-y-2 border border-foreground rounded-lg p-4">
      <h2 className="font-bold">Controls</h2>
      <ul className="flex gap-2">
        <li className="flex items-center gap-2">
          <Switch
            className="switch"
            onChange={() => setImageOverlap(!imageOverlap)}
            checked={imageOverlap}
          />
          Images overlap
        </li>
        <li className="flex items-center gap-2">
          <Switch
            className="switch"
            onChange={() => setHideImage(!hideImage)}
            checked={hideImage}
          />
          Hide Image
        </li>
        <li className="flex items-center gap-2">
          <Switch
            className="switch"
            onChange={() => setIsBeadsArt(!isBeadsArt)}
            checked={isBeadsArt}
          />
          Beads Art
        </li>
      </ul>
      <h3>Pixel Size - {pixelSize}px</h3>
      <input
        type="range"
        min="5"
        max="50"
        value={pixelSize}
        onChange={(e) => setPixelSize(e.target.value)}
      />
      <h2 className="border-t border-foreground pt-2 font-bold">Color Palette</h2>
      <ul className="flex flex-wrap gap-2 md:max-w-[360px]">
        {colorPalette.map((color, i) => (
          <li
            key={i}
            className={
              twMerge('rounded-full size-7', colorSelected === color && 'border-2 border-green-600')
            }
            style={{ backgroundColor: color }}
          >
            <button className="size-full rounded-full" onClick={() => setColorSelected(color)} />
          </li>
        ))}
      </ul>
    </div>
  );
}