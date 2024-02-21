<script lang="ts">
    import Board from "./board.svelte";
    import type { PageData } from './$types';
	
	export let data: PageData;
</script>

<Board breakInfo={data.breakInfo} annualBreakInfo={data.annualBreakInfo}></Board>

<style>
    :global(body) {
        background: var(--green-baize);
        color: white;
    }
</style>