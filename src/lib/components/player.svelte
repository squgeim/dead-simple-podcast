<script>
	import {store} from '$lib/storage';

	/**
	 * @type {HTMLAudioElement}
	 */
	let audioElem;

	/**
	 * @type {import('$lib/episode').Episode}
	 */
	let nowPlaying;
	$: nowPlaying = $store.nowPlaying;

	function handleCanPlay() {
		console.log("can play");
		if (nowPlaying.isPlaying) {
			audioElem.play();
		}
	}
</script>

{#if nowPlaying}
	<div class="root">
		<div>
			<img src={nowPlaying.podcast.thumbUrl} alt=""/>
			<div>
				<h3>{nowPlaying.title}</h3>
				<p>{nowPlaying.podcast.title}</p>
			</div>
		</div>
		<audio src={nowPlaying.mediaUrl} controls bind:this={audioElem} on:canplay={handleCanPlay}></audio>
	</div>
{/if}

<style>
	.root {
		background: white;
	}

	.root > div {
		display: grid;
		grid-template-columns: 1fr 8fr;
	}

	img {
		width: 100%;
	}

	audio {
		width: 100%;
	}
</style>
