<script>
	import Player from '../lib/player/index.svelte';
</script>

<h1>Dead Simple Podcast Player</h1>
<nav>
	<a href="/">Now Playing</a>
	<a href="/episodes">Episodes</a>
	<a href="/subscriptions">Subscriptions</a>
	<a href="/add">Add Podcast</a>
</nav>

<slot />

<Player />
