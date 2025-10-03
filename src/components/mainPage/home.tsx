"use client";
import React, { useCallback, useEffect, useRef } from "react";
import Post from "../shared/post/post";
import CreatePost from "./components/createPost/createPost";
import { useGetPosts } from "@/utils/hooks/useGetPosts";

const MainPage = () => {
  const { posts, isLoading, isLoadingMore, hasMore, loadMore, error } = useGetPosts(20);
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
      rootMargin: '100px',
      threshold: 0.1,
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
  }, [handleObserver]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="text-red-500">Error loading posts: {error}</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-16 p-4 max-w-7xl mx-auto">
      <CreatePost />
      {posts.map((post) => (
        <Post key={post.id} {...post} />
      ))}
      
      {/* Infinite scroll trigger */}
      <div ref={observerRef} className="flex justify-center py-8">
        {isLoadingMore ? (
          <div className="text-lg">Loading more posts...</div>
        ) : hasMore ? (
          <div className="text-gray-500">Scroll down for more posts</div>
        ) : (
          <div className="text-gray-500">No more posts to load</div>
        )}
      </div>
    </div>
  );
};

export default MainPage;
