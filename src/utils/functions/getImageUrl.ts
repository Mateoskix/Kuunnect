import { createClient } from "@/utils/supabase/client";

export const getImageUrl = (imagePath: string) => {
    const supabase = createClient();
    return supabase.storage.from('posts_images').getPublicUrl(imagePath).data.publicUrl;
  };