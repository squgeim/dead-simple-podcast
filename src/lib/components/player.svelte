<script>
	import {nowPlayingEpisode as epi} from "$lib/storage/nowPlayingEpisode";
	import {subscriptions} from "$lib/storage/subscriptions";

	/**
	 * @type {HTMLAudioElement}
	 */
	let audioElem;

	function handleCanPlay() {
		if ($epi.isPlaying) {
			audioElem.play();
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
		<audio src={$epi.mediaUrl} controls bind:this={audioElem} on:canplay={handleCanPlay}></audio>
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
