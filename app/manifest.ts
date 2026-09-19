import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Examina — AI Quiz Generator",
    short_name: "Examina",
    description:
      "Turn any text into multiple choice, flashcards, fill-in-the-blank and true/false questions in seconds.",
    start_url: "/m",
    display: "standalone",
    background_color: "#FBF1EE",
    theme_color: "#FDE8EC",
    orientation: "portrait",
    icons: [
      { src: "/logo.png", sizes: "any", type: "image/png" },
      { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
    ],
  };
}