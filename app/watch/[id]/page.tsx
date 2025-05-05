import { getVideoData } from "@/lib/videosData";
import { videos } from "@/lib/videos";
import { getVideoComments } from "@/lib/comments";
import VideoRecommendations from "@/components/watch/VideoRecommendations";
import Comments from "@/components/watch/Comments";
import VideoPlayerSection from "@/components/watch/VideoPlayerSection";

export async function generateStaticParams(): Promise<{ id: string }[]> {
  return videos.map((v) => ({ id: v.id }));
}

type WatchPageProps = {
  params: {
    id: string;
  };
};

export default async function WatchPage({ params }: WatchPageProps) {
  const video = await getVideoData(params.id);
  const otherVideos = await Promise.all(
    videos.filter((v) => v.id !== params.id).map((v) => getVideoData(v.id))
  );
  const comments = await getVideoComments(params.id);

  return (
    <main className="p-4 text-white bg-[#0f0f0f]">
      <div className="max-w-[1440px] mx-auto grid lg:grid-cols-[2fr_360px] gap-6">
        <article>
          <VideoPlayerSection video={video} />
          <Comments comments={comments} />
        </article>
        <VideoRecommendations otherVideos={otherVideos} />
      </div>
    </main>
  );
}
