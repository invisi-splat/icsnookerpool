import type { Action } from "svelte/action";
import Chart from 'chart.js/auto'

export const breakChartAction: (data: DbBreakInfo) => Action<HTMLCanvasElement> = (data) => {
  return (node) => {
    console.log(data)
    $effect(() => {
      new Chart(
        node,
        {
          type: 'scatter',
          data: {
            datasets: [
              {
                label: 'Breaks',
                data: data.map(entry => ({ x: entry.submitted, y: entry.break }))
              }
            ]
          }
        }
      );
  
      return () => {
        // teardown goes here
      };
    })
  }
}
