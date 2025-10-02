import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { useEffect } from "react";
import { useState } from "react";

export const useGetUser = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await createClient().auth.getUser();
      setUser(data.user);
    };
    fetchUser();
  }, []);

  return user;
};
