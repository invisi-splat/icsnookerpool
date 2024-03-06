<script lang="ts">
    import { goto } from "$app/navigation";
    import { checkLoggedIn } from "$lib/functions/checkLoggedIn";
    import { onMount } from "svelte";
    import type { PageData } from "./$types";
    import { toNiceDate } from "$lib/functions/checkLoggedIn";
    import BoardBall from "../boardBall.svelte";
    import { fade, fly } from "svelte/transition";
    import { supabase } from "$lib/supabaseClient";
    import BreakForm from "../breakForm.svelte";

    export let data: PageData;

    onMount(() => {
        checkLoggedIn(() => {}, () => {
            goto("/board");
        })
    })

    async function handleApprove(sBreak: BreakEntry, index: number) {
        message[index] = "Processing..."
        const submittedTime = new Date(sBreak.submitted);
        const currentYear = submittedTime.getFullYear();
        const currentMonth = submittedTime.getMonth();
        const bestBreaksReq = await supabase
            .from("breaks")
            .select("*")
            .eq("player", sBreak.player.user_id)
            .eq("is_best", true)
            .gt("submitted", `${currentYear}-${currentMonth < 9 ? '0' : ''}${currentMonth+1}-01`)
            .lt("submitted", `${currentYear}-${currentMonth < 8 ? '0' : ''}${currentMonth+2}-01`)
            .order("break", { ascending: false })
            .range(0, 2);
        
        const bestBreaks = bestBreaksReq.data?.concat(sBreak);
        bestBreaks?.sort((a, b) => b.break - a.break);

        if (!bestBreaks || bestBreaks.length <= 3) {
            const { error } = await supabase
                .from("breaks")
                .update({ verified: true, is_best: true })
                .eq("id", sBreak.id)
            if (error) {
                message[index] = error.message;
                throw error;
            }
        } else if (bestBreaks[3] === sBreak) {
            const { error } = await supabase
                .from("breaks")
                .update({ verified: true })
                .eq("id", sBreak.id)
            if (error) {
                message[index] = error.message;
                throw error;
            }
        } else {
            const { error: error1 } = await supabase
                .from("breaks")
                .update({ verified: true, is_best: true })
                .eq("id", sBreak.id)
            const { error: error2 } = await supabase
                .from("breaks")
                .update({ is_best: false })
                .eq("id", bestBreaks[3].id)
            if (error1) { // haha bad code
                message[index] = error1.message;
                throw error1;
            }
            if (error2) {
                message[index] = error2.message;
                throw error2;
            }
        }
        processedBreak[index] = true;
    }

    async function handleReject(sBreak: BreakEntry, index: number) {
        message[index] = "Processing..."
        const { data, error } = await supabase
            .from("breaks")
            .delete()
            .eq("id", sBreak.id)
        if (error) {
            message[index] = error.message;
            throw error;
        }
        processedBreak[index] = true;
    }

    let showDetailedBreak: Boolean[] = [];
    let processedBreak: Boolean[] = [];
    let message: string[] = [];

    let activeBreakIndex: number;
    let activeBreak: [BreakEntry, number] | undefined;
</script>

