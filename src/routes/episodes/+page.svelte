<script>
	import { getEpisodes } from '$lib/episodes';
	import { addEpisodeToNowPlaying, ignoreEpisode, setNowPlayingEpisode, store } from '$lib/storage';
	let page = 1;
	let episodes = getEpisodes($store.podcasts, page);

	/**
	 * @param {import("$lib/episode").Episode} episode
	 */
	function addToFrontOfNowPlaying(episode) {
		addEpisodeToNowPlaying(episode, 'start');
	}
	/**
	 * @param {import("$lib/episode").Episode} episode
	 */
	function addToEndOfNowPlaying(episode) {
		addEpisodeToNowPlaying(episode, 'end');
	}
	/**
	 * @param {import("$lib/episode").Episode} episode
	 */
	function skipThisEpisode(episode) {
		ignoreEpisode(episode);
	}
	/**
	 * @param {import("$lib/episode").Episode} episode
	 */
	function playNow(episode) {
		setNowPlayingEpisode(episode);
	}
</script>

<ul>
	{#each episodes as epi}
	<li>
		<img src={epi.podcast.thumbUrl} alt="" />
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
	</li>
	{/each}
</ul>

<style>
	ul, li {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	li {
		display: grid;
		align-items: center;
		grid-template-columns: 1fr 11fr;
		gap: 1em;
	}

	li img {
		width: 100%;
	}
</style>
