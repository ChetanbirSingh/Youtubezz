import Link from "next/link";
import Image from "next/image";
import { VideoInterface } from "@/lib/videosData";

export default function VideoRecommendations({
  otherVideos,
}: {
  otherVideos: VideoInterface[];
}) {
  return (
    <aside className="w-full lg:w-[360px]">
      <h2 className="text-md font-semibold mb-4">Up Next</h2>
      {otherVideos.slice(0, 10).map((v, i: number) => (
        <div className="mb-5" key={i}>
          <Link href={`/watch/${v.id}`}>
            <div className="flex gap-3 cursor-pointer group">
              <div className="relative w-40 aspect-video rounded overflow-hidden">
              <Image
                src={v.thumbnail}
                alt={v.title}
                fill
                className="object-cover transition-opacity duration-200 ease-in-out group-hover:opacity-0"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                priority
              />

              <iframe
                className="w-full h-full "
                src={`https://www.youtube.com/embed/${v.id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${v.id}`}
                title={v.title}
                allow="autoplay"
              />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold line-clamp-2">
                  {v.title}
                </h3>
                <p className="text-xs text-[#aaa]">{v.channel}</p>
                <p className="text-xs text-[#aaa]">{v.views} views</p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </aside>
  );
}
