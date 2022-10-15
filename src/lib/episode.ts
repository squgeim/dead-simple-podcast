import dayjs from 'dayjs';
import { get } from 'svelte/store';
import type { Podcast } from './podcast';
import { nowPlayingEpisode } from './storage/nowPlayingEpisode';
import { nowPlayingQueue } from './storage/nowPlayingQueue';

export class Episode {
	#item: Element;
	_pubDate?: dayjs.Dayjs;
	readonly id?: string;
	readonly pubDateStr?: string;
	readonly title?: string;
	readonly desc?: string;
	readonly subtitle?: string;
	readonly explicit?: boolean;
	readonly mediaUrl?: string;
	readonly podcastUrl: string;

	get isPlaying() {
		return get(nowPlayingEpisode) === this;
	}

	getPodcast(subscriptions: Podcast[]) {
		return subscriptions.find((p) => p.feedUrl === this.podcastUrl);
	}

	get pubDate() {
		if (!this._pubDate || typeof this._pubDate === 'string') {
			this._pubDate = dayjs(this.pubDateStr);
		}
		return this._pubDate;
	}

	constructor(item: Element, podcast: Podcast) {
		this.#item = item;
		this.podcastUrl = podcast.feedUrl;
		for (const child of item.children) {
			switch (child.nodeName) {
				case 'guid':
					this.id = child.textContent ?? '';
					break;
				case 'pubDate':
					this.pubDateStr = child.textContent ?? '';
					break;
				case 'title':
					this.title = child.textContent ?? '';
					break;
				case 'description':
					this.desc = child.innerHTML;
					break;
				case 'itunes:subtitle':
					this.subtitle = child.textContent ?? '';
					break;
				case 'explicit':
					this.explicit = child.textContent === 'yes';
					break;
				case 'enclosure':
					this.mediaUrl = child.getAttribute('url') ?? '';
					break;
			}
		}
	}

	play() {
		nowPlayingEpisode.update(() => this);
	}

	addToNowPlaying(placement: 'start' | 'shuffle' | 'end') {
		nowPlayingQueue.update((queue) => {
			if (queue.find((epi) => epi.id === this.id)) {
				return queue;
			}

			return placement === 'end' ? [...queue, this] : [this, ...queue];
		});
	}
}
