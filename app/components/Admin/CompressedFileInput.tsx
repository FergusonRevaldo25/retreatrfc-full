"use client";

import { useState, useRef, ChangeEvent } from "react";
import imageCompression from "browser-image-compression";

export default function CompressedFileInput({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState("");

  async function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size < 300 * 1024) return; // already small, skip

    setStatus("Compressing...");
    try {
      const compressed = await imageCompression(file, {
        maxWidthOrHeight: 2400,
        maxSizeMB: 2,
        useWebWorker: true,
        fileType: file.type === "image/png" ? "image/png" : undefined,
      });

      const compressedFile = new File([compressed], file.name, {
        type: compressed.type,
      });

      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(compressedFile);
      if (inputRef.current) inputRef.current.files = dataTransfer.files;

      setStatus(
        `${(file.size / 1024 / 1024).toFixed(1)}MB → ${(compressedFile.size / 1024 / 1024).toFixed(1)}MB`,
      );
    } catch (err) {
      console.error("Compression failed, uploading original file instead", err);
      setStatus("");
    }
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        name={name}
        accept="image/*"
        onChange={handleChange}
        className={className ?? "text-sm text-gray-400"}
      />
      {status && <p className="text-xs text-purple-400 mt-1">{status}</p>}
    </div>
  );
}
