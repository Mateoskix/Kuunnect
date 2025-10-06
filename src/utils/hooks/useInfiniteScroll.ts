"use client";
import { useCallback, useEffect, useRef } from "react";

interface UseInfiniteScrollOptions {
  hasMore: boolean;
  isLoadingMore: boolean;
  loadMore: () => void;
  rootMargin?: string;
  threshold?: number;
}

interface UseInfiniteScrollResult {
  observerRef: React.RefObject<HTMLDivElement | null>;
}

export const useInfiniteScroll = ({
  hasMore,
  isLoadingMore,
  loadMore,
  rootMargin = '100px',
  threshold = 0.1,
}: UseInfiniteScrollOptions): UseInfiniteScrollResult => {
  const observerRef = useRef<HTMLDivElement>(null);

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting && hasMore && !isLoadingMore) {
      loadMore();
    }
  }, [hasMore, isLoadingMore, loadMore]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin,
      threshold,
    });

    const currentRef = observerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [handleObserver, rootMargin, threshold]);

  return { observerRef };
};
