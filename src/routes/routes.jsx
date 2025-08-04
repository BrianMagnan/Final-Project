import Main from "../Components/Pages/Main/Main";
import Music from "../Components/Pages/Music/Music";

export const routes = [
  {
    path: "/",
    element: Main,
    label: "Home",
  },
  {
    path: "/music",
    element: Music,
    label: "Music",
  },
  {
    path: "https://www.youtube.com/@VarySuite",
    label: "Videos",
    isExternal: true,
  },
  // {
  //   path: "/contact",
  //   element: Contact,
  //   label: "Contact",
  // },
];

export const generateNavItems = (routesArray = routes) => {
  return routesArray.map((route) => ({
    path: route.path,
    label: route.label,
    isExternal: route.isExternal || false,
  }));
};
