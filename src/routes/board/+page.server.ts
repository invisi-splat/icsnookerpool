import type { PageServerLoad } from './$types';
import { supabase } from "$lib/supabaseClient";

const startYear = 2023
const nextYear = startYear + 1

export const load: PageServerLoad = async () => {
    const breakInfo = await supabase
        .from("breaks")
        .select(`
            *,
            player:users!player (*),
            player_info:user_types!player (*),
            opponent:users!opponent (*)
        `)
        .order("break", { ascending: false })
    if (breakInfo.error) throw breakInfo.error;
    const annualBreakInfo = await supabase
        .from("breaks")
        .select(`
            *,
            player:users!player (*),
            player_info:user_types!player (*),
            opponent:users!opponent (*)
        `)
        .gt("submitted", `${startYear}-09-01`)
        .lt("submitted", `${nextYear}-09-01`)
        .neq("verified", false)
        .order("break", { ascending: false })
        .range(0, 2)
    if (annualBreakInfo.error) throw annualBreakInfo.error
    const loadedData: {
        breakInfo: BreakInfo,
        annualBreakInfo: BreakInfo
    } = {
        breakInfo: breakInfo.data,
        annualBreakInfo: annualBreakInfo.data
	}
	return loadedData;
};