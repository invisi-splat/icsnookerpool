<script lang="ts">
    import { onMount } from "svelte";
    import ControlBall from "./controlBall.svelte";
    import Peer from "peerjs";

    let showOverlaySettings = true;
    let p2pid = localStorage["p2pid"] ?? "";
    let conn: any = null;
    let errorMessage = "";
    let statusMessage = "";
    let successMessage = "";
    let peer = new Peer({ debug: 3 });

    const scoreboardHistory = [];
    const statsHistory = [];

    const emptyPlayer = {
        name: "",
        framesWon: 0,
        currentScore: 0,
        currentBreak: [],
        shotTimes: [],
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
            side: 0,
            text: ""
        }
    }

    const emptyStats = {
        player: [],
        break: []
    }

    let scoreboardInfoStr = localStorage["scoreboardInfo"] ?? JSON.stringify(structuredClone(emptyScoreboard));
    let scoreboardInfo = JSON.parse(scoreboardInfoStr);

    let calculatedStatsStr = localStorage["calculatedStats"] ?? JSON.stringify(structuredClone(emptyStats));
    let calculatedStats = JSON.parse(calculatedStatsStr);

    let lastEndOfBreak = Date.now();

    console.log(scoreboardInfo);

    const connectToPeer = () => {
        errorMessage = "";
        statusMessage = "Connecting...";
        successMessage = "";
        conn = peer.connect(p2pid);

        conn.on("open", () => {
            errorMessage = "";
            statusMessage = "";
            successMessage = "Connected successfully!";

            conn.send(scoreboardInfo);
        });

        localStorage["p2pid"] = p2pid;

        setTimeout(() => {
            statusMessage = "";
            if (!conn.open) {
                conn.close();
                errorMessage = "Connection timed out.";
            }
        }, 10000);
    }

    const resetAll = () => {
        localStorage.removeItem("scoreboardInfo");
        scoreboardInfo = structuredClone(emptyScoreboard);
    }

    const saveMatchDetails = () => {
        showOverlaySettings = !showOverlaySettings;
    }

    const handleGame = () => {
        if (scoreboardInfo.player[0].currentScore > scoreboardInfo.player[1].currentScore) {
            scoreboardInfo.player[0].framesWon++
        } else if (scoreboardInfo.player[0].currentScore < scoreboardInfo.player[1].currentScore) {
            scoreboardInfo.player[1].framesWon++;
        } else {
            return;
        }
        for (const i of [0, 1]) {
            scoreboardInfo.player[i].currentScore = 0;
            scoreboardInfo.player[i].currentBreak = [];
        }
        scoreboardInfo.activeTurn = (scoreboardInfo.activeTurn + 1) % 2;
        scoreboardInfo = scoreboardInfo;
    }

    let foulMode = false;

    const handleFoul = () => {
        foulMode = !foulMode;
    }

    const handleEsc = () => {

    }

    const handleEnter = () => {
        scoreboardInfo.player[scoreboardInfo.activeTurn].currentBreak = [];
        scoreboardInfo.player[scoreboardInfo.activeTurn].shotTimes.push(Date.now() - lastEndOfBreak);
        lastEndOfBreak = Date.now();
        scoreboardInfo.activeTurn = (scoreboardInfo.activeTurn + 1) % 2;
        scoreboardInfo = scoreboardInfo;
    }

    const handleBall = (value: number) => {
        if (foulMode) {
            if (value < 4) { return; }
            const activeTurn = scoreboardInfo.activeTurn;
            scoreboardInfo.player[(activeTurn + 1) % 2].currentScore += value;
            scoreboardInfo.player[activeTurn].foulsCommitted += 1;
            handleEnter();
            foulMode = !foulMode;
        } else {
            scoreboardInfo.player[scoreboardInfo.activeTurn].currentBreak.push(value);
            scoreboardInfo.player[scoreboardInfo.activeTurn].currentScore += value;
        }
        scoreboardInfo = scoreboardInfo;
    }

    $: {
        localStorage["scoreboardInfo"] = JSON.stringify(scoreboardInfo);
        if (conn !== null && conn.open) {
            conn.send(scoreboardInfo);
        }
        scoreboardHistory.push(structuredClone(scoreboardInfo));
    }

    onMount(() => {
        // connectToPeer();
    })
</script>

