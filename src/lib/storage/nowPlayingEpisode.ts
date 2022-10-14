import type { Episode } from '../episode';
import { writableStore } from './utils';

export const nowPlayingEpisode = writableStore<Episode | undefined>('nowPlayingEpisode', undefined);
