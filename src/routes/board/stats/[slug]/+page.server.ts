import { supabase } from "$lib/supabaseClient";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "../../$types";

export const load: PageServerLoad = async ({ params }) => {
  //@ts-expect-error slug is broken?
  const user_id = params.slug;

  const breakInfo = await supabase
    .from("breaks")
    .select()
    .eq("player", user_id)
    .order("submitted", { ascending: false })  

  if (breakInfo.error) {
    if (breakInfo.error.code === "22P02") {
      error(404, {
        message: 'Invalid UUID! Double check the link.'
      });
    } else {
      throw breakInfo.error;
    }
  }

  if (breakInfo.data.length === 0) {
    error(404, {
      message: "No breaks found for this UUID! Double check the link."
    })
  }

  const userInfo = await supabase
    .from("users")
    .select()
    .eq("user_id", user_id)

  if (userInfo.error) throw userInfo.error;

  const ratingInfo = await supabase
    .from("break_rating")
    .select()
    .order("rating", { ascending: false })
  
  if (ratingInfo.error) throw ratingInfo.error;

  const ratingInfoData: Rating[] = ratingInfo.data
  const ranking = ratingInfoData.findIndex(e => e.user_id === user_id) + 1
  const rating = ratingInfoData.find(e => e.user_id === user_id)?.rating
  
  return { breakInfo: breakInfo.data, userInfo: userInfo.data[0], ranking, rating }
}