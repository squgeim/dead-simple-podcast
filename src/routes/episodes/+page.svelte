<script>
	import Episode from "$lib/components/episode.svelte";
	import {getEpisodes} from '$lib/episodes';
	import {subscriptions} from "$lib/storage/subscriptions";

	let page = 1;
</script>

{#each getEpisodes($subscriptions, page) as epi}
	<Episode episode={epi}/>
{/each}
