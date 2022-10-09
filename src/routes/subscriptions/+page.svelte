<script>
	import Thumbnail from '$lib/components/thumbnail.svelte';
	import { store } from '$lib/storage';
</script>

<h1>Subscriptions</h1>
{#each $store.podcasts as pod}
	<Thumbnail podcast={pod} />
{/each}
