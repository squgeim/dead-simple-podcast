<script>
	import {goto} from '$app/navigation';

	/**
	 * @type {import('$lib/podcast').Podcast}
	 */
	export let podcast;

	function handleSubscribe() {
		podcast.subscribe();
		goto('/subscriptions');
	}

	function handleUnsubscribe() {
		podcast.unsubscribe()
	}
</script>

<div class="root">
	<img src={podcast.thumbUrl} alt=""/>
	<div>
		<h3>{podcast.title}</h3>
		<p>{podcast.description}</p>
		{#if podcast.isSubscribed}
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
