/**
 * npm i node-fetch dotenv
 * node script.js
 *
 * Env (use .env file or export):
 *   YT_API_KEY  - required, YouTube Data API key
 *   YT_HANDLE   - optional, channel handle (default: @CanCanaryCan)
 */

import "dotenv/config";
import fetch from "node-fetch";

const API_KEY = process.env.YT_API_KEY;
if (!API_KEY) throw new Error("Missing YT_API_KEY env var");

const HANDLE = process.env.YT_HANDLE || "@CanCanaryCan"; // from https://www.youtube.com/@CanCanaryCan/playlists

async function ytGet(path, params) {
  const url = new URL(`https://www.googleapis.com/youtube/v3/${path}`);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, String(v));
  url.searchParams.set("key", API_KEY);

  const res = await fetch(url.toString());
  const json = await res.json();
  if (!res.ok) {
    throw new Error(`YouTube API error (${res.status}): ${JSON.stringify(json)}`);
  }
  return json;
}

async function resolveChannelIdFromHandle(handle) {
  // channels.list supports "forHandle" (value may include or omit '@')
  const data = await ytGet("channels", {
    part: "id",
    forHandle: handle,
    maxResults: 1,
  });

  const channelId = data?.items?.[0]?.id;
  if (!channelId) throw new Error(`Could not resolve channelId for handle: ${handle}`);
  return channelId;
}

function bestThumb(thumbnails) {
  // prefer higher quality if present
  return (
    thumbnails?.maxres?.url ||
    thumbnails?.standard?.url ||
    thumbnails?.high?.url ||
    thumbnails?.medium?.url ||
    thumbnails?.default?.url ||
    ""
  );
}

async function listAllPlaylists(channelId) {
  const out = [];
  let pageToken = undefined;

  while (true) {
    const data = await ytGet("playlists", {
      part: "snippet",
      channelId,
      maxResults: 50,
      ...(pageToken ? { pageToken } : {}),
    });

    for (const pl of data.items || []) {
      const playlistId = pl.id;
      const title = pl?.snippet?.title || "";
      const thumb = bestThumb(pl?.snippet?.thumbnails);

      if(thumb && !thumb.includes('no_thumbnail')){
        out.push({
          url: `https://www.youtube.com/playlist?list=${playlistId}`,
          src: thumb,
          title: title,
        });
      }
    }

    pageToken = data.nextPageToken;
    if (!pageToken) break;
  }

  out.push({
    url: "https://www.youtube.com/results?search_query=black+canary+cancanarycan+valorant",
    src: "https://i.ytimg.com/vi/Pa0eA1gGZo0/hqdefault.jpg",
    title: "Valorant",
  })

  return out;
}

async function main() {
  const channelId = await resolveChannelIdFromHandle(HANDLE);
  const playlists = await listAllPlaylists(channelId);

  // Print JSON array
  console.log(JSON.stringify(playlists, null, 2));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});