<div class="text-3xl text-white pt-5 green-baize w-svw min-h-svh touch-none">
    {#each {length: 2} as _, i}
    <div class="font-bold px-5 mb-1 space-y-1">
        <div class="flex justify-between items-end">
            <div class="max-w-[70%] text-nowrap overflow-hidden overflow-ellipsis">{ scoreboardInfo.player[i].name }</div>
            <div><span class="text-5xl font-bold { scoreboardInfo.activeTurn === i ? 'text-active-yellow' : 'opacity-20' }">{ scoreboardInfo.player[i].currentBreak.reduce((a, b) => a + b, 0) }</span><span class="pl-2 text-lg font-light text-white">[{ scoreboardInfo.player[i].framesWon }] { scoreboardInfo.player[i].currentScore }</span></div>
        </div>
    </div>
    {/each}
    <div class="flex flex-col items-center space-y-5">
        <div class="grid grid-cols-3 gap-4 font-medium">
            <button on:click={ () => { handleBall(1) } } class="col-span-3 active:opacity-50 { foulMode ? 'opacity-20' : '' } flex justify-center"><ControlBall value={1}></ControlBall></button>
            <button on:click={ () => { handleBall(2) } } class="col-span-1 active:opacity-50 { foulMode ? 'opacity-20' : '' } justify-center"><ControlBall value={2}></ControlBall></button>
            <button on:click={ () => { handleBall(3) } } class="col-span-1 active:opacity-50 { foulMode ? 'opacity-20' : '' } justify-center"><ControlBall value={3}></ControlBall></button>
            <button on:click={ () => { handleBall(4) } } class="col-span-1 active:opacity-50 { foulMode ? 'brightness-[80%]' : '' } justify-center"><ControlBall value={4}></ControlBall></button>
            <button on:click={ () => { handleBall(5) } } class="col-span-1 active:opacity-50 { foulMode ? 'brightness-[80%]' : '' } justify-center"><ControlBall value={5}></ControlBall></button>
            <button on:click={ () => { handleBall(6) } } class="col-span-1 active:opacity-50 { foulMode ? 'brightness-[80%]' : '' } justify-center"><ControlBall value={6}></ControlBall></button>
            <button on:click={ () => { handleBall(7) } } class="col-span-1 active:opacity-50 { foulMode ? 'brightness-[80%]' : '' } justify-center"><ControlBall value={7}></ControlBall></button>
        </div>
        <div class="grid grid-cols-4 gap-3 text-2xl">
            <button on:click={ handleGame } class="w-18 active:opacity-50 p-2 col-span-1 blue-gradient">Game</button>
            <button on:click={ handleFoul } class="w-18 active:opacity-50 { foulMode ? 'saturate-50' : ''} p-2 col-span-1 blue-gradient">Foul</button>
            <button on:click={ handleEsc } class="w-18 active:opacity-50 p-2 col-span-1 blue-gradient">Undo</button>
            <button on:click={ handleEnter } class="w-18 active:opacity-50 p-2 col-span-1 blue-gradient">Enter</button>
        </div>
        <select class="mx-4 border-2 border-white bg-transparent w-5/6 text-center flex justify-center p-2 text-xl">
            <option class="text-center">Current break</option>
        </select>
        <div class="flex items-center text-xl gap-x-2">
            <button class="w-18 active:opacity-50 p-2 orange-gradient text-xl">Tog. on</button>
            or
            <button class="w-18 active:opacity-50 p-2 green-gradient text-xl">Show</button>
            for
            <select name="" id="" class="border-2 border-white bg-transparent text-center flex justify-center p-2 text-xl">
                <option value="">40</option>
            </select>
            seconds
        </div>
        <div class="flex justify-end w-full pr-5">
            <button on:click={() => { showOverlaySettings = true; }} class="w-18 active:opacity-50 p-2 purple-gradient text-xl">Overlay settings</button>
        </div>
    </div>
</div>
<div class="{ showOverlaySettings ? 'flex' : 'hidden' } justify-center items-center w-dvw h-dvh absolute top-0 left-0 z-20 backdrop-blur-md">
    <div class="w-[80%] max-h-[90%] overflow-y-scroll bg-gray-200 opacity-90 p-3 text-2xl space-y-2">
        Connection pin
        <br>
        <div class="w-full flex justify-center">
            <input bind:value={ p2pid } type="text" class="w-[90%] p-2 text-2xl bg-transparent border-2 border-black" />
        </div>
        <div class="w-full flex justify-end">
            <button on:click={ connectToPeer } class="p-2 purple-gradient text-2xl text-white active:opacity-50">Connect</button>
        </div>
        <span class="text-red-400 font-light text-xl">{ errorMessage }</span>
        <span class="text-gray-600 font-light text-xl">{ statusMessage }</span>
        <span class="text-green-400 font-light text-xl">{ successMessage }</span>
        <br>
        Player 1 name
        <br>
        <div class="w-full flex justify-center mb-10">
            <input bind:value={ scoreboardInfo.player[0].name } type="text" class="w-[90%] p-2 text-2xl bg-transparent border-2 border-black" />
        </div>
        Player 2 name
        <br>
        <div class="w-full flex justify-center">
            <input bind:value={ scoreboardInfo.player[1].name } type="text" class="w-[90%] p-2 text-2xl bg-transparent border-2 border-black" />
        </div>
        <div class="w-full flex justify-center gap-x-2 items-center px-5">
            <span class="whitespace-nowrap">Best of</span>
            <input bind:value={ scoreboardInfo.bestOf } type="number" pattern="[0-9]*"  class="w-[70%] p-2 text-2xl bg-transparent border-2 border-black" />
        </div>
        <br>
        <div class="w-full flex justify-end gap-x-3">
            <button on:click={ resetAll } class="p-2 orange-gradient text-2xl text-white active:opacity-50">Reset all</button>
            <button on:click={ saveMatchDetails } class="p-2 blue-gradient text-2xl text-white active:opacity-50">Close</button>
        </div>
    </div>
</div>

<style>
.green-baize {
    background: var(--green-baize);
}

.blue-gradient {
    background: linear-gradient(90deg, #098CB5 0%, #43B3BA 61.45%);
}

.green-gradient {
    background: linear-gradient(90deg, #9DB509 0%, #77BA43 61.45%); 
}

.orange-gradient {
    background: linear-gradient(90deg, #d39311 0%, #ba8643 61.45%); 
}

.purple-gradient {
    background: linear-gradient(90deg, #7E09B5 0%, #B143BA 61.45%);
}
</style>