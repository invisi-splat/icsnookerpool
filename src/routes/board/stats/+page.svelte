<script lang="ts">
  import { onMount } from 'svelte';

  let { data } = $props();

  onMount(() => {
    console.log(data)
    MathJax.typeset();
  })

</script>

<svelte:head>
    <title>Break board stats | IC Snooker & Pool</title> 
</svelte:head>

<div class="flex flex-col items-center gap-3 my-5 mx-2 text-white">
  <h1 class="font-bold text-3xl">IC Break Board Stats</h1>
  <div class="flex flex-col items-center">
    <a href="#calculation-explanation" class="underline font-light italic">(How is this calculated?)</a>
    <a href="/board" class="underline font-light italic">(Get me back to the break board!)</a>
  </div>
  <div class="flex flex-col sm:grid sm:grid-cols-2 gap-x-32 items-center">
    <div class="sm:col-span-1 grid-cols-7 grid gap-x-3 gap-y-2 text-lg text-gray-300 bg-slate-900 bg-opacity-15 py-3 px-5 mb-10">
      <p class="col-span-1"></p>
      <p class="col-span-4 font-light">Name</p>
      <p class="col-span-2 font-light">Rating</p>
      {#each data.ratingData as rating, index }
      {#if index === 0}
      <p class="col-span-1 text-xl font-bold text-white">{ index + 1 } </p>
      <a href="/board/stats/{rating.user_id}" class="col-span-4 text-xl font-bold text-white underline active:opacity-20">{ rating.users.given_name } { rating.users.last_name}</a>
      <p class="col-span-2 text-xl font-bold text-white">{ rating.rating.toPrecision(5) }</p>
      {:else if index === 1}
      <p class="col-span-1 text-xl text-white">{ index + 1 } </p>
      <a href="/board/stats/{rating.user_id}" class="col-span-4 text-xl text-white underline active:opacity-20">{ rating.users.given_name } { rating.users.last_name}</a>
      <p class="col-span-2 text-xl text-white">{ rating.rating.toPrecision(5) }</p>
      {:else if index === 2}
      <p class="col-span-1 text-xl text-white">{ index + 1 } </p>
      <a href="/board/stats/{rating.user_id}" class="col-span-4 text-xl text-white underline active:opacity-20">{ rating.users.given_name } { rating.users.last_name}</a>
      <p class="col-span-2 text-xl text-white">{ rating.rating.toPrecision(5) }</p>
      {:else}
      <p class="col-span-1">{ index + 1 } </p>
      <a href="/board/stats/{rating.user_id}" class="col-span-4 underline active:opacity-20">{ rating.users.given_name } { rating.users.last_name}</a>
      <p class="col-span-2">{ rating.rating.toPrecision(5) }</p>
      {/if}
      {/each}
    </div>
    <div class="flex flex-col sm:col-span-1 items-center">
      <h1 id="calculation-explanation" class="text-xl font-bold">How is this calculated?</h1>
      <p class="p-3"><span class="font-bold">TL;DR: To increase your rating, submit a lot of breaks. To increase your rating even more, make sure those breaks are big!</span></p>
      <p class="p-3">A rating is calculated for each person by computing a weighted sum of all of that person's breaks. The formula is
      {`$$\\mathrm{Rating}=\\sum_{i=0}^{n}{b_i\\cdot 0.9^{i}}$$`}
      where $n$ is the total number of breaks made and $b_i$ is the $(i + 1)$th highest break made.<br />
      For example, if someone submitted breaks of 37, 42, 39, and 52 to the break board, their rating is calculated as
      {`$$\\displaylines{
      52\\cdot 0.9^0 + 42\\cdot 0.9^1 \\cr + 39\\cdot 0.9^2 + 37\\cdot 0.9^3=148.363
      }$$`}<br />
      The reasoning behind this is
      </p>
      <ul class="p-3">
        <li>- Your top break should have the most effect on your ranking</li>
        <li>- If you've submitted a lot of breaks that should be reflected in your ranking</li>
        <li>- But if you've submitted a lot of very high breaks, that should have more of an influence</li>
        <li>- This is also a system in use in <a href="https://osu.ppy.sh/wiki/en/Performance_points#weightage-system" class="underline text-blue-400">other areas</a></li>
      </ul>
      <p class="p-3 w-full">Ultimately, the number is fairly arbitrary, but it gives a somewhat objective indication of the player's ability.</p>
    </div>
  </div>

</div>

<style>
:global(body) {
  background: var(--green-baize);
  color: white;
  overscroll-behavior: none;
}
</style>