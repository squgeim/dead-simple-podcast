<script>
	import Episode from "$lib/components/episode.svelte";
	import {getEpisodes} from '$lib/episodes';
	import {subscriptions} from "$lib/storage/subscriptions";

	let page = 1;
	let episodes = getEpisodes($subscriptions, page);
</script>

{#each episodes as epi}
	<Episode episode={epi}/>
{/each}
