type YouTubeComment = {
  id: string;
  author: string;
  authorImg: string;
  text: string;
  likeCount: number;
  publishedAt: string;
};

export type YouTubeCommentList = YouTubeComment[];
type commentSnippet = {
  snippet: {
    topLevelComment: {
      snippet: {
        authorDisplayName: string;
        authorProfileImageUrl: string;
        textDisplay: string;
        likeCount: number;
        publishedAt: string;
      };
    };
  };
};

export async function getVideoComments(
  videoId: string
): Promise<YouTubeComment[]> {
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&maxResults=100&key=${process.env.YOUTUBE_API_KEY}`
  );

  const data = await res.json();

  return data.items.map((item: commentSnippet) => ({
    author: item.snippet.topLevelComment.snippet.authorDisplayName,
    authorImg: item.snippet.topLevelComment.snippet.authorProfileImageUrl,
    text: item.snippet.topLevelComment.snippet.textDisplay,
    likeCount: item.snippet.topLevelComment.snippet.likeCount,
    publishedAt: item.snippet.topLevelComment.snippet.publishedAt,
  }));
}
