import Link from "next/link";
import Image from "next/image";
import { getVideoData } from "@/app/videosData";
import { videos } from "@/app/videos";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function VideoGrid() {
  const videoData = await Promise.all(
    videos.map((video) => getVideoData(video.id))
  );

  return (
    <section className="w-full px-4 py-6 grid gap-x-4 gap-y-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {videoData.map((video, index) => (
        <div key={videos[index].id} className="cursor-pointer">
          <Link href={`/watch/${videos[index].id}`}>
            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-[#1f1f1f] group">
              <Image
                src={video.thumbnail}
                alt={video.title}
                fill
                className="object-cover transition-opacity duration-200 ease-in-out group-hover:opacity-0"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                priority
              />

              <iframe
                className="w-full h-full "
                src={`https://www.youtube.com/embed/${videos[index].id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videos[index].id}`}
                title={video.title}
                allow="autoplay"
              />
            </div>

            <div className="flex items-center gap-3 mt-3">
              <Avatar>
                <AvatarImage src={video.channelImage} alt={video.channel} />
                <AvatarFallback>{video.channel}</AvatarFallback>
              </Avatar>

              <div>
                <h3 className="text-sm font-medium leading-tight line-clamp-2">
                  {video.title}
                </h3>
                <p className="text-xs text-[#aaa]">{video.channel}</p>
                <p className="text-xs text-[#aaa]">{video.views} views</p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </section>
  );
}
