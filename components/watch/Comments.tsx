import he from "he";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { YouTubeCommentList } from "@/app/comments";

export default function Comments({ comments }: {comments: YouTubeCommentList}) {
  return (
    <section className="mt-8">
      <h3 className="text-lg font-semibold mb-5">Top Comments</h3>
      <div className="space-y-6">
        {comments.map((c, idx: number) => (
          <div key={idx} className="flex items-start gap-4">
            <Avatar>
              <AvatarImage src={c.authorImg} alt={c.author} />
              <AvatarFallback>CN</AvatarFallback>
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
                <svg
                  className="w-4 h-4 fill-current text-gray-400"
                  viewBox="0 0 24 24"
                >
                  <path d="M14 9V5a3 3 0 0 0-6 0v4H5v12h14V9h-5z" />
                </svg>
                <span>{c.likeCount}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
