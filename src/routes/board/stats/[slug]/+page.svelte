<script lang="ts">
  import type { PageProps } from './$types';
  import type { Action } from "svelte/action";
  import Chart from "chart.js/auto";
  import 'chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm';
  import dayjs from "dayjs";
  import { onMount } from 'svelte';

	let { data }: PageProps = $props();
  
  let highestBreaks: DbBreakInfo = data.breakInfo.toSorted((a, b) => b.break - a.break)
  let maximumBreak: DbBreakEntry = highestBreaks[0];
  let recentBreak = data.breakInfo[0];

  // I would like to be able to extract this out to its own TS file but alas
  // Cannot use $effect outside of svelte files
  const breakChart: Action<HTMLCanvasElement> = (node) => {
    $effect(() => {
      let width = screen.width;
      Chart.defaults.font.family = "Roboto Slab"
      Chart.defaults.color = "#d9d9d9";
      Chart.defaults.plugins.legend.display = false;
      if (width > 640) {
        Chart.defaults.font.size = 16;
        Chart.defaults.aspectRatio = 3;
      } else {
        Chart.defaults.font.size = 12;
        Chart.defaults.aspectRatio = 1;
      }
      new Chart(
        node,
        {
          type: 'scatter',
          data: {
            datasets: [
              {
                label: 'Breaks',
                data: data.breakInfo.filter(entry => entry.break !== maximumBreak.break).map(entry => ({ x: entry.submitted, y: entry.break })),
                backgroundColor: "orange"
              },
              {
                label: 'Highest break',
                data: [{ x: maximumBreak.submitted, y: maximumBreak.break }],
                pointRadius: 5,
                backgroundColor: "red"
              }
            ]
          },
          options: {
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'month'
                    }
                }
            },
            transitions: {
              show: {
                animations: {
                  x: {
                    from: 0
                  },
                  y: {
                    from: 0
                  }
                }
              },
            }
          }
        }
      );
    })
  }

  onMount(() => {
    console.log(data)
  })

</script>

<svelte:head>
    <title>{ data.userInfo.given_name } { data.userInfo.last_name } | IC Snooker & Pool</title> 
</svelte:head>

<div class="w-full flex flex-col justify-center items-center px-5 py-2 text-almost-white">
  <p class="sm:text-3xl text-2xl mb-5">{ data.userInfo.given_name } { data.userInfo.last_name } <span class="font-bold text-white"><span>(#</span>{ data.ranking })</p>
  <div class="sm:hidden grid grid-cols-4 w-3/4 mb-5">
    <p class="col-span-3">Highest break</p>
    <p class="col-span-1 justify-end font-bold">{ maximumBreak.break }</p>
    <p class="col-span-3">Most recent break</p>
    <p class="col-span-1 justify-end font-bold">{ recentBreak.break }</p>
    <p class="col-span-3">Total submitted breaks</p>
    <p class="col-span-1 justify-end font-bold">{ data.breakInfo.length }</p>
    <p class="col-span-3 text-white font-bold">Weighted rating</p>
    <p class="col-span-1 text-white justify-end font-bold">{ data.rating?.toPrecision(5) }</p>
  </div>
  <div class="sm:w-3/4 w-full flex justify-center">
    <canvas use:breakChart></canvas>
  </div>
  <div class="w-full flex justify-around my-5">
    <div>
      <p class="sm:text-2xl text-xl my-3">Highest breaks</p>
      <div class="grid grid-cols-4">
        {#each highestBreaks.slice(0, 10) as breakEntry}
        <p class="col-span-1 sm:text-xl font-bold">{ breakEntry.break }</p>
        <a href="/board/?month={dayjs(breakEntry.submitted).month()}&year={dayjs(breakEntry.submitted).year()}" class="col-span-3 font-thin sm:text-xl underline active:opacity-20">{ dayjs(breakEntry.submitted).format("DD/MM/YYYY") }</a>
        {/each}
      </div>
    </div>
    <div>
      <p class="sm:text-2xl text-xl my-3">Latest breaks</p>
      <div class="grid grid-cols-4">
        {#each data.breakInfo.slice(0, 10) as breakEntry}
        <p class="col-span-1 sm:text-xl font-bold">{ breakEntry.break }</p>
        <a href="/board/?month={dayjs(breakEntry.submitted).month()}&year={dayjs(breakEntry.submitted).year()}" class="col-span-3 font-thin sm:text-xl underline active:opacity-20">{ dayjs(breakEntry.submitted).format("DD/MM/YYYY") }</a>
        {/each}
      </div>
    </div>
    <div class="sm:block hidden w-1/4">
      <p class="sm:text-2xl my-3">Summary</p>
      <div class="grid grid-cols-4 w-full mb-5">
        <p class="col-span-3 text-xl">Highest break</p>
        <p class="col-span-1 text-xl justify-end font-bold">{ maximumBreak.break }</p>
        <p class="col-span-3 text-xl">Most recent break</p>
        <p class="col-span-1 text-xl justify-end font-bold">{ recentBreak.break }</p>
        <p class="col-span-3 text-xl">Total submitted breaks</p>
        <p class="col-span-1 text-xl justify-end font-bold">{ data.breakInfo.length }</p>
        <p class="col-span-3 text-xl text-white font-bold">Weighted rating</p>
        <p class="col-span-1 text-xl text-white justify-end font-bold">{ data.rating?.toPrecision(5) }</p>
      </div>
    </div>
  </div>
  <a href="/board/stats" class="underline active:opacity-20 font-light my-10">Back to all-time stats</a>
</div>

<style>
:global(body) {
  background: var(--green-baize);
  color: white;
  overscroll-behavior: none;
}
</style>