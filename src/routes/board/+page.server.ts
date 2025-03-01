import type { PageServerLoad } from './$types';
import { supabase } from "$lib/supabaseClient";

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

export const load: PageServerLoad = async ({ url }) => {
    const currentMonth = url.searchParams.has("month") ? Number(url.searchParams.get("month")) : (new Date()).getMonth();
    const currentYear = url.searchParams.has("year") ? Number(url.searchParams.get("year")) : (new Date()).getFullYear();
    const breakInfo = await supabase
        .from("breaks")
        .select(`
            *,
            player:users!player (*),
            player_info:user_types!player (*),
            opponent:users!opponent (*)
        `)
        .order("break", { ascending: false })
        .gt("submitted", `${currentYear}-${currentMonth < 9 ? '0' : ''}${currentMonth+1}-01`)
        .lt("submitted", `${currentMonth == 11 ? currentYear + 1 : currentYear}-${currentMonth < 8 || currentMonth == 11 ? '0' : ''}${currentMonth == 11 ? '1' : currentMonth+2}-01`);

    const startYear = currentMonth < 8 ? currentYear - 1 : currentYear;
    const nextYear = startYear + 1;

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
        currentMonth: string,
        annualBreakInfo: BreakInfo
        currentYear: string
    } = {
        breakInfo: breakInfo.data,
        currentMonth: `${months[currentMonth]} ${currentYear}`,
        annualBreakInfo: annualBreakInfo.data,
        currentYear: `${startYear}-${nextYear}`,
	}
	return loadedData;
};