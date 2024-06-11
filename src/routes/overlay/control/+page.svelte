<script lang="ts">
    import ControlBall from "./controlBall.svelte";
</script>

<div class="text-3xl text-white pt-5 green-baize w-svw min-h-svh">
    <div class="font-bold px-5 mb-1 space-y-1">
        <div class="flex justify-between items-end">
            <div class="max-w-[70%] text-nowrap overflow-hidden overflow-ellipsis">Kasidit Lauhabutr</div>
            <div><span class="text-5xl font-bold text-active-yellow">10</span><span class="pl-2 text-lg font-light text-white">[4] 72</span></div>
        </div>
    </div>
    <div class="font-light px-5 mb-4 space-y-1">
        <div class="flex justify-between items-end">
            <div class="max-w-[70%] text-nowrap overflow-hidden overflow-ellipsis">Om Goswamy</div>
            <div><span class="text-5xl font-bold opacity-20">0</span><span class="pl-2 text-lg font-light text-white">[2] 38</span></div>
        </div>
    </div>
    <div class="flex flex-col items-center space-y-5">
        <div class="grid grid-cols-3 gap-4 font-medium">
            <button class="col-span-3 active:opacity-50 flex justify-center"><ControlBall value={1}></ControlBall></button>
            <button class="col-span-1 active:opacity-50 justify-center"><ControlBall value={2}></ControlBall></button>
            <button class="col-span-1 active:opacity-50 justify-center"><ControlBall value={3}></ControlBall></button>
            <button class="col-span-1 active:opacity-50 justify-center"><ControlBall value={4}></ControlBall></button>
            <button class="col-span-1 active:opacity-50 justify-center"><ControlBall value={5}></ControlBall></button>
            <button class="col-span-1 active:opacity-50 justify-center"><ControlBall value={6}></ControlBall></button>
            <button class="col-span-1 active:opacity-50 justify-center"><ControlBall value={7}></ControlBall></button>
        </div>
        <div class="grid grid-cols-4 gap-3 text-2xl">
            <button class="w-18 active:opacity-50 p-2 col-span-1 blue-gradient">Game</button>
            <button class="w-18 active:opacity-50 p-2 col-span-1 blue-gradient">Clear</button>
            <button class="w-18 active:opacity-50 p-2 col-span-1 blue-gradient">Esc</button>
            <button class="w-18 active:opacity-50 p-2 col-span-1 blue-gradient">Enter</button>
        </div>
        <select class="mx-4 border-2 border-white bg-transparent w-5/6 text-center flex justify-center p-2 text-xl">
            <option class="text-center">Current break</option>
        </select>
        <div class="flex items-center text-xl gap-x-3">
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
            <button class="w-18 active:opacity-50 p-2 purple-gradient text-xl">Overlay settings</button>
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