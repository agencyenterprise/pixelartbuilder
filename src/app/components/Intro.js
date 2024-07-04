import { EmailCollector } from "./EmailCollector";

export function Intro() {
  return (
    <div className="max-w-[800px]">
      <h2 className="text-xl font-bold">Welcome to the pixel/beads art builder</h2>
      <p>We build this tool to simplify the process to create pixel/beads artwork based on any image out there</p>
      <p className="text-lg font-semibold mt-2">How it works?</p>
      <ol className="list-decimal pl-5">
        <li>
          Upload the image you want to create a pixel/beads art for.
          The image will then be processed to reduce its quality and stretched to a bit pixelated, making your job easier.
        </li>
        <li>
          You can then select the pixel size you want to use to create the art.
        </li>
        <li>
          You can then select the color palette you want to use to create the art.
        </li>
        <li>
          You can then start painting the pixels/beads on the canvas.
        </li>
        <li>
          Once you're done, you can print (ctrl/cmd + p) the pixel/beads art.
        </li>
      </ol>
      <EmailCollector />
    </div>
  )
}