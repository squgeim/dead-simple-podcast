<script>
	import { goto } from '$app/navigation';
	import { isSubscribed, subscribeToPodcast, unsubscribeFromPodcast } from '$lib/storage';

	/**
	 * @type {import('$lib/podcast').Podcast}
	 */
	export let podcast;

	function handleSubscribe() {
		if (podcast) {
			subscribeToPodcast(podcast);
			goto('/subscriptions');
		}
	}

	function handleUnsubscribe() {
		if (podcast) {
			unsubscribeFromPodcast(podcast);
		}
	}
</script>

<div class="root">
	<img src={podcast.thumbUrl} alt="" />
	<div>
		<h3>{podcast.title}</h3>
		<p>{podcast.description}</p>
		{#if isSubscribed(podcast)}
			<button on:click={handleUnsubscribe}>Unsubscribe</button>
		{:else}
			<button on:click={handleSubscribe}>Subscribe</button>
		{/if}
	</div>
</div>

<style>
	.root {
		display: grid;
		grid-template-columns: 1fr 3fr;
	}

	img {
		width: 100%;
	}
</style>
