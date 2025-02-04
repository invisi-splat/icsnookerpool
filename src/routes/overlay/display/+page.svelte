<script lang="ts">
    import { run, preventDefault } from 'svelte/legacy';

    import { browser } from "$app/environment";
    import ControlBall from "./controlBall.svelte";
    import Peer from "peerjs";

    const PIN_MAX_LEN = 10;

    let p2pid = $state(""); 
    let showConnectionPane = $state(true); 
    let connectedRemotes = $state(0);
    let peer: Peer;
    if (browser) {
        p2pid = localStorage["p2pid"] ?? "";
    }

    const emptyPlayer = {
        name: "",
        framesWon: 0,
        currentScore: 0,
        currentBreak: [],
        averageShotTime: 0,
        foulsCommitted: 0,
        successfulSafeties: 0,
        failedSafeties: 0,
        successfulLongpots: 0,
        failedLongpots: 0
    }

    const emptyScoreboard = {
        player: Array(2).fill(null).map(() => {return structuredClone(emptyPlayer)}),
        bestOf: 1,
        activeTurn: 0,
        onRed: false,
        stat: {
            visible: false,
            data: {
                name: "",
                side: 0,
                break: [],
                total: 0,
                times: []
            }
        }
    }

    const handleKeypress = (e: KeyboardEvent) => {
        if (e.key === "m") {
            showConnectionPane = !showConnectionPane;
        } else if (e.key === "p" && showConnectionPane) {
            peer.destroy();
            peer = new Peer(Math.random().toString(36).slice(2, PIN_MAX_LEN), { debug: 3 });
            bindPeer();
        }
    }

    let scoreboardInfo = $state(structuredClone(emptyScoreboard));

    if (p2pid === "") {
        peer = new Peer(Math.random().toString(36).slice(2, PIN_MAX_LEN), { debug: 3 });
    } else {
        peer = new Peer(p2pid, { debug: 3 });
    }

    function bindPeer() {
        peer.on("open", id => {
            p2pid = id;
            localStorage["p2pid"] = p2pid;
            
            peer.on("connection", conn => {
                connectedRemotes++;
                showConnectionPane = false;
                conn.on("data", data => {
                    //@ts-ignore
                    scoreboardInfo = data;
                })

                conn.on("close", () => {
                    connectedRemotes--;
                    showConnectionPane = true;
                })
            })
        })
    }

    run(() => {
        console.log(scoreboardInfo);
    });

    bindPeer();
</script>

<svelte:window onkeydown={preventDefault(handleKeypress)}></svelte:window>

