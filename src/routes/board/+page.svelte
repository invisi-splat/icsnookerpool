<script lang="ts">
    import Board from "./board.svelte";
    import type { PageData } from './$types';
	
	export let data: PageData;
</script>

<svelte:head>
    <title>ICS&P High break board</title> 
</svelte:head>

<div class="lg:flex lg:pt-10 lg:pb-0 lg:w-screen lg:h-screen">
    <div class="lg:w-1/2 lg:h-5/6 lg:relative lg:ml-10">
        <Board breakInfo={data.breakInfo} annualBreakInfo={data.annualBreakInfo}></Board>
    </div>
</div>

<style>
    :global(body) {
        background: var(--green-baize);
        color: white;
        overscroll-behavior: none;
    }
</style>