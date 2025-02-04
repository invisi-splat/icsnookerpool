<script lang="ts">
    interface Props {
        text: string;
    }

    let { text }: Props = $props();
</script>

{#each [...text] as letter}
    {#if letter === letter.toUpperCase()}
    <span class="text-xl xs:text-2xl">{letter}</span>
    {:else}
    <span class="text-base xs:text-lg">{letter.toUpperCase()}</span>
    {/if}
{/each}