import type { Dayjs } from 'dayjs';
import { Episode } from './episode';

type PodcastProperty = 'title' | 'thumbUrl' | 'subtitle';

export type StoredPodcast = {
	feedUrl: string;
	rawFeed: string;
};

export class Podcast {
	#parsedFeed?: Document;
	#rawFeed?: string;
	feedUrl: string;
	record: Record<PodcastProperty, string> = {
		title: '',
		thumbUrl: '',
		subtitle: '',
	};

	constructor(feedUrl: string) {
		this.feedUrl = feedUrl;
	}

	get id() {
		return this.feedUrl;
	}

	get title() {
		return this.record.title;
	}

	get thumbUrl() {
		return this.record.thumbUrl;
	}

	get description() {
		return this.record.subtitle;
	}

	*episodes(endDate?: Dayjs) {
		if (!this.#parsedFeed) return null;

		for (const item of this.#parsedFeed.querySelectorAll('item')) {
			const epi = new Episode(item, this);
			if (endDate && endDate.isAfter(epi.pubDate)) {
				return;
			}
			yield epi;
		}
	}

	fetchFeed = async () => {
		const response = await fetch(`/api/rss-feed?url=${this.feedUrl}`);
		this.#rawFeed = await response.text();
		this.#parseFeedFromRaw();
		this.#parseFeedIntoRecord();

		return this;
	};

	#parseFeedFromRaw() {
		if (!this.#rawFeed) return;
		this.#parsedFeed = new window.DOMParser().parseFromString(this.#rawFeed, 'text/xml');
	}

	#parseFeedIntoRecord() {
		if (!this.#parsedFeed) return null;
		const nodes = Array.from(this.#parsedFeed.querySelector('channel')?.children ?? []);

		for (const node of nodes) {
			switch (node.nodeName) {
				case 'title':
					this.record.title = node.textContent ?? '';
					break;
				case 'itunes:subtitle':
					this.record.subtitle = node.textContent ?? '';
					break;
				case 'itunes:image':
					this.record.thumbUrl = node.getAttribute('href') ?? '';
					break;
			}
		}
	}

	static hydrate(storedPodcast: StoredPodcast) {
		const podcast = new Podcast(storedPodcast.feedUrl);
		podcast.#rawFeed = storedPodcast.rawFeed;
		podcast.#parseFeedFromRaw();
		podcast.#parseFeedIntoRecord();
		return podcast;
	}

	marshall = (): StoredPodcast => {
		if (!this.feedUrl || !this.#rawFeed) {
			throw new Error('Cannot marshall Podcast that has not been fetched.');
		}

		return {
			feedUrl: this.feedUrl,
			rawFeed: this.#rawFeed,
		};
	};
}
