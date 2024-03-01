<script lang="ts">
    import BoardBall from "./boardBall.svelte";
    
    let ballsPotted: number[] = [];
</script>

<div class="my-3 w-5/6 bg-[#B1B1B1] rounded-md font-handwritten p-5">
    <div class="grid grid-cols-8 gap-y-5">
        <div class="text-red-ball text-xl col-span-3">Name</div>
        <input type="text" class="text-black text-xl bg-[#B1B1B1] col-span-5 border-b border-black" />
        <div class="text-red-ball text-xl col-span-3">Break</div>
        <input type="text" class="text-black text-xl bg-[#B1B1B1] col-span-5 border-b border-black" />
        <select class="mt-8 text-black text-xl bg-[#B1B1B1] col-span-3 p-0">
            <option value="table">Table</option>
            <option value="at">At</option>
        </select>
        <input type="text" class="mt-8 text-black text-xl bg-[#B1B1B1] col-span-5 border-b border-black" />
        <div class="text-black col-span-full text-xl">Balls potted</div>
        <div class="flex justify-center gap-2 col-span-full flex-wrap">
            {#each ballsPotted as value, i}
                <button type="button" class="hover:cursor-pointer" on:click={() => {ballsPotted.splice(i, 1); ballsPotted = ballsPotted;}}>
                    <BoardBall value={value}></BoardBall>
                </button>
            {/each}
        </div>
        <div class="flex justify-center gap-x-2 col-span-full">
            {#each {length: 7} as _, i}
                <button type="button" class="hover:cursor-pointer" on:click={() => {ballsPotted.push(i + 1); ballsPotted = ballsPotted;}}>
                    <BoardBall value={i + 1}></BoardBall>
                </button>
            {/each}
        </div>
    </div>
</div>