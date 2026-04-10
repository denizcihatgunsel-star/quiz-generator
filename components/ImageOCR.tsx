"use client";

import { useState, useRef } from "react";

interface ImageOCRProps {
  onTextExtracted: (text: string) => void;
}

export default function ImageOCR({ onTextExtracted }: ImageOCRProps) {
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleImage = async (file: File) => {
    setProcessing(true);
    setProgress(0);

    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);

    try {
      // Dynamic import to avoid loading Tesseract.js on every page
      const { createWorker } = await import("tesseract.js");
      const worker = await createWorker("eng", 1, {
        logger: (m: { progress: number }) => {
          if (m.progress) setProgress(Math.round(m.progress * 100));
        },
      });

      const { data } = await worker.recognize(file);
      await worker.terminate();

      if (data.text.trim()) {
        onTextExtracted(data.text.trim());
      }
    } catch {
      // Silently fail
    } finally {
      setProcessing(false);
      setProgress(0);
      setPreview(null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleImage(file);
    }
  };

  return (
    <div className="space-y-3">
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleImage(file);
          if (fileRef.current) fileRef.current.value = "";
        }}
      />

      <button
        onClick={() => fileRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        disabled={processing}
        className="w-full py-4 px-4 rounded-xl border-2 border-dashed border-neutral-200 hover:border-violet-300 bg-white hover:bg-violet-50/50 transition-colors text-sm text-neutral-500 hover:text-violet-600 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {processing ? (
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-violet-300 border-t-violet-600 rounded-full animate-spin" />
              <span>Extracting text... {progress}%</span>
            </div>
            <div className="w-48 h-1.5 bg-neutral-100 rounded-full">
              <div className="h-full bg-violet-500 rounded-full transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <span>&#128247;</span>
            <span>Upload a photo of your notes</span>
          </div>
        )}
      </button>

      {preview && processing && (
        <div className="rounded-xl overflow-hidden border border-neutral-200">
          <img src={preview} alt="Processing" className="w-full max-h-32 object-cover opacity-50" />
        </div>
      )}
    </div>
  );
}
