import { supabase } from "$lib/supabaseClient";

// eslint-disable-next-line @typescript-eslint/ban-types
export async function checkLoggedIn(f: Function = () => {}, g: Function = () => {}) {
    const { data, error } = await supabase.auth.getSession();
    if (error) { throw error; }
    if (data.session) {
        document.getElementsByTagName("body")[0].style.background = "var(--blue-baize)";
        f();
    } else {
        g();
    }
}

export function toNiceDate(sinceEpoch: number): string {
    const date = new Date(sinceEpoch)
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear().toString().substring(2)}`
}