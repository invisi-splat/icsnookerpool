<script lang="ts">
    import Board from "./board.svelte";
    import BreakForm from "./breakForm.svelte";
    import { showAll } from "$lib/stores";
    import type { PageData } from './$types';
    import { onMount } from "svelte";
    import { checkLoggedIn } from "$lib/functions/checkLoggedIn";
	
    interface Props {
        data: PageData;
    }

    let { data }: Props = $props();
    let showAllValue: boolean = $state(false);
    let loggedIn = $state(false);
    
    showAll.subscribe(v => showAllValue = v)
    onMount(async () => {
        checkLoggedIn(() => {
            loggedIn = true;
        })
    })
</script>

<svelte:head>
    <title>High break board | IC Snooker & Pool</title> 
</svelte:head>

<div class="lg:flex lg:pt-10 lg:pb-0 lg:w-screen lg:h-screen lg:overflow-hidden">
    <div class="lg:w-1/2 lg:h-[95%] lg:relative lg:ml-10">
        <Board loggedIn={loggedIn} breakInfo={data.breakInfo} currentMonth={data.currentMonth} annualBreakInfo={data.annualBreakInfo} currentYear={data.currentYear} ></Board>
    </div>
    <div class="lg:block lg:w-1/2 hidden lg:text-white lg:ml-10 lg:mr-5">
        <h1 class="text-4xl mb-3">IC Snooker & Pool Society</h1>
        <h1 class="text-3xl">High break board</h1>
        <div class="flex gap-x-10"> <!-- TODO: Fix the buttons moving when the text changes -->
            <button class="gold-button mt-5 py-2 px-4 text-xl" type="button" onclick={() => {showAll.update(x => !x)}}>
                {#if showAllValue}
                    Hide all breaks
                {:else}
                    Show all breaks
                {/if}
            </button>
            <a class="blue-button mt-5 py-2 px-4 text-xl" href="/board/stats">All-time stats</a>
            {#if loggedIn}
                <a class="green-button mt-5 py-2 px-4 text-xl" href="/board/review">Review breaks</a>
            {/if}
        </div>
        <p class="font-extralight mt-5 text-xl">Use the form below to submit high breaks.<br />Breaks will automatically be calculated if you input potted balls.</p>
        <div class="w-full h-3/5">
            <BreakForm></BreakForm>
        </div>
        <div class="text-right">
            <a href="/" class="home-button mt-5 py-2 px-4 text-xl">Home</a>
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

    .green-button {
        background: linear-gradient(90deg, #55B509 0%, #77BA43 61.45%);
    }

    .blue-button {
        background: linear-gradient(90deg, rgb(61, 176, 234) 0%, #44cabf 61.45%);
    }

    .home-button {
        background: linear-gradient(90deg, #6909B5 0%, #8643BA 61.45%);
    }
</style>