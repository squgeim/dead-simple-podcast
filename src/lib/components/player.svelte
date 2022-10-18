<script>
	import {nowPlayingEpisode as epi} from "$lib/storage/nowPlayingEpisode";
	import {subscriptions} from "$lib/storage/subscriptions";
	import {nowPlayingQueue} from "$lib/storage/nowPlayingQueue";

	/**
	 * @type {HTMLAudioElement}
	 */
	let audioElem;

	function handleEnded() {
		const queue = $nowPlayingQueue;
		const currentPosition = queue.findIndex(e => e.id === $epi.id);
		const next = queue[currentPosition + 1];
		if (next) {
			next.play();
		}
	}
</script>

{#if $epi}
	<div class="root">
		<div>
			<img src={$epi.getPodcast($subscriptions)?.thumbUrl} alt=""/>
			<div>
				<h3>{$epi.title}</h3>
				<p>{$epi.getPodcast($subscriptions)?.title}</p>
			</div>
		</div>
		<audio
			src={$epi.mediaUrl}
			controls
			autoplay
			bind:this={audioElem}
			on:ended={handleEnded}
		></audio>
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
