export const routes = [
  {
    path: "/",
    label: "Home",
  },
  {
    path: "/music",
    label: "Music",
  },
  {
    path: "/videos",
    label: "Videos",
  },
];

export const generateNavItems = (routesArray = routes) => {
  return routesArray.map((route) => ({
    path: route.path,
    label: route.label,
    isExternal: route.isExternal || false,
  }));
};
