import { json } from '@sveltejs/kit';
import { createClient } from '@supabase/supabase-js'
import { SUPABASE_PROJECT_URL, SUPABASE_SERVICE_ROLE_KEY } from '$env/static/private';

const BASE = 0.9

export default async (user_id: string) => {
  const supabase = createClient(SUPABASE_PROJECT_URL, SUPABASE_SERVICE_ROLE_KEY);
  const breakInfo = await supabase
    .from("breaks")
    .select()
    .eq("player", user_id)
    .order("break", { ascending: false })
  
  if (breakInfo.error) throw breakInfo.error;

  const highestBreaks: DbBreakInfo = breakInfo.data.toSorted((a, b) => b.break - a.break)

  const weighted_rating = highestBreaks.map(x => x.break).reduce((acc, sBreak, i) => {
    return acc + sBreak * (BASE ** i)
  }, 0)

  console.log(weighted_rating)

  const upsertRating = await supabase
    .from("break_rating")
    .upsert(
      {
        user_id,
        rating: weighted_rating
      }
    )
  if (upsertRating.error) {
      console.error(upsertRating.error);
      return json({ success: false, code: 2, user_id: undefined });
  }

  return json({ success: true, code: 0, weighted_rating });
}