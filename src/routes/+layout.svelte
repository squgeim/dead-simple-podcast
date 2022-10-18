<script>
	import Player from '$lib/components/player.svelte';
</script>

<div class="root">
	<div class="top">
		<h1>Dead Simple Podcast Player</h1>
		<nav>
			<a href="/">Now Playing</a>
			<a href="/episodes">Episodes</a>
			<a href="/subscriptions">Subscriptions</a>
			<a href="/add">Add Podcast</a>
		</nav>
	</div>

	<div class="page">
		<slot/>
	</div>

	<div class="player">
		<Player/>
	</div>
</div>

<style>
	:global(body) {
		margin: 0;
		font-family: sans-serif;
	}

	.top {
		position: sticky;
		background: white;
		top: 0;
	}

	.player {
		position: sticky;
		bottom: 0;
	}

	.page {
		min-height: 100vh;
	}
</style>
