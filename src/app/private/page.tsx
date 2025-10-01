import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export default async function PrivatePage() {
  async function signOut() {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <>
      <p>Hello {data.user.email}</p>
      <button onClick={() => signOut()}>Sign Out</button>
    </>
  );
}
