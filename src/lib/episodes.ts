import dayjs from 'dayjs';
import type { Podcast } from './podcast';

export function getEpisodes(podcasts: Podcast[], page = 1) {
	const episodes = [];
	const endDate = dayjs().subtract(3, 'months');
	for (const pod of podcasts) {
		for (const epi of pod.episodes(endDate)) {
			episodes.push(epi);
		}
	}
	return episodes.sort((a, b) => {
		if (!a.pubDate || !b.pubDate) return 0;
		if (a.pubDate.isSame(b.pubDate)) return 0;
		return a.pubDate.isAfter(b.pubDate) ? -1 : 1;
	});
}
