import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export default async function PrivatePage() {
  async function signOut() {
    'use server'
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();
    if (!error) {
      redirect('/');
    }
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect('/');
  }

  return (
    <>
      <p>Hello {data?.user?.email}</p>
      <form>
        <button formAction={signOut}>Sign Out</button>
      </form>
    </>
  );
}
