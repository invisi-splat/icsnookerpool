import { supabase } from "$lib/supabaseClient";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  const { error, data } = await supabase
    .from("break_rating")
    .select("*, users (user_id, given_name, last_name) ")
    .order("rating", { ascending: false })

  if (error) throw error;

  return { ratingData: data as (Rating & { users: User })[] }
}