import dayjs from 'dayjs';
import { get } from 'svelte/store';
import type { Podcast } from './podcast';
import { nowPlayingEpisode } from './storage/nowPlayingEpisode';
import { nowPlayingQueue } from './storage/nowPlayingQueue';

export class Episode {
	#item: Element;
	readonly id?: string;
	readonly pubDate?: dayjs.Dayjs;
	readonly title?: string;
	readonly desc?: string;
	readonly subtitle?: string;
	readonly explicit?: boolean;
	readonly mediaUrl?: string;
	podcast: Podcast;

	get isPlaying() {
		return get(nowPlayingEpisode) === this;
	}

	constructor(item: Element, podcast: Podcast) {
		this.#item = item;
		this.podcast = podcast;
		for (const child of item.children) {
			switch (child.nodeName) {
				case 'guid':
					this.id = child.textContent ?? '';
					break;
				case 'pubDate':
					this.pubDate = dayjs(child.textContent);
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
			}
		}
	}

	play() {
		nowPlayingEpisode.update(() => this);
	}

	addToNowPlaying(placement: 'start' | 'shuffle' | 'end') {
		nowPlayingQueue.update((queue) => {
			if (placement === 'end') {
				return Array.from(new Set([...queue, this]));
			}

			return Array.from(new Set([this, ...queue]));
		});
	}
}
