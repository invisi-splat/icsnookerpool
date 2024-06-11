<script lang="ts">
    let something = true;

    setTimeout(() => {
        something = false;
    }, 2000)
    setTimeout(() => {
        something = true;
    }, 6000)

    let showConnectionPane = true;
</script>

<div class="text-white text-2xl font-light h-14 flex items-center justify-center relative">
    <div class="w-full flex items-center h-full z-5">
        <div class="flex-grow flex justify-between items-center h-10 pl-20 pr-6 basis-0">
            <div>Kasidit Lauhabutr</div>
            <div>72</div>
        </div>
        <div class="h-full border-4 flex items-center justify-evenly border-black w-[10%] blue-baize">
            <span class="">2</span>
            <span>(11)</span>
            <span>4</span>
        </div>
        <div class="flex-grow flex justify-between items-center text-right h-10 pr-20 pl-6 basis-0">
            <div>38</div>
            <div class="text-yellow-200">Om Goswamy</div>
        </div>
    </div>
    <!-- just the background -->
    <div class="green-baize w-full absolute -z-10 h-10"></div>
    <div class="w-full absolute text-black -z-20 h-12 { something ? 'top-2' : 'top-12' } flex justify-center pl-20 pr-20 transition-all duration-1000">
        <div class="hidden h-10 -flex w-2/5 bg-gray-300 bg-opacity-50 items-center">
            <span class="ml-4">41 Ahead</span>
            <span class="ml-6">35 Remaining</span>
        </div>
        <div class="flex h-10 w-1/4 bg-gray-300 bg-opacity-50 items-center justify-center">
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
            <span class="text-3xl font-mono">1239hda0</span>
        </div>
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