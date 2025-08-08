const client_id = "05ad9e1c20284e6caa19f43762c07953"; // your clientId
const client_secret = "de674770bacd463d926f3aefcbd855b7"; // Your secret
const varySuiteId = "7HEEDYRvzftd8oSQLxVBj0";

// Token cache
let tokenCache = {
  token: null,
  expiresAt: null,
};

// Check if cached token is still valid
function isTokenValid() {
  return (
    tokenCache.token &&
    tokenCache.expiresAt &&
    Date.now() < tokenCache.expiresAt
  );
}

// Get access token using client credentials flow with caching
async function getAccessToken() {
  // Return cached token if still valid
  if (isTokenValid()) {
    return tokenCache.token;
  }

  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${btoa(`${client_id}:${client_secret}`)}`,
      },
      body: "grant_type=client_credentials",
    });

    if (!response.ok) {
      throw new Error("Failed to get access token");
    }

    const data = await response.json();

    // Cache the token with expiration (subtract 60 seconds for safety)
    const expiresIn = (data.expires_in || 3600) * 1000; // Convert to milliseconds
    tokenCache = {
      token: data.access_token,
      expiresAt: Date.now() + expiresIn - 60000, // Subtract 1 minute for safety
    };

    return data.access_token;
  } catch (error) {
    console.error("Error getting access token:", error);
    // Clear invalid cache
    tokenCache = { token: null, expiresAt: null };
    throw error;
  }
}

// Make authenticated request to Spotify API
async function makeSpotifyRequest(endpoint) {
  try {
    const token = await getAccessToken();
    const response = await fetch(`https://api.spotify.com/v1${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      // If we get a 401, the token might be expired, clear cache and retry once
      if (response.status === 401) {
        tokenCache = { token: null, expiresAt: null };
        const newToken = await getAccessToken();
        const retryResponse = await fetch(
          `https://api.spotify.com/v1${endpoint}`,
          {
            headers: {
              Authorization: `Bearer ${newToken}`,
            },
          }
        );

        if (!retryResponse.ok) {
          throw new Error(`Spotify API error: ${retryResponse.status}`);
        }

        return await retryResponse.json();
      }

      throw new Error(`Spotify API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Spotify API request failed:", error);
    throw error;
  }
}

// Get artist's albums
async function getArtistAlbums(artistId = varySuiteId) {
  try {
    const data = await makeSpotifyRequest(
      `/artists/${artistId}/albums?include_groups=album,single&limit=50`
    );
    return data.items;
  } catch (error) {
    console.error("Error fetching artist albums:", error);
    throw error;
  }
}

// Get album tracks
async function getAlbumTracks(albumId) {
  try {
    const data = await makeSpotifyRequest(`/albums/${albumId}/tracks`);
    return data.items;
  } catch (error) {
    console.error("Error fetching album tracks:", error);
    throw error;
  }
}

// Get artist information
async function getArtistInfo(artistId = varySuiteId) {
  try {
    const data = await makeSpotifyRequest(`/artists/${artistId}`);
    return data;
  } catch (error) {
    console.error("Error fetching artist info:", error);
    throw error;
  }
}

export {
  getAccessToken,
  makeSpotifyRequest,
  getArtistAlbums,
  getAlbumTracks,
  getArtistInfo,
};
