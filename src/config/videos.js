// Featured YouTube videos for the Videos page grid (edit IDs/titles as needed)
export const FEATURED_VIDEOS = [
  {
    id: "ijN-f_ODGQE",
    url: "https://www.youtube.com/watch?v=ijN-f_ODGQE",
    title: "PAPERMOON (Cover)",
  },
  {
    id: "feylLW5Vj9U",
    url: "https://www.youtube.com/watch?v=feylLW5Vj9U",
    title: "A.I. 1.5 (Full Album)",
  },
  {
    id: "2EqeV97xhII",
    url: "https://www.youtube.com/watch?v=2EqeV97xhII",
    title: "The Getaway",
  },
  {
    id: "w2notCnsi9s",
    url: "https://www.youtube.com/watch?v=w2notCnsi9s",
    title: "Summer Candy",
  },
];

/** Homepage featured video */
export const FEATURED_VIDEO = {
  id: "pUiJB0xk-Iw",
  url: "https://www.youtube.com/watch?v=pUiJB0xk-Iw",
  title: "A Thousand Lives",
  subtitle: "Melody of War (Feat. Brian Magnan and Big Brev)",
};

export const youtubeEmbedUrl = (id) =>
  `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
export const youtubeThumbUrl = (id) =>
  `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
