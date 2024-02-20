<script lang="ts">
    import { fade, fly } from "svelte/transition";
    import BoardText from "./boardText.svelte";
  import BoardBall from "./boardBall.svelte";
    
    export let breakInfo: {
        uuid: string;
        name: string;
        break: number;
        submitted: number;
        table: number;
        breakdown: number[];
        alumnus: boolean;
        verified: boolean;
    }[];

    const NEW_THRESHOLD: number = 1000 * 60 * 60 * 24
    let showAll = false
    let showDetailed: Boolean[] = []

    function getDate(sinceEpoch: number): string {
        let date = new Date(sinceEpoch)
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear().toString().substring(2)}`
    }
</script>

<div class="h-dvh font-board bg-black">
    <div class="lg:w-60 lg:h-4/5 h-3/4 overflow-scroll">
        <div class="bg-[url('/images/peg.png')] bg-[size:1%] bg-repeat w-full min-h-[100%] p-3"> <!-- edit the min-h percentage to edit the buffer -->
            <div class="mt-5 flex justify-evenly items-baseline">
                <h1 class="text-2xl text-high-break-yellow">HIGH BREAK BOARD</h1>
                <pre class="font-board text-lg"><span class="text-2xl">J</span>ANUARY  2024</pre>
            </div>
            <div class="flex justify-evenly lg:hidden mt-5">
                <button type="button" class="text-[#9E9E9E] border-2 border-[#9E9E9E] py-1 px-3">
                    <BoardText text="New break?"></BoardText>
                </button>
                <button type="button" class="text-[#879997] border-2 border-[#879997] py-1 px-3" on:click={() => showAll = !showAll}>
                    {#if showAll}
                    <BoardText text="Hide unverified"></BoardText>
                    {:else}
                    <BoardText text="Show unverified"></BoardText>
                    {/if}
                </button>
            </div>
            <div class="my-5 relative">
                <svg class="absolute right-2" xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                    <path d="M8.11042 0.67309C8.20644 0.260708 8.79356 0.260709 8.88958 0.673092L10.0966 5.85693C10.1417 6.05058 10.3222 6.18172 10.5203 6.16476L15.8234 5.71084C16.2453 5.67473 16.4267 6.23311 16.0642 6.45186L11.5071 9.20173C11.3369 9.30446 11.2679 9.51664 11.3453 9.69981L13.4157 14.6031C13.5804 14.9932 13.1054 15.3383 12.7854 15.0611L8.76186 11.5768C8.61155 11.4466 8.38845 11.4466 8.23814 11.5768L4.21463 15.0611C3.89456 15.3383 3.41957 14.9932 3.58428 14.6031L5.65474 9.69981C5.73209 9.51664 5.66315 9.30446 5.4929 9.20173L0.935781 6.45186C0.573254 6.23311 0.754682 5.67473 1.17655 5.71084L6.47968 6.16476C6.67779 6.18172 6.85828 6.05058 6.90337 5.85693L8.11042 0.67309Z" fill="#D9D9D9"/>
                </svg>
                {#each breakInfo as sBreak, index}
                    {#if sBreak.verified || showAll}
                        <button type="button" class="flex justify-between {showDetailed[index - 1] ? 'mt-2' : 'mt-6'} w-full {!sBreak.verified ? 'text-unverified-grey' : Date.now() - sBreak.submitted < NEW_THRESHOLD ? 'text-new-break-blue' : '' }" transition:fade on:click={() => {showDetailed[index] = !showDetailed[index]}}>
                            <div class="flex items-center">
                                {#if sBreak.alumnus}
                                <div class="inline-block w-1 h-1 rounded-full bg-almost-white mx-5"></div>
                                {:else}
                                <div class="inline-block w-1 h-1 mx-5"></div>
                                {/if}
                                <span>
                                    <BoardText text={sBreak.name}></BoardText>
                                </span>
                            </div>
                            <div class="mr-8">
                                <span class="text-lg">
                                    {sBreak.break}
                                </span>
                            </div>
                        </button>
                        {#if showDetailed[index]}
                        <div class="text-[#9E9E9E] flex flex-col items-center mx-5">
                            <div>
                                <BoardText text="Submitted {getDate(sBreak.submitted)} on Table {sBreak.table}, {sBreak.breakdown ? sBreak.breakdown.length : "?"} balls"></BoardText>
                            </div>
                            <div class="flex flex-wrap gap-1.5 mt-2 w-4/5">
                                {#if sBreak.breakdown}
                                    {#each sBreak.breakdown as ballValue}
                                        <BoardBall value={ballValue}></BoardBall>
                                    {/each}
                                {:else}
                                    <BoardBall value={0}></BoardBall>
                                {/if}
                            </div>
                        </div>
                        {/if}
                    {/if}
                {/each}
            </div>
        </div>
    </div>
    <div class="middle-bracket fixed top-3/4 lg:top-[80%] w-screen h-3 mix-blend-darken"></div>
    <div class="bg-[url('/images/peg.png')] bg-[size:1%] bg-repeat w-full h-1/4 lg:w-60 lg:h-4/5 font-board p-3">
        <div class="mt-5 flex justify-evenly items-baseline">
            <h1 class="text-2xl text-high-break-yellow">ANNUAL TOP THREE</h1>
            <pre class="font-board text-lg">2022-2023</pre>
        </div>
    </div>
</div>

<!-- frame -->
<div class="left-bracket  fixed top-0 left-0  w-3 h-screen mix-blend-darken"></div>
<div class="right-bracket fixed top-0 right-0 w-3 h-screen mix-blend-darken"></div>
<div class="upper-bracket fixed top-0         w-screen h-3 mix-blend-darken"></div>
<div class="lower-bracket fixed bottom-0      w-screen h-3 mix-blend-darken"></div>

<style>
    .left-bracket {
        background: linear-gradient(270deg, #101010 0%, #000 100%);
    }
    .right-bracket {
        background: linear-gradient(90deg, #101010 0%, #000 100%);
    }
    .upper-bracket {
        background: linear-gradient(180deg, #000 0%, #101010 100%);
    }
    .lower-bracket {
        background: linear-gradient(180deg, #101010 0%, #000 100%);
    }
    .middle-bracket {
        background: linear-gradient(180deg, #101010 0%, #000 50%, #101010 100%);
    }
</style>