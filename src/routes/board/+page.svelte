<script lang="ts">
    import Board from "./board.svelte";
    import BreakForm from "./breakForm.svelte";
    import { showAll } from "$lib/stores";
    import type { PageData } from './$types';
    import { supabase } from "$lib/supabaseClient";
    import { onMount } from "svelte";
    import { checkLoggedIn } from "$lib/functions/checkLoggedIn";
	
	export let data: PageData;
    let showAllValue: boolean;
    let loggedIn = false;
    
    showAll.subscribe(v => showAllValue = v)
    onMount(async () => {
        checkLoggedIn(() => {
            loggedIn = true;
        })
    })
</script>

<svelte:head>
    <title>ICS&P High break board</title> 
</svelte:head>

<div class="lg:flex lg:pt-10 lg:pb-0 lg:w-screen lg:h-screen lg:overflow-hidden">
    <div class="lg:w-1/2 lg:h-[95%] lg:relative lg:ml-10">
        <Board loggedIn={ loggedIn } breakInfo={data.breakInfo} currentMonth={data.currentMonth} annualBreakInfo={data.annualBreakInfo} currentYear={data.currentYear} ></Board>
    </div>
    <div class="lg:block lg:w-1/2 hidden lg:text-white lg:ml-10 lg:mr-5">
        <h1 class="text-4xl mb-3">IC Snooker & Pool Society</h1>
        <h1 class="text-3xl">High break board</h1>
        <div class="flex ">
            <button class="gold-button mt-5 py-2 px-4 text-xl" type="button" on:click={() => {showAll.update(x => !x)}}>
                {#if showAllValue}
                    Hide all breaks
                {:else}
                    Show all breaks
                {/if}
            </button>
        </div>
        <p class="font-extralight mt-5 text-xl">Use the form below to submit high breaks.<br />Breaks will automatically be calculated if you input potted balls.</p>
        <div class="w-full h-2/3">
            <BreakForm></BreakForm>
        </div>
    </div>
</div>

<style>
    :global(body) {
        background: var(--green-baize);
        color: white;
        overscroll-behavior: none;
    }
    
    .gold-button {
        background: linear-gradient(90deg, #B57B09 0%, #BA9243 61.45%);
    }
</style>