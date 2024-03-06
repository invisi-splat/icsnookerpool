import type { PageServerLoad } from './$types';
import { supabase } from "$lib/supabaseClient";

export const load: PageServerLoad = async () => {
    const { data, error } = await supabase
        .from("breaks")
        .select(`
            *,
            player:users!player (*),
            player_info:user_types!player (*),
            opponent:users!opponent (*)
        `)
        .eq("verified", false)
        .order("submitted", { ascending: true });

    if (error) { throw error; }
    const loadedData: {
        unverifiedBreaks: BreakInfo
    } = {
        unverifiedBreaks: data
    }
    return loadedData
}