import { get, writable } from 'svelte/store';
import type { Episode } from './episode';

import { Podcast, type StoredPodcast } from './podcast';

type Store = {
	podcasts: Podcast[];
	nowPlaying?: Episode;
};

export const store = writable<Store>(readFromStorage());

function readFromStorage(): Store {
	if (typeof window === 'undefined') return { podcasts: [] };

	const _store: { podcasts: StoredPodcast[] } = JSON.parse(
		localStorage.getItem('DSPP_STORE') ?? '{ "podcasts": [] }',
	);

	return {
		podcasts: _store.podcasts.map((p) => Podcast.hydrate(p)),
	};
}

function writeToStorage(_store: Store) {
	if (typeof window === 'undefined') return;

	const podcasts = _store.podcasts.map((p) => p.marshall());
	localStorage.setItem('DSPP_STORE', JSON.stringify({ podcasts }));
}

export function subscribeToPodcast(podcast: Podcast) {
	store.update((_store) => {
		const podcasts = _store.podcasts;

		if (podcasts.find((p) => p.id === podcast.id)) {
			// Already subscribed!
			return _store;
		}

		const newPodcasts = [...podcasts, podcast];
		return {
			..._store,
			podcasts: newPodcasts,
		};
	});
}

export function unsubscribeFromPodcast(podcast: Podcast) {
	store.update((_store) => {
		const newPodcasts = _store.podcasts.filter((p) => p.id !== podcast.id);
		return {
			..._store,
			podcasts: newPodcasts,
		};
	});
}

export function addEpisodeToNowPlaying(episode: Episode, placement: 'start' | 'end') {}

export function ignoreEpisode(episode: Episode) {}

export function setNowPlayingEpisode(episode: Episode) {
	episode.isPlaying = true;
	store.update((_store) => {
		return {
			..._store,
			nowPlaying: episode,
		};
	});
}

export function isSubscribed(podcast: Podcast) {
	return !!get(store).podcasts.find((p) => p.id === podcast.id);
}

store.subscribe((_store) => {
	console.log('STORE UPDATED', _store);
	writeToStorage(_store);
});
