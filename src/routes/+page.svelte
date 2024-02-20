<script lang="ts">
    import Ball from "./ball.svelte"
    import type { PageData } from './$types';
    import { onMount } from "svelte";
    import { fly } from "svelte/transition";

    export let data: PageData;

    const balls: BallInfo[] = data.ballInfo
    let showTitle: boolean = false

    onMount(() => {
        showTitle = true
    })
</script>

<div class="relative h-dvh overflow-hidden">
    {#if !showTitle}
        <div class="fixed">
            <div transition:fly={{ duration: 1000, y: -50 }} class="w-screen h-48 flex justify-center items-center">
                Loading...
            </div>
            <Ball ballInfo={{
                symbol: "...",
                description: "Please wait...",
                ballColor: "bg-white",
                linkTo: "",
                delay: 0,
            }}></Ball>
        </div>
    {/if}

    <div class="z-10 relative h-screen overflow-scroll">
        <div class="flex flex-col items-center m-6">
            {#if showTitle}
                <h1 transition:fly={{ duration: 1000, y: -50 }} class="relative text-4xl text-center px-6 lg:text-8xl lg:mt-16 lg:mb-5">IC Snooker & Pool Society</h1>
                <p transition:fly={{ duration: 1000, y: 50 }} class="mt-3 text-2xl lg:text-5xl font-serif italic font-light">Resurrexit a flamis</p>
            {/if}
        </div>

        <div class="flex flex-col lg:flex-row items-center lg:mt-10 lg:justify-around mb-24">
            {#each balls as ball}
                {#if showTitle}
                    <Ball ballInfo={ball}></Ball>
                {/if}
            {/each}
        </div>
    </div>

    {#if showTitle}
        <div class="z-0 hidden lg:block lg:absolute lg:bottom-0 lg:w-full overflow-hidden">
            <div class="lg:flex lg:flex-col lg:items-center lg:w-full">
                <svg transition:fly={{ duration: 1000, x: 50 }} class="lg:w-5/6 lg:absolute lg:bottom-10" width="1238" height="136" viewBox="0 0 1238 136" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect y="120.622" width="1217" height="14.8101" transform="rotate(-5.57332 0 120.622)" fill="#C8BF9E"/>
                    <rect x="1211.25" y="2.42798" width="17" height="14.8101" transform="rotate(-5.57332 1211.25 2.42798)" fill="#C8BD74"/>
                    <rect x="1228.17" y="0.776978" width="8" height="14.8101" transform="rotate(-5.57332 1228.17 0.776978)" fill="#0097B8"/>
                    <path d="M768.074 53.1134L117.885 123.999L116.447 109.259L768.074 53.1134Z" fill="black"/>
                    <rect y="120.622" width="117" height="14.8101" transform="rotate(-5.57332 0 120.622)" fill="black"/>
                </svg>
                <svg transition:fly={{ duration: 1000, x: -50 }} class="lg:w-5/6 lg:relative lg:bottom-10" width="1238" height="136" viewBox="0 0 1238 136" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="1236.13" y="135.363" width="1217" height="14.8101" transform="rotate(-174.427 1236.13 135.363)" fill="#C8BF9E"/>
                    <rect x="24.882" y="17.1682" width="17" height="14.8101" transform="rotate(-174.427 24.882 17.1682)" fill="#C8BD74"/>
                    <rect x="7.96228" y="15.5171" width="8" height="14.8101" transform="rotate(-174.427 7.96228 15.5171)" fill="#0097B8"/>
                    <path d="M469.493 53.1133L1121.12 109.259L1119.68 124L469.493 53.1133Z" fill="black"/>
                    <rect x="1236.13" y="135.363" width="117" height="14.8101" transform="rotate(-174.427 1236.13 135.363)" fill="black"/>
                </svg>
            </div>
        </div>
        <div class="z-0 absolute top-48 w-full lg:hidden overflow-hidden">
            <div class="flex justify-between w-full px-6">
                <svg transition:fly={{ duration: 1000, x: -100 }} width="81" height="778" viewBox="0 0 81 778" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="65.2542" y="846.318" width="830.63" height="14.8101" transform="rotate(-94.4149 65.2542 846.318)" fill="#C8BF9E"/>
                    <rect x="1.31348" y="18.1524" width="11.6029" height="14.8101" transform="rotate(-94.4149 1.31348 18.1524)" fill="#C8BD74"/>
                    <rect x="0.420288" y="6.58395" width="5.46018" height="14.8101" transform="rotate(-94.4149 0.420288 6.58395)" fill="#0097B8"/>
                    <path d="M32.1293 321.084L73.8733 765.56L59.1071 766.7L32.1293 321.084Z" fill="black"/>
                    <rect x="65.2542" y="846.318" width="79.8552" height="14.8101" transform="rotate(-94.4149 65.2542 846.318)" fill="black"/>
                </svg>
                <svg transition:fly={{ duration: 1000, x: 100 }} width="87" height="779" viewBox="0 0 87 779" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="67.8899" y="17.0125" width="11.6029" height="14.8101" transform="rotate(-85.59 67.8899 17.0125)" fill="#C8BD74"/>
                    <rect x="68.7822" y="5.444" width="5.46018" height="14.8101" transform="rotate(-85.59 68.7822 5.444)" fill="#0097B8"/>
                    <path d="M51.8666 321.086L24.9269 766.704L10.1606 765.565L51.8666 321.086Z" fill="black"/>
                    <rect x="4.02026" y="845.183" width="79.8552" height="14.8101" transform="rotate(-85.59 4.02026 845.183)" fill="black"/>
                    <rect x="4.02026" y="845.183" width="830.63" height="14.8101" transform="rotate(-85.59 4.02026 845.183)" fill="#C8BF9E"/>
                </svg>
            </div>
        </div>
    {/if}
</div>

<style>
:global(body) {
    background: var(--green-baize);
    color: white;
    overflow-y: hidden !important;
}
</style>