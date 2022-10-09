<script>
import { Podcast } from '$lib/podcast';

/**
 * @type {Podcast | undefined}
 */
let podcast = undefined;
let rssUrl = "";

function handleFormSubmit() {
	new Podcast(rssUrl)
		.fetchFeed()
		.then((_podcast) => {
			podcast = _podcast;
		});
}
</script>

<h1>Add Podcast</h1>
<form on:submit|preventDefault={handleFormSubmit}>
	<label>
		Enter the URL to the RSS feed of the podcast here:<br/>
		<input type="text" name="rss-url" bind:value={rssUrl} />
	</label>
</form>

{#if podcast}
<div>
	{podcast.title}<br/>
	{podcast.description}
</div>
{/if}
