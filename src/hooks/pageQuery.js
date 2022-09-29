import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

export default function usePageQuery(options = {}) {
  const router = useRouter();
  const query = useRef({});

  // Parse query from URL - this avoids delay by next js router query
  useEffect(() => {
    query.current = {};
    const urlQuery = new URLSearchParams(router.asPath.split('?')[1]);

    Array.from(urlQuery.entries()).forEach(([key, value]) => {
      query.current[key] = value;
    });
  }, [router.asPath]);
  query.current = { ...query.current, ...router.query };

  return query.current;
}
