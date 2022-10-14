<script>
	import Thumbnail from '$lib/components/thumbnail.svelte';
	import {subscriptions} from "$lib/storage/subscriptions";
</script>

<h1>Subscriptions</h1>
{#each $subscriptions as pod}
	<Thumbnail podcast={pod}/>
{/each}
