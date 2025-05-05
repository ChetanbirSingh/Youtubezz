import { BiDislike, BiDownload, BiShare } from "react-icons/bi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { VideoInterface } from "@/app/videosData";
import LikeButton from "./LikeButton";
import ThumbnailAnalyzer from "./ThumbnailAnalyzer";
export default function VideoPlayerSection({
  video,
}: {
  video: VideoInterface;
}) {
  return (
    <>
      <div className="aspect-video w-full bg-black mb-4">
        <iframe
          className="w-full h-full rounded-xl"
          src={`https://www.youtube.com/embed/${video.id}`}
          title={video.title}
          allowFullScreen
        />
        <ThumbnailAnalyzer videoId={video.id} />
      </div>

      <h1 className="text-lg md:text-xl font-semibold mb-2 leading-snug">
        {video.title}
      </h1>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={video.channelImage} alt={video.channel} />
            <AvatarFallback>{video.channel}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-sm">{video.channel}</p>
            <p className="text-xs text-gray-400">
              {video.subscribers} subscribers
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs sm:text-sm">
          <LikeButton initialLikes={video.likes} />
          <div className="flex items-center gap-1 bg-[#222] px-3 py-1 rounded-full">
            <BiDislike />
          </div>
          <div className="flex items-center gap-1 bg-[#222] px-3 py-1 rounded-full">
            <BiShare /> Share
          </div>
          <div className="flex items-center gap-1 bg-[#222] px-3 py-1 rounded-full">
            <BiDownload /> Download
          </div>
        </div>
      </div>

      <details className="bg-[#1c1c1c] p-3 rounded mb-6">
        <summary className="cursor-pointer font-medium text-sm text-gray-300">
          {video.views} views • {video.timeAgo}
          <p className="text-sm text-gray-300 mt-1 line-clamp-3">
            {video.description}
          </p>
        </summary>
        <p className="mt-2 text-sm whitespace-pre-line text-gray-200">
          {video.description}
        </p>
      </details>
    </>
  );
}
