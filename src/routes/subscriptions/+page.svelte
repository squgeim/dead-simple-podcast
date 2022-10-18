<script>
	import Thumbnail from '$lib/components/thumbnail.svelte';
	import {subscriptions} from "$lib/storage/subscriptions";
</script>

{#each $subscriptions as pod}
	<Thumbnail podcast={pod}/>
{/each}
