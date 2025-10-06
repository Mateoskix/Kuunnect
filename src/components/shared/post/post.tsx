import React, { useEffect, useState } from "react";
import Image from "next/image";
import { formatDate } from "@/utils/functions/formatDate";
import { PostProps } from "@/utils/types";
import { getImageUrl } from "@/utils/functions/getImageUrl";
import ImageModal from "../imageModal/imageModal";
import { useGetUser } from "@/utils/hooks/useGetUser";
import { Trash } from "lucide-react";
import { useDeletePosts } from "@/utils/hooks/useDeletePosts";

const Post = ({
  id,
  title,
  content,
  image = undefined,
  created_at,
  user_id,
}: PostProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { success, deletePost } = useDeletePosts();
  const user = useGetUser();
  useEffect(() => {
    if (success) {
      window.location.reload();
    }
  }, [success]);

  return (
    <div className="styled-box p-0!">
      <div className="flex flex-col">
        {image && (
          <div
            className="relative w-full h-56 overflow-hidden rounded-t-xl"
            onClick={() => setIsModalOpen(true)}
          >
            <Image
              src={getImageUrl(image)}
              alt={title}
              fill
              className="object-cover hover:scale-105 transition-all duration-300"
            />
          </div>
        )}
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-light text-gray-900 leading-tight">
              {title}
            </h3>
            <span className="text-sm text-gray-500 font-light">
              {formatDate(created_at)}
              {user?.id === user_id && (
                <button
                  className="z-10 ml-2 bg-primary text-complement hover:bg-secondary rounded-full p-2 cursor-pointer"
                  onClick={() => {
                    deletePost(id);
                  }}
                >
                  <Trash size={16} />
                </button>
              )}
            </span>
          </div>
          <p className="text-gray-700 leading-relaxed break-all">{content}</p>
        </div>
      </div>

      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        src={image ? getImageUrl(image) : ""}
        alt={title}
      />
    </div>
  );
};

export default Post;
