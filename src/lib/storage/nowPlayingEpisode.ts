import { Episode } from '../episode';
import { type HydrateFn, writableStore } from './utils';

const hydrate: HydrateFn<Episode | undefined> = (val: string) =>
	val ? Object.assign(Episode.prototype, JSON.parse(val)) : undefined;

export const nowPlayingEpisode = writableStore<Episode | undefined>(
	'nowPlayingEpisode',
	undefined,
	hydrate,
);
