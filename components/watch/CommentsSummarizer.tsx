"use client";

import { useEffect, useState } from "react";
import { YouTubeCommentList } from "@/lib/comments";

export default function CommentsSummarizer({
  comments,
}: {
  comments: YouTubeCommentList;
}) {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!comments.length) return;

    async function analyze() {
      setLoading(true);

      const commentTexts = comments.map((c) => c.text);
      let inputText = commentTexts.join("\n");

      const MAX_CHARS = 3000;
      if (inputText.length > MAX_CHARS) {
        let total = 0;
        const filtered = [];
        for (const text of commentTexts) {
          if (total + text.length > MAX_CHARS) break;
          filtered.push(text);
          total += text.length;
        }
        inputText = filtered.join("\n");
      }

      try {
        const summaryRes = await fetch(
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
        const summaryData = await summaryRes.json();
        const summaryText =
          summaryData?.[0]?.summary_text || "No summary returned.";
        setSummary(summaryText.trim());
      } catch (error) {
        console.error("Analysis error:", error);
        setSummary("Unable to summarize comments at the moment.");
      } finally {
        setLoading(false);
      }
    }

    analyze();
  }, [comments]);

  return (
    <div className="mt-6 bg-[#1e1e1e] border border-[#333] rounded-xl p-4 mb-4">
      <h2 className="text-sm text-gray-400 mb-2">
        Summary of YouTube Comments:
      </h2>
      {loading ? (
        <p className="text-gray-300">Analyzing comments...</p>
      ) : (
        <>
          {summary && (
            <p className="text-white whitespace-pre-line text-sm mb-4">
              {summary}
            </p>
          )}
        </>
      )}
    </div>
  );
}
