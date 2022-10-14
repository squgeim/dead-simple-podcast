<script>
	/**
	 * @type import('$lib/episode.ts').Episode
	 */
	export let episode;

	function handlePlay() {
		episode.play();
	}

	function handleAddToStart() {
		episode.addToNowPlaying('start');
	}

	function handleShuffleIn() {
		episode.addToNowPlaying('shuffle');
	}

	function handleAddToEnd() {
		episode.addToNowPlaying('end');
	}

	function handleSkip() {
	}
</script>

<div class="root">
	<img src={episode.podcast.thumbUrl} alt=""/>
	<div>
		<h2>{episode.title}</h2>
		<p>{episode.subtitle}</p>
		<span>{episode.pubDate?.toDate().toLocaleDateString()}</span>
		<div>
			<button on:click={handlePlay}>Play</button>
			<button on:click={handleAddToStart}>+Front</button>
			<button on:click={handleShuffleIn}>+Shuffle In</button>
			<button on:click={handleAddToEnd}>+End</button>
			<button on:click={handleSkip}>Skip</button>
		</div>
	</div>
</div>

<style>
	.root {
		display: grid;
		align-items: center;
		grid-template-columns: 1fr 11fr;
		gap: 1em;
	}

	.root img {
		width: 100%;
	}
</style>