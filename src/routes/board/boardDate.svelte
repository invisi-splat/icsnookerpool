<script lang="ts">
    import { onMount } from "svelte";
    import BoardText from "./boardText.svelte";
    import { goto } from "$app/navigation";

    interface Props {
        month: string;
        year: string;
    }

    let { month, year }: Props = $props();

    let selectedMonth: string = $state(month);
    let selectedYear: string = $state(year);

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    function loadNewMonth() {
        goto(`/board?month=${selectedMonth}&year=${selectedYear}`)
    }

    const START_YEAR = 2024

    onMount(() => { console.log(selectedMonth), console.log(selectedYear)})

</script>

<div>
    <select style={ `width: ${month.length * 1.15 + 1}ch` } bind:value={selectedMonth} class="bg-opacity-0 bg-black h-fit text-xl xs:text-2xl text-right-last mr-2" onchange={loadNewMonth}>
        {#each monthNames as monthName}
        <option value={ monthNames.indexOf(monthName) } class="bg-gray-500 text-xl xs:text-2xl text-right" selected={ monthName === month } >{monthName}<!--<BoardText text={ monthName }></BoardText>--></option>
        {/each}
    </select>
    <select bind:value={selectedYear} class="bg-opacity-0 bg-black h-fit w-fit text-xl xs:text-2xl" onchange={loadNewMonth}>
        {#each {length: (new Date()).getFullYear() - START_YEAR + 1} as _, i}
            <option value={ i + START_YEAR } selected={ (i + START_YEAR).toString() === year ? true : false} class="text-xl xs:text-2xl">{(i + START_YEAR).toString() }<!--<BoardText text={ (i + START_YEAR).toString() }></BoardText>--></option>
        {/each}
    </select>
</div>

<style>
    .text-right-last {
        text-align-last: right;
    }
</style>