<script lang="ts">
    import { onMount } from "svelte";
    import BoardText from "./boardText.svelte";
    import { goto } from "$app/navigation";

    export let month: string;
    export let year: string;

    let selectedMonth: string;
    let selectedYear: string;

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    onMount(() => { console.log(month) })
    
    function loadNewMonth() {
        goto(`/board?month=${selectedMonth}&year=${selectedYear}`)
    }

    const START_YEAR = 2020
</script>

<div>
    <select style={ `width: ${month.length * 14}px` } bind:value={selectedMonth} class="bg-opacity-0 bg-black h-fit text-2xl text-right-last mr-2" on:change={ loadNewMonth }>
        {#each monthNames as monthName}
        <option value={ monthNames.indexOf(monthName) } selected={ monthName === month } class="text-2xl text-right"><BoardText text={ monthName }></BoardText></option>
        {/each}
    </select>
    <select bind:value={selectedYear} class="bg-opacity-0 bg-black h-fit w-fit text-2xl" on:change={ loadNewMonth }>
        {#each {length: (new Date()).getFullYear() - START_YEAR + 1} as _, i}
            <option value={ i + START_YEAR } selected={ (i + START_YEAR).toString() === year ? true : false} class="text-2xl"><BoardText text={ (i + START_YEAR).toString() }></BoardText></option>
        {/each}
    </select>
</div>

<style>
    .text-right-last {
        text-align-last: right;
    }
</style>