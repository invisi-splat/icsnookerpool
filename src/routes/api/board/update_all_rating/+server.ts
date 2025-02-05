import type { RequestHandler } from './$types';
import { createClient } from '@supabase/supabase-js'
import { SUPABASE_PROJECT_URL, SUPABASE_SERVICE_ROLE_KEY } from '$env/static/private';
import update_rating from '../update_rating/update_rating';
import { json } from '@sveltejs/kit';

// ONLY USE THIS ROUTE IN EMERGENCIES

/*
export const POST: RequestHandler = async _0 => {
  const supabase = createClient(SUPABASE_PROJECT_URL, SUPABASE_SERVICE_ROLE_KEY);

  await supabase
    .from("break_rating")
    .delete()
    .neq("user_id", "")

  const allUsers = await supabase
    .from("users")
    .select("user_id")
  
  if (allUsers.error) throw allUsers.error;

  for (const user of allUsers.data) {
    update_rating(user.user_id as string)
  }

  return json({})
}
*/