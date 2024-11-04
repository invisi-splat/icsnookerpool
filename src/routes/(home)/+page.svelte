<script lang="ts">
    import Ball from "./ball.svelte"
    import type { PageData } from './$types';
    import { supabase } from "$lib/supabaseClient";
    import { onMount } from "svelte";
    
    export let data: PageData;

    const balls: BallInfo[] = data.ballInfo
    let showTitle: boolean = false

    onMount(async () => {
        const { data, error } = await supabase.auth.getSession();
        if (error) { throw error; }
        if (data.session) {
            document.getElementsByTagName("body")[0].style.background = "var(--blue-baize)";
        }
        showTitle = true
    })
</script>

<svelte:head>
    <title>Home | IC Snooker & Pool</title> 
</svelte:head>

<div class="flex flex-col lg:flex-row items-center lg:mt-10 lg:justify-around lg:items-start mb-24">
    {#each balls as ball}
        {#if showTitle}
            <Ball ballInfo={ball}></Ball>
        {/if}
    {/each}
</div>

    
<style>
:global(body) {
    background: var(--green-baize);
}
</style>