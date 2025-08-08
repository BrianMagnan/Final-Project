import { getArtistAlbums } from "./spotifyApi";

async function transformedAlbums() {
  const albums = await getArtistAlbums();
  return albums
    .map((album) => ({
      id: album.id,
      title: album.name,
      artwork: album.images[0]?.url,
      releaseDate: album.release_date?.split("-")[0] || "unknown",
      fullReleaseDate: album.release_date,
      spotifyUrl: album.external_urls.spotify,
      albumType: album.album_type,
      totalTracks: album.total_tracks,
    }))
    .sort((a, b) => {
      // Sort by full release date (newest first)
      const dateA = new Date(a.fullReleaseDate);
      const dateB = new Date(b.fullReleaseDate);
      return dateB - dateA;
    });
}

export { transformedAlbums };
