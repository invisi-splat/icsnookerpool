<script lang="ts">
    import BoardBall from "./boardBall.svelte";
    import BoardText from "./boardText.svelte";
    import { fade } from "svelte/transition";
    import { toNiceDate } from "$lib/functions/checkLoggedIn";

    interface Props {
        showAll: Boolean;
        breakInfo: BreakInfo;
    }

    let { showAll, breakInfo }: Props = $props();

    const HOURS: number = 18
    const NEW_THRESHOLD: number = 1000 * 60 * 60 * HOURS
    let showDetailedBreak: Boolean[] = $state([]) 
</script>

{#each breakInfo as sBreak, index}
    {#if (sBreak.verified && sBreak.is_best) || showAll}
        <button type="button"
                class="flex justify-between {showDetailedBreak[index - 1] ? 'mt-2' : 'mt-6'} w-full {!sBreak.verified ? 'text-unverified-grey' : Date.now() - Date.parse(sBreak.submitted) < NEW_THRESHOLD ? 'text-new-break-blue' : !sBreak.is_best ? 'text-not-best-grey' : '' }"
                transition:fade onclick={() => {showDetailedBreak[index] = !showDetailedBreak[index]}}>
            <div class="flex items-center">
                {#if sBreak.player_info.status === "alumnus"}
                <div class="inline-block w-1 h-1 rounded-full bg-almost-white mx-5"></div>
                {:else}
                <div class="inline-block w-1 h-1 mx-5"></div>
                {/if}
                <span>
                    <BoardText text={sBreak.player.given_name + " " + sBreak.player.last_name}></BoardText>
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
                <BoardText text="Submitted {toNiceDate(Date.parse(sBreak.submitted))}{sBreak.location ? ' ' + sBreak.location : ''}, {sBreak.balls_potted ? sBreak.balls_potted.length : "?"} balls"></BoardText>
            </div>
            <div class="flex flex-wrap gap-1.5 mt-2 w-4/5">
                {#if sBreak.balls_potted}
                    {#each sBreak.balls_potted as ballValue}
                        <BoardBall value={ballValue}></BoardBall>
                    {/each}
                {:else}
                    <BoardBall value={0}></BoardBall>
                {/if}
            </div>
            <a href="/board/stats/{sBreak.player.user_id}" class="text-[#91a8ae] border-2 border-[#91a8ae] py-1 px-3">
                <BoardText text="View {sBreak.player.given_name}'s stats"></BoardText>
            </a>
        </div>
        {/if}
    {/if}
{:else}
<div><BoardText text="No breaks."></BoardText></div>
{/each}