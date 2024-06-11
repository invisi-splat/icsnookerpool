<script lang="ts">
    import { browser } from "$app/environment";
    import Peer from "peerjs";

    let something = true;

    let p2pid = ""; 
    let showConnectionPane: boolean; 
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
    }

    let scoreboardInfo = structuredClone(emptyScoreboard);

    showConnectionPane = true;

    if (p2pid === "") {
        peer = new Peer(Math.random().toString(36).slice(2, 10), { debug: 3 });
    } else {
        peer = new Peer(p2pid, { debug: 3 });
    }

    peer.on("open", id => {
        p2pid = id;
        localStorage["p2pid"] = p2pid;
    })

    peer.on("connection", conn => {
        showConnectionPane = false;
        conn.on("data", data => {
            scoreboardInfo = data; // yes it fucking is
        })
    })

    peer.on("disconnected", conn => {
        showConnectionPane = true;
    })
</script>

<svelte:window on:keydown|preventDefault={(e) => {
    if (e.key === "m") {
        showConnectionPane = !showConnectionPane;
    }
}}></svelte:window>

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
    <div class="w-full absolute text-black -z-20 h-12 { something ? 'top-2' : 'top-12' } flex justify-center pl-20 pr-20 transition-all duration-1000">
        <div class="hidden h-10 -flex w-2/5 bg-gray-300 bg-opacity-50 items-center">
            <span class="ml-4">41 Ahead</span>
            <span class="ml-6">35 Remaining</span>
        </div>
        <div class="flex h-10 min-w-[25%] bg-gray-300 bg-opacity-50 items-center justify-center">
            0:21 Average shot time 1:42
        </div>
    </div>
</div>
<div class="{ showConnectionPane ? 'flex' : 'hidden' } justify-center items-center backdrop-blur-md w-full h-full top-0 left-0 absolute z-20 bg-white bg-opacity-80">
    <div class="w-[80%] max-h-[80%] bg-gray-200 bg-opacity-50 p-4 text-xl">
        No connection has been established!
        <br>
        Head to the <a href="/overlay/control" class="underline text-yellow-500">remote control</a> page and enter the following code in settings to connect the remote:
        <div class="w-full flex justify-center my-10">
            <span class="text-3xl font-mono">{ p2pid }</span>
        </div>
        (Press <span class="font-mono">m</span> to toggle this menu.)
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