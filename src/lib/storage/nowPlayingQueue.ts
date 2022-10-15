import { type HydrateFn, writableStore } from './utils';
import { Episode } from '../episode';

const hydrate: HydrateFn<Episode[]> = (val: string) =>
	val ? JSON.parse(val).map((o: Episode) => Object.assign(Episode.prototype, o)) : [];

export const nowPlayingQueue = writableStore<Episode[]>('nowPlayingQueue', [], hydrate);
