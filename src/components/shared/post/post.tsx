import React from 'react'
import Image from 'next/image'
import { formatDate } from '@/utils/functions/formatDate';

type PostProps = {
    id: string;
    title: string;
    content: string;
    image?: string;
    createdAt: string;
    userId: string;
}

const Post = ({ id, title, content, image = undefined, createdAt, userId }: PostProps) => {
  return (
    <div className='styled-box p-0!'>
      <div className='flex flex-col'>
        {/* Header Image */}
        {image && (
          <div className='relative w-full h-48 overflow-hidden rounded-t-xl'>
            <Image 
              src={image} 
              alt={title} 
              fill
              className='object-cover'
            />
          </div>
        )}
        
        {/* Content Section */}
        <div className='p-4 space-y-3'>
          {/* Title and Date */}
          <div className='flex items-center justify-between'>
            <h3 className='text-lg font-light text-gray-900 leading-tight'>{title}</h3>
            <span className='text-sm text-gray-500 font-light'>{formatDate(createdAt)}</span>
          </div>
          
          {/* Content */}
          <p className='text-gray-700 leading-relaxed'>{content}</p>
        </div>
      </div>
    </div>
  )
}

export default Post