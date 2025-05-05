import he from "he";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { YouTubeCommentList } from "@/lib/comments";
import LikeButton from "./LikeButton";
import CommentsSummarizer from "./CommentsSummarizer";

export default function Comments({
  comments,
}: {
  comments: YouTubeCommentList;
}) {
  return (
    <section className="mt-8">
      <CommentsSummarizer comments={comments} />

      <h3 className="text-lg font-semibold mb-5">Top Comments</h3>
      <div className="space-y-6">
        {comments.map((c, idx: number) => (
          <div key={idx} className="flex items-start gap-4">
            <Avatar>
              <AvatarImage src={c.authorImg} alt={c.author} />
              <AvatarFallback>{c.author.charAt(1)}</AvatarFallback>
            </Avatar>

            <div className="flex-1 bg-[#1a1a1a] p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-sm font-semibold">{c.author}</p>
                <span className="text-xs text-gray-500">
                  {new Date(c.publishedAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">
                {he.decode(c.text.replace(/<[^>]+>/g, ""))}
              </p>
              <div className="mt-2 flex items-center gap-2 text-sm text-gray-400">
                <LikeButton initialLikes={c.likeCount} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
