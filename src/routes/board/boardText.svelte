<script lang="ts">
    export let text: string;
</script>

{#each [...text] as letter}
    {#if letter === letter.toUpperCase()}
    <span class="text-2xl">{letter}</span>
    {:else}
    <span class="text-lg">{letter.toUpperCase()}</span>
    {/if}
{/each}