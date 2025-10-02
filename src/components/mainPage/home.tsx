import React from 'react'
import Post from '../shared/post/post';

const dummyPosts = [
  {
      id: "post-1",
      title: "Welcome to Kuunnect!",
      content: "This is my first post on this amazing platform. Excited to connect with everyone!",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      createdAt: "2024-01-15T10:30:00Z",
      updatedAt: "2024-01-15T10:30:00Z",
      userId: "user-123"
  },
  {
      id: "post-2",
      title: "Beautiful Sunset Today",
      content: "Just captured this incredible sunset from my balcony. Nature never fails to amaze me!",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
      createdAt: "2024-01-14T18:45:00Z",
      updatedAt: "2024-01-14T18:45:00Z",
      userId: "user-456"
  },
  {
      id: "post-3",
      title: "Coffee Break Thoughts",
      content: "Sometimes the best ideas come during a simple coffee break. What's your favorite thinking spot?",
      createdAt: "2024-01-14T14:20:00Z",
      updatedAt: "2024-01-14T14:20:00Z",
      userId: "user-789"
  },
  {
      id: "post-4",
      title: "Weekend Adventures",
      content: "Spent the weekend hiking in the mountains. The fresh air and stunning views were exactly what I needed to recharge.",
      image: "https://images.unsplash.com/photo-1464822759844-d150baeccee4?w=400&h=400&fit=crop",
      createdAt: "2024-01-13T09:15:00Z",
      updatedAt: "2024-01-13T09:15:00Z",
      userId: "user-321"
  },
  {
      id: "post-5",
      title: "New Recipe Discovery",
      content: "Tried making homemade pasta for the first time today. It's more work than expected but totally worth it!",
      image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=400&fit=crop",
      createdAt: "2024-01-12T19:30:00Z",
      updatedAt: "2024-01-12T19:30:00Z",
      userId: "user-654"
  },
  {
      id: "post-6",
      title: "Book Recommendation",
      content: "Just finished reading 'The Midnight Library' by Matt Haig. Highly recommend it to anyone looking for a thought-provoking read!",
      createdAt: "2024-01-11T16:45:00Z",
      updatedAt: "2024-01-11T16:45:00Z",
      userId: "user-987"
  },
  {
      id: "post-7",
      title: "Garden Update",
      content: "My tomato plants are finally starting to flower! Can't wait for the first harvest of the season.",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop",
      createdAt: "2024-01-10T11:00:00Z",
      updatedAt: "2024-01-10T11:00:00Z",
      userId: "user-147"
  },
  {
      id: "post-8",
      title: "Morning Motivation",
      content: "Every new day is a chance to be better than yesterday. What are you grateful for today?",
      createdAt: "2024-01-09T07:30:00Z",
      updatedAt: "2024-01-09T07:30:00Z",
      userId: "user-258"
  }
];


const MainPage = () => {
  return (
    <div className='grid grid-cols-1 gap-16 p-4 max-w-7xl mx-auto'>
      {dummyPosts.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </div>
  )
}

export default MainPage