import { type HydrateFn, writableStore } from './utils';
import { Podcast, type StoredPodcast } from '../podcast';

const hydrate: HydrateFn<Podcast[]> = (val: string) =>
	(JSON.parse(val) as StoredPodcast[]).map((p) => Podcast.hydrate(p));

export const subscriptions = writableStore<Podcast[]>('subscriptions', [], hydrate);
