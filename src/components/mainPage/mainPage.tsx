"use client";
import React from "react";
import Post from "../shared/post/post";
import CreatePost from "./components/createPost/createPost";
import { useGetPosts } from "@/utils/hooks/posts/useGetPosts";
import { useInfiniteScroll } from "@/utils/hooks/useInfiniteScroll";
import BaseLayout from "../shared/baseLayout/baseLayout";

const MainPage = () => {
  const { posts, isLoading, isLoadingMore, hasMore, loadMore, error, refetch } = useGetPosts(20);
  const { observerRef } = useInfiniteScroll({
    hasMore,
    isLoadingMore,
    loadMore,
  });

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
    <BaseLayout>
      <CreatePost onPostCreated={refetch} />
      {posts.map((post) => (
        <Post key={post.id} {...post} />
      ))}
      <div ref={observerRef} className="flex justify-center py-8">
        {isLoadingMore ? (
          <div className="text-lg">Loading more posts...</div>
        ) : hasMore ? (
          <div className="text-gray-500">Scroll down for more posts</div>
        ) : (
          <div className="text-gray-500">No more posts to load</div>
        )}
      </div>
    </BaseLayout>
  );
};

export default MainPage;
