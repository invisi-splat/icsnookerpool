<script lang="ts">
    import BoardBall from "./boardBall.svelte";
    import BoardText from "./boardText.svelte";
    import { fade } from "svelte/transition";

    export let showAll: Boolean;
    export let breakInfo: {
        uuid: string;
        name: string;
        break: number;
        submitted: number;
        table: number;
        breakdown?: number[];
        alumnus: boolean;
        verified: boolean;
    }[];

    const NEW_THRESHOLD: number = 1000 * 60 * 60 * 24
    let showDetailedBreak: Boolean[] = []

    function getDate(sinceEpoch: number): string {
        let date = new Date(sinceEpoch)
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear().toString().substring(2)}`
    }
</script>

{#each breakInfo as sBreak, index}
    {#if sBreak.verified || showAll}
        <button type="button" class="flex justify-between {showDetailedBreak[index - 1] ? 'mt-2' : 'mt-6'} w-full {!sBreak.verified ? 'text-unverified-grey' : Date.now() - sBreak.submitted < NEW_THRESHOLD ? 'text-new-break-blue' : '' }" transition:fade on:click={() => {showDetailedBreak[index] = !showDetailedBreak[index]}}>
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
        {#if showDetailedBreak[index]}
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