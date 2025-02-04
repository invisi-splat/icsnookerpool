import { supabase } from "$lib/supabaseClient";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "../../$types";

export const load: PageServerLoad = async ({ params }) => {
  const breakInfo = await supabase
    .from("breaks")
    .select()
    //@ts-expect-error slug is broken?
    .eq("player", params.slug)
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

  console.log(breakInfo.data)
  
  return { breakInfo: breakInfo.data, name: "Om Goswamy" }
}