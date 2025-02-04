<script lang="ts">
    import BoardText from "./boardText.svelte";
    import BreakForm from "./breakForm.svelte";
    import BreakList from "./breakList.svelte";
    import { showAll } from "$lib/stores";
    import BoardDate from "./boardDate.svelte";
    
    interface Props {
        loggedIn: boolean;
        breakInfo: BreakInfo;
        currentMonth: string;
        annualBreakInfo: BreakInfo;
        currentYear: string;
    }

    let {
        loggedIn,
        breakInfo,
        currentMonth,
        annualBreakInfo,
        currentYear
    }: Props = $props();

    let showAllValue: boolean = $state(false);
    let selectMonth: false;

    showAll.subscribe(v => showAllValue = v)
</script>

<div class="h-dvh lg:h-full touch-manipulation font-board bg-black lg:bg-inherit">
    <div class="h-[70%] lg:w-full overflow-scroll no-scrollbar">
        <div class="bg-[url('/images/peg.png')] bg-[size:1%] bg-repeat w-full min-h-[100%] p-3"> <!-- edit the min-h percentage to edit the buffer -->
            <div class="mt-5 flex justify-evenly items-baseline">
                <h1 class="text-xl xs:text-2xl text-high-break-yellow">HIGH BREAK BOARD</h1>
                <div class="relative flex justify-start">
                    <BoardDate month={ currentMonth.split(" ")[0] } year={ currentMonth.split(" ")[1] }></BoardDate>
                </div>
            </div>
            <div class="flex justify-evenly gap-5 flex-wrap lg:hidden mt-5">
                <a href="#form" class="text-[#9E9E9E] border-2 border-[#9E9E9E] py-1 px-3">
                    <BoardText text="New break?"></BoardText>
                </a>
                <button type="button" class="text-[#879997] border-2 border-[#879997] py-1 px-3" onclick={() => { showAll.update(x => !x) }}>
                    {#if showAllValue}
                    <BoardText text="Hide all"></BoardText>
                    {:else}
                    <BoardText text="Show all"></BoardText>
                    {/if}
                </button>
                {#if loggedIn}
                    <a href="/board/review" class="text-[#889987] border-[#889987] border-2 py-1 px-3">
                        <BoardText text="Review breaks"></BoardText>
                    </a>
                {/if}
            </div>
            <div class="my-5 relative">
                <svg class="absolute right-2" xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                    <path d="M8.11042 0.67309C8.20644 0.260708 8.79356 0.260709 8.88958 0.673092L10.0966 5.85693C10.1417 6.05058 10.3222 6.18172 10.5203 6.16476L15.8234 5.71084C16.2453 5.67473 16.4267 6.23311 16.0642 6.45186L11.5071 9.20173C11.3369 9.30446 11.2679 9.51664 11.3453 9.69981L13.4157 14.6031C13.5804 14.9932 13.1054 15.3383 12.7854 15.0611L8.76186 11.5768C8.61155 11.4466 8.38845 11.4466 8.23814 11.5768L4.21463 15.0611C3.89456 15.3383 3.41957 14.9932 3.58428 14.6031L5.65474 9.69981C5.73209 9.51664 5.66315 9.30446 5.4929 9.20173L0.935781 6.45186C0.573254 6.23311 0.754682 5.67473 1.17655 5.71084L6.47968 6.16476C6.67779 6.18172 6.85828 6.05058 6.90337 5.85693L8.11042 0.67309Z" fill="#D9D9D9"/>
                </svg>
                <BreakList breakInfo={breakInfo} showAll={showAllValue}></BreakList>
            </div>
            <div class="pl-16 mt-16 lg:hidden"><BoardText text="Submit new break"></BoardText></div>
            <div class="flex justify-center lg:hidden" id="form"><BreakForm></BreakForm></div>
            <div class="flex justify-end lg:hidden">
                <a href="/" class="text-[#879997] border-2 border-[#879997] py-1 px-3 mr-10"><BoardText text="Home"></BoardText></a>
            </div>
        </div>
    </div>
    <div class="middle-bracket lg:absolute fixed top-[70%] w-screen lg:w-full h-3 mix-blend-darken z-50"></div>
    <div class="lg:w-full h-[30%] overflow-scroll no-scrollbar">
        <div class="bg-[url('/images/peg.png')] bg-[size:1%] bg-repeat min-h-[100%] lg:min-h-[100%] w-full p-3">
            <div class="mt-5 flex justify-evenly items-baseline">
                <h1 class="text-xl xs:text-2xl text-high-break-yellow">ANNUAL TOP THREE</h1>
                <div>
                    <BoardText text={ currentYear }></BoardText>
                </div>
            </div>
            <div class="my-5 relative">
                <svg class="absolute right-2" xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                    <path d="M8.11042 0.67309C8.20644 0.260708 8.79356 0.260709 8.88958 0.673092L10.0966 5.85693C10.1417 6.05058 10.3222 6.18172 10.5203 6.16476L15.8234 5.71084C16.2453 5.67473 16.4267 6.23311 16.0642 6.45186L11.5071 9.20173C11.3369 9.30446 11.2679 9.51664 11.3453 9.69981L13.4157 14.6031C13.5804 14.9932 13.1054 15.3383 12.7854 15.0611L8.76186 11.5768C8.61155 11.4466 8.38845 11.4466 8.23814 11.5768L4.21463 15.0611C3.89456 15.3383 3.41957 14.9932 3.58428 14.6031L5.65474 9.69981C5.73209 9.51664 5.66315 9.30446 5.4929 9.20173L0.935781 6.45186C0.573254 6.23311 0.754682 5.67473 1.17655 5.71084L6.47968 6.16476C6.67779 6.18172 6.85828 6.05058 6.90337 5.85693L8.11042 0.67309Z" fill="#D9D9D9"/>
                </svg>
                <BreakList breakInfo={annualBreakInfo} showAll={showAllValue}></BreakList>
            </div>
        </div>
    </div>
</div>

<!-- frame -->
<div class="left-bracket  fixed lg:absolute top-0 left-0  w-3 h-[calc(100dvh-0.375rem)] lg:h-full mix-blend-darken"></div>
<div class="right-bracket fixed lg:absolute top-0 right-0 w-3 h-[calc(100dvh-0.375rem)] lg:h-full mix-blend-darken"></div>
<div class="upper-bracket fixed lg:absolute top-0         lg:w-full w-[calc(100dvw-0.375rem)] h-3 mix-blend-darken"></div>
<div class="lower-bracket fixed lg:absolute bottom-0      lg:w-full w-[calc(100dvw-0.375rem)] h-3 mix-blend-darken"></div>

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

    .no-scrollbar::-webkit-scrollbar {
        display: none;
    }

    :global(html) {
        scroll-behavior: smooth;
    }
</style>