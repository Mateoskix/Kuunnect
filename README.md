# Kuunnect 💫

A modern social media platform built with Next.js 15, React 19, and Supabase, enabling users to create posts, share images, and engage through comments.

---

## 📋 Overview

**Kuunnect** is a full-stack social media application that allows users to:

- 🔐 **Authenticate** securely with github login
- 📝 **Create posts** with text content and optional images
- 💬 **Comment** on posts to engage with the community

---

## 🏗️ Architecture

### Tech Stack

- **Frontend:** Next.js 15 (App Router) with React 19
- **Styling:** Tailwind CSS v4
- **Backend:** Supabase (PostgreSQL database, Authentication, Storage)
- **Language:** TypeScript
- **Build Tool:** Turbopack
- **Icons:** Lucide React

### Database Schema

The application uses **Supabase PostgreSQL** with three main tables:

#### `profiles`
- Stores user profile information
- Fields: `id`, `username`
- Linked to Supabase Auth users
- **Auto-populated** via database trigger on user signup (extracts GitHub username from OAuth metadata)


#### `posts`
- Contains all user posts
- Fields: `id`, `title`, `content`, `image`, `created_at`, `updated_at`, `user_id`
- Foreign key relationship with `profiles`

#### `comments`
- Stores comments on posts
- Fields: `id`, `content`, `image`, `created_at`, `updated_at`, `user_id`, `post_id`
- Foreign key relationships with both `profiles` and `posts`

### Authentication & Authorization

- **Authentication:** Supabase Auth with github login
- **Protected Routes:** Middleware checks user authentication status using Supabase SSR
- **Session Management:** Automatic session refresh via Next.js middleware
- Routes are protected by checking if the user is logged in using Supabase's provided libraries

### State Management

The application uses a **lightweight, hook-based approach**:

- **Custom React Hooks** for data fetching and mutations (`useGetPosts`, `useCreatePost`, `useGetComments`, etc.)
- Direct integration with **Supabase query methods** through custom hooks
- Logic reusability through custom hooks to avoid code duplication

### Storage

- **Images:** Stored in Supabase Storage bucket named `posts_images`
- **Access Policies:**
  - **Read:** Public access for all users
  - **Insert/Delete:** Restricted to authenticated users only
- Images are referenced via public URLs in the database

### Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (main)/            # Main application routes
│   ├── auth/              # Authentication pages
│   └── error/             # Error handling
├── components/            # React components
│   ├── auth/              # Authentication components
│   ├── mainPage/          # Home page components
│   ├── myPosts/           # User posts page
│   └── shared/            # Reusable components (Post, Comment, Navbar, etc.)
├── utils/
│   ├── functions/         # Utility functions (date formatting, image URLs)
│   ├── hooks/             # Custom React hooks for data operations
│   ├── supabase/          # Supabase client configurations
│   └── types.ts           # TypeScript type definitions
└── middleware.ts          # Authentication middleware
```

---

## 🎯 Approach & Methodology

### Development Workflow

- **Trunk-Based Development:** Feature branches created for local testing
- **Pull Requests:** All changes merged to `main` via PRs
- **Continuous Deployment:** Vercel automatically deploys on merge to `main`

## 🚀 Running the Application Locally

### Prerequisites

- **Node.js** (v18 or higher)
- **npm**, **yarn**, **pnpm** package manager
- **Supabase Account** (free tier works)

### 1. Clone the Repository

```bash
git clone https://github.com/Mateoskix/Kuunnect
cd kuunnect
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Create the following tables in your Supabase SQL Editor:

```sql
-- Profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  username TEXT UNIQUE NOT NULL
);

-- Posts table
CREATE TABLE posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL
);

-- Comments table
CREATE TABLE comments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  content TEXT NOT NULL,
  image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE NOT NULL
);

-- Trigger function to automatically create profile on user signup
-- This extracts the GitHub username and populates the profiles table
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'user_name', NEW.raw_user_meta_data->>'name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger that executes the function when a new user is created
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

3. Enable GitHub OAuth in your Supabase project:
   - Go to **Authentication > Providers** in your Supabase dashboard
   - Enable **GitHub** provider
   - Add your GitHub OAuth credentials (Client ID and Client Secret)

4. Create a storage bucket named `posts_images`:
   - Go to **Storage** in your Supabase dashboard
   - Create a new bucket: `posts_images`
   - Set it to **public**
   - Add the following policies:
     - **Read:** Allow public access
     - **Insert/Delete:** Allow authenticated users only

### 5. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

You can find these values in your Supabase project settings under **API**.

### 6. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### 7. Build for Production

```bash
npm run build
npm start
```

---

## 📱 Features

- **User Authentication** - Secure GitHub OAuth login with automatic profile creation
- **Post Creation** - Create posts with titles, content, and optional images
- **Comment Creation** - Create comments on posts
- **Image Upload** - Upload and display images in posts and comments
- **Infinite Scroll** - Seamless browsing experience with lazy loading
- **Responsive Design** - Mobile-friendly interface with Tailwind CSS

---

