export interface VideoInterface {
  id: string;
  title: string;
  channel: string;
  channelImage: string;
  subscribers: string;
  likes: number;
  views: string;
  timeAgo: string;
  description: string;
  thumbnail: string;
}

export async function getVideoData(videoId: string) {
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${videoId}&key=${process.env.YOUTUBE_API_KEY}`
  );
  const data = await res.json();
  const video = data.items[0];

  const channelId = video.snippet.channelId;
  const channelRes = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${process.env.YOUTUBE_API_KEY}`
  );
  const channelData = await channelRes.json();
  const channel = channelData.items[0];

  const publishedAt = new Date(video.snippet.publishedAt);
  const now = new Date();
  const diffInDays = Math.floor(
    (now.getTime() - publishedAt.getTime()) / (1000 * 60 * 60 * 24)
  );

  let timeAgo = "Just now";
  if (diffInDays >= 365) {
    timeAgo = `${Math.floor(diffInDays / 365)} year(s) ago`;
  } else if (diffInDays >= 30) {
    timeAgo = `${Math.floor(diffInDays / 30)} month(s) ago`;
  } else if (diffInDays >= 7) {
    timeAgo = `${Math.floor(diffInDays / 7)} week(s) ago`;
  } else if (diffInDays >= 1) {
    timeAgo = `${diffInDays} day(s) ago`;
  } else {
    const diffInHours = Math.floor(
      (now.getTime() - publishedAt.getTime()) / (1000 * 60 * 60)
    );
    if (diffInHours >= 1) {
      timeAgo = `${diffInHours} hour(s) ago`;
    } else {
      const diffInMinutes = Math.floor(
        (now.getTime() - publishedAt.getTime()) / (1000 * 60)
      );
      if (diffInMinutes >= 1) {
        timeAgo = `${diffInMinutes} minute(s) ago`;
      }
    }
  }

  return {
    id: videoId,
    title: video.snippet.title,
    description: video.snippet.description,
    channel: video.snippet.channelTitle,
    channelImage: channel.snippet.thumbnails.default.url,
    subscribers: channel.statistics.subscriberCount,
    publishedAt: video.snippet.publishedAt,
    thumbnail: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
    views: video.statistics.viewCount,
    likes: video.statistics.likeCount,
    duration: video.contentDetails.duration,
    timeAgo,
  };
}
