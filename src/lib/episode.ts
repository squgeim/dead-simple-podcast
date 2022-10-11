import dayjs from 'dayjs';
import type { Podcast } from './podcast';

export class Episode {
	#item: Element;
	readonly pubDate?: dayjs.Dayjs;
	readonly title?: string;
	readonly desc?: string;
	readonly subtitle?: string;
	readonly explicit?: boolean;
	readonly mediaUrl?: string;
	podcast: Podcast;
	isPlaying = false;

	constructor(item: Element, podcast: Podcast) {
		this.#item = item;
		this.podcast = podcast;
		for (const child of item.children) {
			switch (child.nodeName) {
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
					this.explicit = child.textContent === 'yes' ? true : false;
					break;
				case 'enclosure':
					this.mediaUrl = child.getAttribute('url') ?? '';
			}
		}
	}
}
