import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  getArtistAlbums,
  getAlbumTracks,
  getArtistInfo,
} from "../utils/spotifyApi";
import { transformedAlbums } from "../utils/albumUtils";

const MusicContext = createContext();

export function MusicProvider({ children }) {
  const [albums, setAlbums] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState("Loading");
  const [artistInfo, setArtistInfo] = useState(null);

  // Fetch all music data
  const fetchMusicData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      setLoadingMessage("Loading...");

      // Fetch artist info and albums in parallel
      const [artistData, rawAlbums] = await Promise.all([
        getArtistInfo(),
        getArtistAlbums(),
      ]);

      // Transform the raw album data
      const transformedAlbumsData = transformedAlbums(rawAlbums);

      setArtistInfo(artistData);
      setAlbums(transformedAlbumsData);
    } catch (error) {
      console.error("Error fetching music data:", error);
      setError(error.message || "Failed to load music data");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch album tracks
  const fetchAlbumTracks = useCallback(async (albumId) => {
    try {
      const tracks = await getAlbumTracks(albumId);
      return tracks;
    } catch (error) {
      console.error("Error fetching album tracks:", error);
      throw new Error("Failed to load album tracks. Please try again.");
    }
  }, []);

  // Refresh music data
  const refreshMusicData = useCallback(() => {
    fetchMusicData();
  }, [fetchMusicData]);

  // Initialize data on mount
  useEffect(() => {
    fetchMusicData();
  }, [fetchMusicData]);

  const value = {
    // State
    albums,
    artistInfo,
    isLoading,
    error,
    loadingMessage,

    // Actions
    fetchMusicData,
    fetchAlbumTracks,
    refreshMusicData,

    // Computed values
    mostRecentAlbum: albums[0],
    hasAlbums: albums.length > 0,
  };

  return (
    <MusicContext.Provider value={value}>{children}</MusicContext.Provider>
  );
}

export function useMusic() {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error("useMusic must be used within a MusicProvider");
  }
  return context;
}