<div class="lg:hidden h-dvh overflow-y-scroll text-white">
    <a class="flex justify-center items-center return px-3 py-1 text-black w-fit ml-5 mt-5 text-lg active:saturate-50" href="/board">Return</a>
    <h1 class="text-center mt-6 text-4xl font-medium">Pending breaks</h1>
    <p class="text-center mt-2 text-xl font-light">Select pending breaks to review.</p>
    <div class="flex flex-col justify-center items-center gap-y-5 my-10">
        {#each data.unverifiedBreaks as sBreak, index}
        {#if !processedBreak[index]}
            <div class="w-full flex flex-col justify-center items-center">
                <button type="button" on:click={ () => { showDetailedBreak[index] = !showDetailedBreak[index] }} class="w-4/5 bg-pending-break text-black cursor-pointer active:saturate-50 shadow-[3px_3px] z-50">
                    <div class="flex justify-between text-xl p-5 pb-1">
                        <p>{ sBreak.player.given_name } { sBreak.player.last_name }</p>
                        <p class="font-bold">{ sBreak.break }</p>
                    </div>
                    <div class="flex p-5 pt-1 text-xl font-light">
                        <p>{ toNiceDate(Date.parse(sBreak.submitted)) }</p>
                    </div>
                </button>
                {#if showDetailedBreak[index]}
                <div transition:fly={{ y: -100 }} class="w-[75%] p-4 bg-almost-white text-black shadow-[4px_4px]">
                    <p class="font-light text-xl mb-3">{ sBreak.location ? sBreak.location : '(no location)' }</p>
                    <div class="flex flex-wrap justify-center gap-1">
                        {#if sBreak.balls_potted}
                            {#each sBreak.balls_potted as value}
                            <BoardBall value={value}></BoardBall>
                            {/each}
                        {:else}
                        <BoardBall value={0}></BoardBall>
                        {/if}
                    </div>
                    <div class="flex justify-end text-xl mt-3 gap-x-4 font-bold">
                        <button on:click={ () => handleReject(sBreak, index) } type="button" class="text-red-ball active:saturate-50">Reject</button>
                        <button on:click={ () => handleApprove(sBreak, index) } type="button" class="text-green-ball active:saturate-50">Approve</button>
                    </div>
                    {#if message[index] && message[index] !== ""}
                        <div>{ message[index] }</div>
                    {/if}
                </div>
                {/if}
            </div>
        {/if}
        {:else}
        <div class="text-center">
            No breaks to review.
        </div>
        {/each}
    </div>
</div>
<div class="hidden text-white lg:flex lg:pt-10 lg:pb-0 lg:w-screen lg:h-screen lg:overflow-hidden">
    <div class="p-10 w-1/2 border-[15px] shadow-[2px_2px_10px_black] green-baize h-[95%] ml-10 rounded-lg border-black">
        <h1 class="text-4xl">Pending breaks</h1>
        <div class="flex flex-col justify-center items-center gap-y-5 my-10">
            {#each data.unverifiedBreaks as sBreak, index}
            {#if !processedBreak[index]}
                <button on:click={ () => { activeBreakIndex = index; activeBreak = [sBreak, index] } } type="button" class="{ activeBreakIndex === index ? 'active' : 'inactive' } w-full text-black text-left text-xl p-4 grid grid-cols-10">
                    <p class="col-span-4">{sBreak.player.given_name} {sBreak.player.last_name}</p>
                    <p class="col-span-1 font-bold">{sBreak.break}</p>
                    <p class="col-span-3 font-light">{toNiceDate(Date.parse(sBreak.submitted))}</p>
                    {#if message[index]}
                    <p transition:fade class="col-span-2">{ message[index] }</p>
                    {/if}
                </button>
            {/if}
            {:else}
            <div>
                No breaks to review.
            </div>
            {/each}
        </div>
    </div>
    <div class="lg:block lg:w-1/2 hidden lg:text-white lg:ml-10 lg:mr-5">
        <h1 class="text-4xl mb-3">IC Snooker & Pool Society</h1>
        <h1 class="text-3xl">High break board</h1>
        <div class="flex gap-x-10"> 
            <button class="gold-button mt-5 py-2 px-4 text-xl opacity-45 hover:cursor-not-allowed" type="button">Show all breaks</button>
            <a class="green-button mt-5 py-2 px-4 text-xl" href="/board">Finish reviewing</a>
        </div>
        <p class="font-extralight mt-5 text-xl">Use the form to the left to select pending breaks to review.
            {#if !activeBreak}<br />{/if}
        </p>
        {#if activeBreak}
        <p transition:fade class="font-extralight text-xl">Then, use the form below to review details.</p>
        {/if}
        <div class="w-full h-3/5">
            {#if activeBreak}
            <div transition:fade>
                <BreakForm
                editable={false}
                name={`${activeBreak[0].player.given_name} ${activeBreak[0].player.last_name}`}
                breakTotal={activeBreak[0].break}
                ballsPotted={ activeBreak[0].balls_potted ? activeBreak[0].balls_potted : []}
                locationPrefix=""
                location={ activeBreak[0].location ? activeBreak[0].location : "(no location)"}
                on:approve={() => { handleApprove(activeBreak[0], activeBreak[1]); activeBreak = undefined }}
                on:reject={() => { handleReject(activeBreak[0], activeBreak[1]); activeBreak = undefined }}
                ></BreakForm>
            </div>
            {/if}
        </div>
        <div class="text-right">
            <a href="/" class="home-button mt-5 py-2 px-4 text-xl">Home</a>
        </div>
    </div>
</div>

<style>
.return {
    background: linear-gradient(90deg, #EBFDA3 0%, #F5FFCD 105.62%);
}

.green-baize {
    background: var(--green-baize)
}

.gold-button {
    background: linear-gradient(90deg, #B57B09 0%, #BA9243 61.45%);
}

.green-button {
    background: linear-gradient(90deg, #55B509 0%, #77BA43 61.45%);
}

.home-button {
    background: linear-gradient(90deg, #6909B5 0%, #8643BA 61.45%);
}

.inactive {
    background: linear-gradient(90deg, #DCFBCD 0%, rgba(220, 236, 213, 0.00) 100%);
}

button {
    transition: all;
}

.active {
    background: var(--Pending-break, #DCFBCD);
}
</style>