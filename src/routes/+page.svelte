<script>
	import Episode from "$lib/components/episode.svelte";
	import {nowPlayingQueue} from "$lib/storage/nowPlayingQueue";
</script>

{#each $nowPlayingQueue as epi}
	<Episode episode={epi}/>
{/each}