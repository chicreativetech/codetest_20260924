import { useCallback, useState, type RefCallback } from 'react';

export interface IncrementalList<T> {
  visibleItems: T[];
  hasMore: boolean;
  sentinelRef: RefCallback<HTMLElement>;
}

const PRELOAD_MARGIN = '400px';

/*

Lazy rendering:
We start by showing the first pageSize tasks and load more when the user gets close
to the bottom of the list. This works well since the cards can have different heights
and we can keep normal page scrolling.

For really big lists, like 10,000+ tasks, I would do a bit more:

Rendering: right now loaded tasks stay in the DOM. For very large lists I'd use
windowing, so only the rows that are currently visible are rendered.

Data: I wouldn't load and filter 10k tasks in the browser. The API should handle
filtering and pagination and we would just fetch the next page when needed.

Performance: filtering is memoised in useFilteredTasks and the cards use React.memo,
which helps avoid unnecessary re-renders.
*/
export function useIncrementalList<T>(items: T[], pageSize: number): IncrementalList<T> {
  const [visibleCount, setVisibleCount] = useState(pageSize);
  const hasMore = visibleCount < items.length;

  // Depends on visibleCount so a fresh observer is created after every page. Its initial callback
  // re-checks the sentinel, loading another page if it is still in view (e.g. on very tall screens).
  const sentinelRef = useCallback<RefCallback<HTMLElement>>(
    (sentinel) => {
      if (!sentinel) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setVisibleCount((count) => count + pageSize);
        },
        { rootMargin: PRELOAD_MARGIN }
      );
      observer.observe(sentinel);
      return () => observer.disconnect();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps -- visibleCount intentionally re-creates the observer
    [visibleCount, pageSize]
  );

  return { visibleItems: items.slice(0, visibleCount), hasMore, sentinelRef };
}
