import Link from "next/link";
import Image from "next/image";
import { VideoInterface } from "@/app/videosData";

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
                  className="object-cover"
                  sizes="160px"
                  priority
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
