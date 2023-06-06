import { useEffect } from 'react';

const useTitle = (title) => {
  useEffect(() => {
    document.title = 'Kids Kraft | ' + title;
  }, []);
  return;
};

export default useTitle;
