<script lang="ts">
    import { fly } from "svelte/transition";
    export let ballInfo: BallInfo;
</script>

<a transition:fly={{ duration: 1000, delay: ballInfo.delay, y: 100 }}  class="my-5 transition-opacity ease-in-out flex flex-col items-center cursor-pointer lg:hover:opacity-80 active:opacity-80 lg:active:opacity-60" href={ballInfo.linkTo}>
    <div class="relative flex items-center justify-center w-36 h-36 mb-3 rounded-full {ballInfo.ballColor}">
        <div class="relative flex justify-center items-center text-6xl text-black font-bold font-ball left-1 w-24 h-24 rounded-full bg-almost-white">
            {ballInfo.symbol}
        </div>
    </div>
    <div class="font-light w-48 text-center text-2xl">
        {ballInfo.description}
    </div>
    <div class="absolute w-36 h-36 rounded-full overlay"></div>
</a>

<style>
.overlay {
    background: radial-gradient(94.45% 94.45% at 75% 38.03%, rgba(217, 217, 217, 0.65) 0%, rgba(217, 217, 217, 0.00) 100%);
}
</style>