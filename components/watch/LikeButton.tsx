"use client";

import { useState } from "react";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { Button } from "@/components/ui/button";

export default function LikeButton({ initialLikes }: { initialLikes: number }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);

  const toggleLike = () => {
    setLiked((prev) => !prev);
    if (liked) {
      setLikes((prev) => prev - 1);
    } else {
      setLikes((prev) => prev + 1);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLike}
      aria-pressed={liked}
      className={`flex items-center gap-1 px-3 py-1 rounded-full transition-colors ${
        liked ? "bg-[#272727]" : "hover:bg-[#222]"
      }`}
    >
      {liked ? (
        <AiFillLike className="text-white" />
      ) : (
        <AiOutlineLike className="text-white" />
      )}
      <span className="text-sm">{likes}</span>
    </Button>
  );
}
