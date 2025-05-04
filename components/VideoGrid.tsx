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
        <Link href={`/watch/${videos[index].id}`} key={videos[index].id}>
          <div className="group cursor-pointer">
            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-[#1f1f1f]">
              <Image
                src={video.thumbnail}
                alt={video.title}
                fill
                className="object-cover group-hover:scale-[1.02] transition-transform duration-200 ease-in-out"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                priority
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
          </div>
        </Link>
      ))}
    </section>
  );
}
