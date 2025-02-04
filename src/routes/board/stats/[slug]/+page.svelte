<script lang="ts">
  import { breakChartAction } from "./charts";
  import type { PageProps } from './$types';
  import type { Action } from "svelte/action";
  import Chart from "chart.js/auto";
  import 'chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm';


	let { data }: PageProps = $props();
  
  let maximumBreak: DbBreakEntry = data.breakInfo[0];
  for (const breakEntry of data.breakInfo) {
    if (breakEntry.break > maximumBreak.break) {
      maximumBreak = breakEntry
    }
  }

  // I would like to be able to extract this out to its own TS file but alas
  // Cannot use $effect outside of svelte files
  const breakChart: Action<HTMLCanvasElement> = (node) => {
    $effect(() => {
      let width = screen.width;
      Chart.defaults.font.family = "Roboto Slab"
      if (width > 640) {
        console.log("???")
        Chart.defaults.font.size = 16;
        Chart.defaults.aspectRatio = 2;
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
              },
              {
                label: 'Highest break',
                data: [{ x: maximumBreak.submitted, y: maximumBreak.break }],
                pointRadius: 5
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
  
      return () => {
        // teardown goes here
      };
    })
  }

</script>

<div class="w-full flex flex-col justify-center items-center px-5 py-2">
  <p class="sm:text-3xl text-2xl mb-5">{ "Om Goswamy (#1)" }</p>
  <div class="sm:w-3/4 w-full">
    <canvas use:breakChart></canvas>
  </div>
</div>