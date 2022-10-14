import { writableStore } from './utils';
import type { Episode } from '../episode';

export const nowPlayingQueue = writableStore<Episode[]>('nowPlayingQueue', []);
