<script>
	import { getEpisodes } from '$lib/episodes';
	import { addEpisodeToNowPlaying, ignoreEpisode, store } from '$lib/storage';
	let page = 1;
	let episodes = getEpisodes($store.podcasts, page);

	/**
	 * @param {import("../../lib/episode").Episode} episode
	 */
	function addToFrontOfNowPlaying(episode) {
		addEpisodeToNowPlaying(episode, 'start');
	}
	/**
	 * @param {import("../../lib/episode").Episode} episode
	 */
	function addToEndOfNowPlaying(episode) {
		addEpisodeToNowPlaying(episode, 'end');
	}
	/**
	 * @param {import("../../lib/episode").Episode} episode
	 */
	function skipThisEpisode(episode) {
		ignoreEpisode(episode);
	}

	function playNow(episode) {}
</script>

<h1>Episodes</h1>

<ul>
	{#each episodes as epi}
		<div>
			<h2>{epi.title}</h2>
			<p>{epi.subtitle}</p>
			<span>{epi.pubDate?.toDate().toLocaleDateString()}</span>
			<div>
				<button on:click={() => playNow(epi)}>Play</button>
				<button on:click={() => addToEndOfNowPlaying(epi)}>+End</button>
				<button on:click={() => addToFrontOfNowPlaying(epi)}>+Front</button>
				<button on:click={() => skipThisEpisode(epi)}>Skip</button>
			</div>
		</div>
	{/each}
</ul>
