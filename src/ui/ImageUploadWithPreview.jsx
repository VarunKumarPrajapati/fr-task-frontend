import React from "react";
import { AiOutlineCloudUpload, AiOutlineClose } from "react-icons/ai";
import { twMerge } from "tailwind-merge";

export default function ImageUploadWithPreview({
  accepts = "jpeg,png",
  onChange = () => {},
  className,
  error,
  value = {},
}) {
  const [preview, setPreview] = React.useState(value);

  accepts = accepts
    .split(",")
    .map((i) => `image/${i}`)
    .join(" ,");

  const handleChange = (e) => {
    const selectedField = e.target.files[0];

    if (!selectedField) return;

    if (!accepts.includes(selectedField.type)) {
      return alert("Only JPG/PNG files are allowed");
    }

    if (selectedField.size > 2 * 1024 * 1024) {
      return alert("File size must be less than 2MB");
    }

    onChange({ target: { name: "file", value: selectedField } });
    renderImage(selectedField);
  };

  const renderImage = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    setPreview(null);
    onChange({ target: { name: "file", value: null } });
    document.getElementById("upload-image").value = "";
  };

  return (
    <div className={`w-full h-full ${className}`}>
      <div
        className={`relative flex items-center justify-center rounded-full cursor-pointer size-48 group`}
      >
        {!preview ? (
          <label
            htmlFor="upload-image"
            className={twMerge(
              "absolute inset-0 z-50 flex items-center justify-center rounded-full",
              error ? "bg-red-500" : "bg-black/80"
            )}
            style={{ cursor: "pointer" }}
          >
            <AiOutlineCloudUpload className="text-white size-8" />{" "}
            <span className="ml-2 text-2xl font-bold text-white ">Upload</span>
          </label>
        ) : (
          <>
            <img
              src={preview}
              alt="profile-image"
              className="w-full h-full bg-red-500 rounded-full"
            />
            <span className="absolute z-50 items-center justify-center hidden text-white bg-black rounded-full top-3 right-3 size-8 group-hover:flex">
              <AiOutlineClose
                title="remove"
                onClick={handleRemove}
                className="size-4"
              />
            </span>
          </>
        )}
        <input
          id="upload-image"
          type="file"
          name="file"
          accept={accepts}
          onChange={handleChange}
          hidden
        />
      </div>
    </div>
  );
}
