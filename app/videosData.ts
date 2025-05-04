export async function getVideoData(videoId: string) {
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${process.env.YOUTUBE_API_KEY}`
  );

  const data = await res.json();

  if (!data.items || data.items.length === 0) {
    console.warn(`No video found for ID: ${videoId}`);
    return {
      title: "Unknown Title",
      description: "Video not found.",
      channel: "Unknown Channel",
      publishedAt: "",
      thumbnail: "/fallback.jpg",
      views: "0",
      likes: "0",
    };
  }

  const video = data.items[0];

  return {
    title: video.snippet.title,
    description: video.snippet.description,
    channel: video.snippet.channelTitle,
    channellImage: '/fallback-pfp.jpg',
    publishedAt: video.snippet.publishedAt,
    thumbnail: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
    views: video.statistics.viewCount,
    likes: video.statistics.likeCount,
    duration: video.statistics.duration,
  };
}