<div class="text-white text-2xl font-light h-14 flex items-center justify-center relative">
    <div class="w-full flex items-center h-full z-5">
        <div class="flex-grow flex justify-between items-center h-10 pl-20 pr-6 basis-0">
            <div class="{ scoreboardInfo.activeTurn === 0 ? 'text-yellow-200' : ''} ">{ scoreboardInfo.player[0].name }</div>
            <div>{ scoreboardInfo.player[0].currentScore }</div>
        </div>
        <div class="h-full border-4 flex items-center justify-evenly border-black w-[10%] blue-baize">
            <span class="">{ scoreboardInfo.player[0].framesWon }</span>
            <span>({ scoreboardInfo.bestOf })</span>
            <span>{ scoreboardInfo.player[1].framesWon }</span>
        </div>
        <div class="flex-grow flex justify-between items-center text-right h-10 pr-20 pl-6 basis-0">
            <div>{ scoreboardInfo.player[1].currentScore }</div>
            <div class={ scoreboardInfo.activeTurn === 1 ? 'text-yellow-200' : ''}>{ scoreboardInfo.player[1].name }</div>
        </div>
    </div>
    <!-- just the background -->
    <div class="green-baize w-full absolute -z-10 h-10"></div>
    <div class="w-full absolute text-black -z-20 h-12 { scoreboardInfo.stat.visible ? 'top-12' : 'top-2' } flex { scoreboardInfo.stat.data.side === 0 ? 'justify-start' : scoreboardInfo.stat.data.side === 1 ? 'justify-center' : 'justify-end'  } pl-20 pr-20 transition-all duration-1000">
        <div class="{ scoreboardInfo.stat.data.name === "p1bar" || scoreboardInfo.stat.data.name === "p2bar" ? 'flex' : 'hidden' } h-10 -flex w-2/5 bg-gray-300 bg-opacity-50 items-center">
            {#if scoreboardInfo.stat.data.ab !== undefined}
                <span class="ml-4"><span class="font-bold">{ scoreboardInfo.stat.data.diff }</span> { scoreboardInfo.stat.data.ab === "a" ? 'Ahead' : 'Behind'}</span>
                <span class="ml-6"><span class="font-bold">{ scoreboardInfo.stat.data.remaining}</span> Remaining</span>
            {/if}
        </div>
        <div class="{ scoreboardInfo.stat.data.name === "ast" ? 'flex' : 'hidden' } h-10 min-w-[25%] bg-gray-300 bg-opacity-50 items-center justify-center gap-x-3 px-4">
            {#if scoreboardInfo.stat.data.times !== undefined}
                <span class="font-bold">{ scoreboardInfo.stat.data.times[0]}</span>
                <span>Average shot time</span>
                <span class="font-bold">{ scoreboardInfo.stat.data.times[1]}</span>
            {/if}
        </div>
        <div class="{ scoreboardInfo.stat.data.name === "lps" ? 'flex' : 'hidden' } h-10 min-w-[25%] bg-gray-300 bg-opacity-50 items-center justify-center gap-x-3 px-4">
            {#if scoreboardInfo.stat.data.rate !== undefined}
                <span class="font-bold">{ scoreboardInfo.stat.data.rate[0]}%</span>
                <span>Long pot success</span>
                <span class="font-bold">{ scoreboardInfo.stat.data.rate[1]}%</span>
            {/if}
        </div>
        <div class="{ scoreboardInfo.stat.data.name === "ss" ? 'flex' : 'hidden' } h-10 min-w-[25%] bg-gray-300 bg-opacity-50 items-center justify-center gap-x-3 px-4">
            {#if scoreboardInfo.stat.data.rate !== undefined}
                <span class="font-bold">{ scoreboardInfo.stat.data.rate[0]}%</span>
                <span>Safety success</span>
                <span class="font-bold">{ scoreboardInfo.stat.data.rate[1]}%</span>
            {/if}
        </div> 
        <div class="{ scoreboardInfo.stat.data.name === "ses" ? 'flex' : 'hidden' } h-10 min-w-[25%] bg-gray-300 bg-opacity-50 items-center justify-center gap-x-3 px-4">
            {#if scoreboardInfo.stat.data.rate !== undefined}
                <span class="font-bold">{ scoreboardInfo.stat.data.rate[0]}%</span>
                <span>Snooker escape success</span>
                <span class="font-bold">{ scoreboardInfo.stat.data.rate[1]}%</span>
            {/if}
        </div>
        <div class="{ scoreboardInfo.stat.data.name === "fc" ? 'flex' : 'hidden' } h-10 min-w-[25%] bg-gray-300 bg-opacity-50 items-center justify-center gap-x-3 px-4">
            {#if scoreboardInfo.stat.data.fouls !== undefined}
                <span class="font-bold">{ scoreboardInfo.stat.data.fouls[0]}</span>
                <span>Points given in fouls</span>
                <span class="font-bold">{ scoreboardInfo.stat.data.fouls[1]}</span>
            {/if}
        </div>
        <div class="{ scoreboardInfo.stat.data.name === "cb" ? 'flex' : 'hidden' } h-10 w-2/5 bg-gray-300 bg-opacity-50 items-center justify-between">
            <span class="ml-4">Break <span class="font-bold">{ scoreboardInfo.stat.data.total }</span></span>
            <span class="mr-4 flex justify-normal gap-x-1">
                {#if scoreboardInfo.stat.data.break !== undefined}
                    {#each scoreboardInfo.stat.data.break as value, index}
                        {#if value > 0}
                            <ControlBall value={ index } count={ value }></ControlBall>
                        {/if}
                    {/each}
                {/if}
            </span>
        </div>
    </div>
</div>
<div class="{ showConnectionPane ? 'flex' : 'hidden' } justify-center items-center backdrop-blur-md w-full h-full top-0 left-0 absolute z-20 bg-white bg-opacity-80">
    <div class="w-[80%] max-h-[80%] bg-gray-200 bg-opacity-50 p-4 text-xl">
        { connectedRemotes === 0 ? 'No connection has been established!' : `There ${connectedRemotes === 1 ? 'is 1 remote' : `are ${connectedRemotes} remotes`} connected.`}
        <br>
        Head to the <a href="/overlay/control" class="underline text-yellow-500">remote control</a> page and enter the following pin in settings to connect the remote:
        <div class="w-full flex justify-center my-10">
            <span class="text-3xl font-mono">{ p2pid }</span>
        </div>
        (Press <span class="font-mono">m</span> to toggle this menu or press <span class="font-mono">p</span> to generate a new connection pin.)
    </div>
</div>

<style>
.green-baize {
    background: var(--green-baize);
}

.blue-baize {
    background: var(--blue-baize);
}
</style>