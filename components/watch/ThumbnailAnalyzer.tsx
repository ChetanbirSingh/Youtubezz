"use client";

import { useEffect, useState } from "react";
import { FaGoogle, FaAmazon } from "react-icons/fa";

export default function ThumbnailAnalyzer({ videoId }: { videoId: string }) {
  const [bestGuess, setBestGuess] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const imageUrl = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;

  useEffect(() => {
    async function analyze() {
      try {
        setLoading(true);
        const res = await fetch("/api/thumbnail-analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imageUrl }),
        });

        const data = await res.json();
        const guess =
          data.responses?.[0]?.webDetection?.webEntities?.[0]?.description ||
          null;
        setBestGuess(guess);
      } catch (err) {
        console.error("Thumbnail analyze error:", err);
        setBestGuess(null);
      } finally {
        setLoading(false);
      }
    }

    analyze();
  }, [imageUrl]);

  return (
<div className="mt-6">
  <p className="text-sm text-gray-400 italic mb-3">
    AI best guess (may not be accurate):
  </p>

  {loading ? (
    <p className="text-gray-300">Analyzing thumbnail...</p>
  ) : bestGuess ? (
    <div className="bg-[#1e1e1e] border border-[#333] rounded-2xl px-5 py-4 shadow-lg w-full max-w-md">
      <p className="text-lg font-semibold text-white mb-2">{bestGuess}</p>

      <div className="flex flex-wrap gap-4">
        <a
          href={`https://www.google.com/search?q=${encodeURIComponent(bestGuess)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition"
        >
          <FaGoogle className="text-lg" /> Search on Google
        </a>
        <a
          href={`https://www.amazon.com/s?k=${encodeURIComponent(bestGuess)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm font-medium text-yellow-400 hover:text-yellow-300 transition"
        >
          <FaAmazon className="text-lg" /> Search on Amazon
        </a>
      </div>
    </div>
  ) : (
    <p className="text-gray-400">No confident guess found.</p>
  )}
</div>
  );
}
