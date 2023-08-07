import { useLocation } from "react-router-dom";

function usePageTitle(routes) {
  const location = useLocation();

  const findTitle = (routes, path) => {
    for (let route of routes) {
      if (route.path === path) return route.title;
      if (route.children) {
        const title = findTitle(route.children, path);
        if (title) return title;
      }
    }
    return null;
  };

  return findTitle(routes, location.pathname);
}

export default usePageTitle;