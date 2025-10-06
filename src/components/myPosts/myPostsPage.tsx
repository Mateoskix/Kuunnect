"use client";
import React from "react";
import Post from "../shared/post/post";
import { useGetUserPosts } from "@/utils/hooks/posts/useGetUserPosts";
import { useGetUser } from "@/utils/hooks/user/useGetUser";
import { useInfiniteScroll } from "@/utils/hooks/useInfiniteScroll";
import BaseLayout from "../shared/baseLayout/baseLayout";

const MyPostsPage = () => {
  const user = useGetUser();
  const { posts, isLoadingMore, hasMore, loadMore } = useGetUserPosts(
    user?.id || ""
  );
  const { observerRef } = useInfiniteScroll({
    hasMore,
    isLoadingMore,
    loadMore,
  });

  return (
    <BaseLayout>
      <h1 className="lg:text-4xl text-2xl text-center text-primary font-bold lg:mb-6 mb-2">
        My Posts
      </h1>
      {posts.length === 0 ? (
        <div className="flex justify-center items-center min-h-96">
          <div className="text-gray-500">
            You haven&apos;t created any posts yet
          </div>
        </div>
      ) : (
        <>
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
        </>
      )}
    </BaseLayout>
  );
};

export default MyPostsPage;
