import { json } from '@sveltejs/kit';
import type { RequestHandler } from '../$types';
import { createClient } from '@supabase/supabase-js'
import { SUPABASE_PROJECT_URL, SUPABASE_SERVICE_ROLE_KEY } from '$env/static/private';

export const POST: RequestHandler = async ({ request }) => {
    const supabase = createClient(SUPABASE_PROJECT_URL, SUPABASE_SERVICE_ROLE_KEY);
	const { givenName, lastName } = await request.json();
    const findUserReq = await supabase
        .from("users")
        .select("*")
        .eq("given_name", givenName)
        .eq("last_name", lastName)
    if (findUserReq.error) { throw findUserReq.error }
    if (findUserReq.data.length > 0) {
        console.error(findUserReq.error);
        return json({ success: false, code: 1, user_id: undefined });
    }

    const addNewUser = await supabase
        .from("users")
        .insert([
            {
                given_name: givenName,
                last_name: lastName
            }
        ])
        .select("user_id")
    if (addNewUser.error) {
        console.error(addNewUser.error);
        return json({ success: false, code: 2, user_id: undefined });
    }
    const addNewUserInfo = await supabase
        .from("user_types")
        .insert([
            {
                user_id: addNewUser.data[0].user_id,
                status: "student",
                type: "user"
            }
        ])
    if (addNewUserInfo.error) {
        console.error(addNewUserInfo.error);
        return json({ success: false, code: 2, user_id: undefined });
    }
    return json({ success: true, code: 0, user_id: addNewUser.data[0].user_id });
};