import { json } from '@sveltejs/kit';
import { createClient } from '@supabase/supabase-js'
import { SUPABASE_PROJECT_URL, SUPABASE_SERVICE_ROLE_KEY } from '$env/static/private';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
    const supabase = createClient(SUPABASE_PROJECT_URL, SUPABASE_SERVICE_ROLE_KEY);
	const { name, breakTotal, location, locationPrefix, ballsPotted, userId } = await request.json();
    if (name === undefined) {
        return json({ code: 1, message: "Name is required."});
    }
    if (!breakTotal || breakTotal <= 0 || (ballsPotted.length > 0 && breakTotal !== ballsPotted.reduce((a: number, b: number) => a + b, 0))) {
        return json({ code: 1, message: "...enter a valid break, please."});
    }
    if (name.split(" ").length === 1) {
        return json({ code: 1, message: "Please enter a first name and a last name."});
    }

    const { data, error } = await supabase
        .from("breaks")
        .insert([
            {
                submitted: new Date().toISOString(),
                break: breakTotal,
                verified: false,
                is_best: false, // verify this in the admin panel
                location: location ? (locationPrefix === "table" ? "on Table" : "at") + " " + location : null,
                balls_potted: ballsPotted.length > 0 ? ballsPotted : null, 
                player: userId
            }
        ])
        .select("id, break")
    if (error) {
        console.log(error)
        return json({ code: 1, message: "Something went wrong sending the break. That can't be good."});
    } else {
        return json({ code: 0, message: `Successfully sent break of ${data[0].break} to be verified!` });
    }
};