<script lang="ts">
    import BoardText from "./boardText.svelte";
    export let breakInfo: {
        uuid: string;
        name: string;
        break: number;
        submitted: number;
        table: number;
        breakdown: number[];
        alumnus: boolean;
    }[];
</script>

<div class="h-screen font-board">
    <div class="lg:w-60 lg:h-4/5 h-3/4 overflow-scroll">
        <div class="bg-[url('/images/peg.png')] bg-[size:1%] bg-repeat w-full min-h-[125%] p-3"> <!-- 125% to give a little bit of buffer -->
            <div class="mt-5 flex justify-evenly items-baseline">
                <h1 class="text-2xl text-high-break-yellow">HIGH BREAK BOARD</h1>
                <pre class="font-board text-lg"><span class="text-2xl">J</span>ANUARY  2024</pre>
            </div>
            <div class="my-5">
                {#each breakInfo as sBreak}
                    <div class="flex justify-between my-5">
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
                        <div class="mr-5">
                            <span class="text-lg">
                                {sBreak.break}
                            </span>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </div>
    <div class="middle-bracket fixed top-3/4 w-screen h-3 mix-blend-darken"></div>
    <div class="bg-[url('/images/peg.png')] bg-[size:1%] bg-repeat w-full h-1/4 lg:w-60 lg:h-4/5 font-board p-3">
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