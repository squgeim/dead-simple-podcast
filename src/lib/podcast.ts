type PodcastProperty = 'title' | 'thumbUrl' | 'subtitle';

export class Podcast {
	#parsedFeed?: Document;
	feedUrl: string;
	record: Record<PodcastProperty, string | null> = {
		title: null,
		thumbUrl: null,
		subtitle: null
	};

	constructor(feedUrl: string) {
		this.feedUrl = feedUrl;
	}

	get title() {
		if (!this.#parsedFeed) return null;
		return this.record.title;
	}

	get thumbUrl() {
		if (!this.#parsedFeed) return null;
		return this.record.thumbUrl;
	}

	get description() {
		if (!this.#parsedFeed) return null;
		return this.record.subtitle;
	}

	fetchFeed = async () => {
		const response = await fetch(`/api/rss-feed?url=${this.feedUrl}`);
		const str = await response.text();
		console.log(str);
		this.#parsedFeed = new window.DOMParser().parseFromString(str, 'text/xml');
		console.log(this.#parsedFeed);
		this.#parseFeedIntoRecord();

		return this;
	}

	#parseFeedIntoRecord() {
		if (!this.#parsedFeed) return null;
		const nodes = Array.from(this.#parsedFeed.querySelector("channel")?.children ?? []);

		for (const node of nodes) {
			switch (node.nodeName) {
				case 'title':
					this.record.title = node.textContent;
					break;
				case 'itunes:subtitle':
					this.record.subtitle = node.textContent;
					break;
				case 'itunes:image':
					this.record.thumbUrl = node.getAttribute('href');
					break;
			}
		}
	}

	toJSON = () => {
		return JSON.stringify({
			rssFeed: this.feedUrl,
		})
	}
}
