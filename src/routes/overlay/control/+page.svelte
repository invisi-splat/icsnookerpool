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
    let peer = new Peer({ debug: 3, config: { 'iceServers': [
            { 'url': 'stun:stun.l.google.com:19302' }  
          ]}
        });

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
        totalSafeties: 0,
        successfulLongpots: 0,
        totalLongpots: 0,
        successfulEscapes: 0,
        totalEscapes: 0,
    }

    const emptyScoreboard = {
        player: Array(2).fill(null).map(() => {return structuredClone(emptyPlayer)}),
        bestOf: 1,
        activeTurn: 0,
        onColourAfterRed: false,
        stat: {
            visible: false,
            data: {
                name: "",
                side: 0,
                break: [],
                total: 0
            }
        }
    }

    const emptyStats = {
        player: [],
        remainingBalls: [0, 15, 1, 1, 1, 1, 1, 1]
    }

    let scoreboardInfoStr = localStorage["scoreboardInfo"] ?? JSON.stringify(structuredClone(emptyScoreboard));
    let scoreboardInfo = JSON.parse(scoreboardInfoStr);

    let calculatedStatsStr = localStorage["calculatedStats"] ?? JSON.stringify(structuredClone(emptyStats));
    let calculatedStats = JSON.parse(calculatedStatsStr);

    let lastEndOfBreak = Date.now();

    let paused = false;

    // Enables a special mode -- a secondary menu of sorts.
    let shift = false;

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

            // conn.send(scoreboardInfo);
        });

        localStorage["p2pid"] = p2pid;
    }

    const resetAll = () => {
        localStorage.removeItem("scoreboardInfo");
        scoreboardInfo = structuredClone(emptyScoreboard);
        localStorage.removeItem("calculatedStats");
        calculatedStats = structuredClone(emptyStats);
    }

    const saveMatchDetails = () => {
        showOverlaySettings = !showOverlaySettings;
    }

    const handleGame = () => {
        if (paused) { return; }
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
        localStorage.removeItem("calculatedStats");
        calculatedStats = structuredClone(emptyStats);
        shift = false;
    }

    let foulMode = false;
    let snookerMode = false;

    const handleShift = () => {
        if (paused) { return; }
        if (foulMode) {
            snookerMode = !snookerMode;
            return;
        }
        shift = !shift;
    }

    const handleFoul = () => {
        if (paused) { return; }
        foulMode = !foulMode;
    }

    const handleEsc = () => {
        if (paused || foulMode) { return; }
        scoreboardHistory.pop();
        scoreboardInfo = scoreboardHistory.pop();
        statsHistory.pop();
        calculatedStats = statsHistory.pop();
    }

    const handleEnter = () => {
        if (paused || foulMode) { return; }
        scoreboardInfo.player[scoreboardInfo.activeTurn].currentBreak = [];
        scoreboardInfo.player[scoreboardInfo.activeTurn].shotTimes.push(Date.now() - lastEndOfBreak);
        lastEndOfBreak = Date.now();
        scoreboardInfo.activeTurn = (scoreboardInfo.activeTurn + 1) % 2;
        scoreboardInfo.onColourAfterRed = false;
        refreshStats();
        scoreboardInfo = scoreboardInfo;
    }

    const handleBall = (value: number) => {
        if (paused) { return; }
        if (foulMode) {
            if (value !== 0 && value < 4) { return; }
            const activeTurn = scoreboardInfo.activeTurn;
            scoreboardInfo.player[(activeTurn + 1) % 2].currentScore += value;
            if (snookerMode) {
                if (value === 0) {
                    scoreboardInfo.player[activeTurn].successfulEscapes++;
                }
                scoreboardInfo.player[activeTurn].totalEscapes++;
                snookerMode = false;
            }
            scoreboardInfo.player[activeTurn].foulsCommitted += value;
            handleEnter();
            foulMode = !foulMode;
        } else {
            if (value === 1) {
                scoreboardInfo.onColourAfterRed = true;
                calculatedStats.remainingBalls[1]--;
            } else {
                if (calculatedStats.remainingBalls[1] <= 0 && !scoreboardInfo.onColourAfterRed) {
                    calculatedStats.remainingBalls[value]--;
                } else {
                    scoreboardInfo.onColourAfterRed = false;
                }
            }
            console.log(calculatedStats.remainingBalls);
            scoreboardInfo.player[scoreboardInfo.activeTurn].currentBreak.push(value);
            scoreboardInfo.player[scoreboardInfo.activeTurn].currentScore += value;
        }
        if (shift) {
            if (value !== 0) {
                scoreboardInfo.player[scoreboardInfo.activeTurn].successfulLongpots++;
                scoreboardInfo.player[scoreboardInfo.activeTurn].totalLongpots++;
            } else {
                scoreboardInfo.player[scoreboardInfo.activeTurn].totalLongpots++;
                handleEnter();
            }
            shift = false;
        }
        refreshStats();
        scoreboardInfo = scoreboardInfo;
    }

    const handleSafety = () => {
        scoreboardInfo.player[scoreboardInfo.activeTurn].successfulSafeties++;
        scoreboardInfo.player[scoreboardInfo.activeTurn].totalSafeties++;
        handleEnter();
        shift = false;
    }

    const handleUnsafe = () => {
        scoreboardInfo.player[scoreboardInfo.activeTurn].totalSafeties++;
        handleEnter();
        shift = false;
    }

    let showStatLength = 0;
    let showStatTimer: any;

    const handleToggleStat = () => {
        clearInterval(showStatTimer);
        scoreboardInfo.stat.visible = !scoreboardInfo.stat.visible;
        refreshStats();
        scoreboardInfo = scoreboardInfo;
    }

    let selectedStat = "";

    function refreshStats() {
        scoreboardInfo.stat.data = getStatData();
    }

    function getStatData() {
        let data: any = {
            name: selectedStat,
            side: 0,
        };
        switch (selectedStat) {
            case "cb":
                data["side"] = scoreboardInfo.activeTurn === 0 ? 0 : 2;
                const counts = Array(8).fill(0);
                for (const num of scoreboardInfo.player[scoreboardInfo.activeTurn].currentBreak) {
                    counts[num] = counts[num] ? counts[num] + 1 : 1;
                }
                data["break"] = counts;
                //@ts-ignore
                data["total"] = scoreboardInfo.player[scoreboardInfo.activeTurn].currentBreak.reduce((a, b) => a + b, 0);
                break;
            case "p1bar":
            case "p2bar":
                data["side"] = selectedStat === "p1bar" ? 0 : 2;
                data["diff"] = scoreboardInfo.player[0].currentScore - scoreboardInfo.player[1].currentScore;
                data["ab"] = data["diff"] < 0 && selectedStat === "p1bar" || data["diff"] > 0 && selectedStat === "p2bar" ? "b" : "a";
                data["diff"] = Math.abs(data["diff"]);
                data["remaining"] = calculatedStats.remainingBalls[1] > 0 && scoreboardInfo.onColourAfterRed ? 7 : 0;
                for (const [ball, count] of calculatedStats.remainingBalls.entries()) {
                    data["remaining"] += ball === 1 ? count * 8 : ball * count
                }
                break;
            case "ast":
                data["side"] = 1;
                data["times"] = [0, 1].map(value => Math.floor(scoreboardInfo.player[value].shotTimes.reduce((a, b) => a + b, 0) / (1000 * scoreboardInfo.player[value].shotTimes.length)))
                data["times"] = data["times"].map(value => `${Math.floor(value / 60)}:${(value % 60) < 10 ? `0${value % 60}` : (value % 60)}`)
                break;
            case "lps":
                data["side"] = 1;
                data["rate"] = [0, 1].map(value => {
                    if (scoreboardInfo.player[value].totalLongpots !== 0) {
                        return Math.round(100 * (scoreboardInfo.player[value].successfulLongpots / (scoreboardInfo.player[value].totalLongpots)))
                    } else {
                        return 100;
                    }
                });
                break;
            case "ss":
                data["side"] = 1;
                data["rate"] = [0, 1].map(value => {
                    if (scoreboardInfo.player[value].totalSafeties !== 0) {
                        return Math.round(100 * (scoreboardInfo.player[value].successfulSafeties / (scoreboardInfo.player[value].totalSafeties)))
                    } else {
                        return 100;
                    }
                });
                break;
            case "ses":
                data["side"] = 1;
                data["rate"] = [0, 1].map(value => {
                    if (scoreboardInfo.player[value].totalEscapes !== 0) {
                        return Math.round(100 * (scoreboardInfo.player[value].successfulEscapes / (scoreboardInfo.player[value].totalEscapes)))
                    } else {
                        return 100;
                    }
                });
                break;
            case "fc":
                data["side"] = 1;
                data["fouls"] = [0, 1].map(value => scoreboardInfo.player[value].foulsCommitted);
                break;
            default:
                break;
        }
        return data;
    }

    const handleShowStat = (duration: number) => {
        clearInterval(showStatTimer);
        scoreboardInfo.stat.visible = true;
        refreshStats();
        showStatTimer = setTimeout(() => {
            scoreboardInfo.stat.visible = false;
        }, duration * 1000);
        scoreboardInfo = scoreboardInfo;
    }

    const handlePause = () => {
        if (paused) {
            lastEndOfBreak = Date.now();
        }
        paused = !paused;
    }

    $: {
        localStorage["scoreboardInfo"] = JSON.stringify(scoreboardInfo);
        localStorage["calculatedStats"] = JSON.stringify(calculatedStats);
        if (conn !== null && conn.open) {
            // conn.send(scoreboardInfo);
        }
        scoreboardHistory.push(structuredClone(scoreboardInfo));
        statsHistory.push(structuredClone(calculatedStats));
    }

    onMount(() => {
        scoreboardInfo.stat.visible = false;
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
        <div class="grid grid-cols-3 gap-4 font-medium { paused ? 'opacity-50' : '' }">
            {#if shift}
                <button on:click={ () => { handleBall(0) } } class="col-span-1 active:opacity-50 { foulMode ? 'opacity-20' : '' } flex justify-center"><ControlBall value={0}></ControlBall></button>
            {/if}
            <button on:click={ () => { handleBall(1) } } class="{shift ? 'col-span-1' : 'col-span-3'} active:opacity-50 { foulMode ? 'opacity-20' : '' } flex justify-center"><ControlBall value={!shift ? 1 : 9}></ControlBall></button>
            {#if shift}
                <div class="col-span-1"></div> <!--padding-->
            {/if}
            <button on:click={ () => { handleBall(2) } } class="col-span-1 active:opacity-50 { foulMode ? 'opacity-20' : '' } justify-center"><ControlBall value={!shift ? 2 : 10}></ControlBall></button>
            <button on:click={ () => { handleBall(3) } } class="col-span-1 active:opacity-50 { foulMode ? 'opacity-20' : '' } justify-center"><ControlBall value={!shift ? 3 : 11}></ControlBall></button>
            <button on:click={ () => { handleBall(4) } } class="col-span-1 active:opacity-50 { foulMode ? 'brightness-[80%]' : '' }  { snookerMode ? 'brightness-[60%]' : ''} justify-center"><ControlBall value={!shift ? 4 : 12}></ControlBall></button>
            <button on:click={ () => { handleBall(5) } } class="col-span-1 active:opacity-50 { foulMode ? 'brightness-[80%]' : '' }  { snookerMode ? 'brightness-[60%]' : ''} justify-center"><ControlBall value={!shift ? 5 : 13}></ControlBall></button>
            <button on:click={ () => { handleBall(6) } } class="col-span-1 active:opacity-50 { foulMode ? 'brightness-[80%]' : '' }  { snookerMode ? 'brightness-[60%]' : ''} justify-center"><ControlBall value={!shift ? 6 : 14}></ControlBall></button>
            <button on:click={ () => { handleBall(7) } } class="col-span-1 active:opacity-50 { foulMode ? 'brightness-[80%]' : '' }  { snookerMode ? 'brightness-[60%]' : ''} justify-center"><ControlBall value={!shift ? 7 : 15}></ControlBall></button>
        </div>
        {#if !shift}
            <div class="grid grid-cols-4 gap-3 text-2xl { paused ? 'opacity-50' : '' }">
                <button on:click={ handleShift } class="w-18 active:opacity-50 p-2 col-span-1 blue-gradient">Shift</button>
                <button on:click={ handleFoul } class="w-18 active:opacity-50 { foulMode ? 'saturate-50' : ''} p-2 col-span-1 blue-gradient">{ snookerMode ? 'Snoo.' : 'Foul'}</button>
                <button on:click={ handleEsc } class="w-18 active:opacity-50 p-2 col-span-1 blue-gradient">Undo</button>
                <button on:click={ handleEnter } class="w-18 active:opacity-50 p-2 col-span-1 blue-gradient">Enter</button>
            </div>
        {:else}
            <div class="grid grid-cols-4 gap-3 text-2xl { paused ? 'opacity-50' : '' }">
                <button on:click={ handleShift } class="w-18 active:opacity-50 p-2 col-span-1 brightness-125 blue-gradient">Shift</button>
                <button on:click={ handleGame } class="w-18 active:opacity-50 p-2 col-span-1 blue-gradient">Game</button>
                <button on:click={ handleSafety } class="w-18 active:opacity-50 p-2 col-span-1 blue-gradient">Safe</button>
                <button on:click={ handleUnsafe } class="w-18 active:opacity-50 p-2 col-span-1 blue-gradient">Unsafe</button>
            </div>
        {/if}
        <select bind:value={ selectedStat } class="mx-4 border-2 border-white bg-transparent w-5/6 text-center flex justify-center p-2 text-xl">
            <option value="cb" >Current break</option>
            <option value="p1bar" >Player 1 behind/ahead remaining</option>
            <option value="p2bar" >Player 2 behind/ahead remaining</option>
            <option value="ast" >Average shot time</option>
            <option value="ss" >Safety success</option>
            <option value="lps" >Long pot success</option>
            <option value="ses" >Snooker escape success</option>
            <option value="fc" >Fouls committed</option>
        </select>
        <div class="flex items-center text-xl gap-x-2">
            <button on:click={ handleToggleStat } class="w-18 active:opacity-50 { scoreboardInfo.stat.visible ? 'saturate-50' : '' } p-2 orange-gradient text-xl">Tog. { scoreboardInfo.stat.visible ? 'off' : 'on'}</button>
            or
            <button on:click={ () => { handleShowStat(showStatLength) } } class="w-18 active:opacity-50 p-2 green-gradient text-xl">Show</button>
            for
            <input bind:value={ showStatLength } type="number" pattern="[0-9]*" class="w-12 border-2 border-white bg-transparent text-center flex justify-center p-2 text-xl">
            seconds
        </div>
        <div class="flex justify-between w-full px-5">
            <button on:click={ handlePause } class="w-18 active:opacity-50 p-2 rose-gradient { paused ? 'saturate-50' : '' } text-xl">{ paused ? 'Unp' : 'P'}ause match</button>
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

.rose-gradient {
    background: linear-gradient(90deg, #b50959 0%, #ba4357 61.45%); 
}


.orange-gradient {
    background: linear-gradient(90deg, #d39311 0%, #ba8643 61.45%); 
}

.purple-gradient {
    background: linear-gradient(90deg, #7E09B5 0%, #B143BA 61.45%);
}
</style>