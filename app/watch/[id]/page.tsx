import { getVideoData } from "@/app/videosData";
import { videos } from "@/app/videos";
import { getVideoComments } from "@/app/comments";
import VideoRecommendations from "@/components/watch/VideoRecommendations";
import Comments from "@/components/watch/Comments";
import VideoPlayerSection from "@/components/watch/VideoPlayerSection";
export const revalidate = 3600;

export async function generateStaticParams() {
  return videos.map((v) => ({ id: v.id }));
}

export default async function WatchPage({
  params,
}: {
  params: { id: string };
}) {
  const video = await getVideoData(params.id);
  const otherVideos = await Promise.all(
    videos.filter((v) => v.id !== params.id).map((v) => getVideoData(v.id))
  );
  const comments = await getVideoComments(params.id);

  return (
    <main>
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
