'use client';

export function UploadImage({ onDropFiles, onFileChange }) {
  function preventDefaultDragAndDrop(e) {
    e.preventDefault();
  };

  function fileDrop(e) {
    e.preventDefault();

    const files = e.dataTransfer.files;
    if (files.length) {
      onDropFiles(files);
    }
  };

  return (
    <div
      className="flex justify-center w-full p-2"
      onDragOver={preventDefaultDragAndDrop}
      onDragEnter={preventDefaultDragAndDrop}
      onDragLeave={preventDefaultDragAndDrop}
      onDrop={fileDrop}
    >
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-[450px] h-full border-2 transition-colors text-black border-gray-600 dark:text-white dark:border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-background/80 hover:text-gray-600"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className="w-8 h-8 mb-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm">
            <span className="font-semibold">Click to upload</span> or
            drag and drop
          </p>
          <p className="text-xs">
            PNG, JPG (MAX. 3MB)
          </p>
        </div>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          onChange={onFileChange}
        />
      </label>
    </div>
  )
}