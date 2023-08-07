import { useLayoutEffect } from "react";

function useDocumentTitle(title) {
  useLayoutEffect(() => {
    const originalTitle = document.title;

    if (title) {
      document.title = title;
    }

    return () => {
      document.title = originalTitle;
    };
  }, [title]);

  return null;
}

export default useDocumentTitle;
