"use client";

import { useEffect, useState } from "react";

interface Comment {
  text: string;
}

export default function CommentsSummarizer({
  comments,
}: {
  comments: Comment[];
}) {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!comments.length) return;

    async function summarizeComments() {
      setLoading(true);

      const commentTexts = comments.map((c) => c.text);
      const inputText = commentTexts.join("\n");

      try {
        const res = await fetch(
          "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY}`,
            },
            body: JSON.stringify({ inputs: inputText }),
          }
        );

        const data = await res.json();
        const result = data?.[0]?.summary_text || "No summary returned.";
        setSummary(result.trim());
      } catch (error) {
        console.error("Hugging Face summarization error:", error);
        setSummary("Unable to summarize comments at the moment.");
      } finally {
        setLoading(false);
      }
    }

    summarizeComments();
  }, [comments]);

  return (
    <div className="mt-6 bg-[#1e1e1e] border border-[#333] rounded-xl p-4 mb-5">
      <h2 className="text-sm text-gray-400 mb-2">
        Summary of YouTube Comments:
      </h2>
      {loading ? (
        <p className="text-gray-300">Analyzing comments...</p>
      ) : summary ? (
        <p className="text-white whitespace-pre-line text-sm">{summary}</p>
      ) : (
        <p className="text-gray-500 text-sm">No comments to summarize.</p>
      )}
    </div>
  );
}
