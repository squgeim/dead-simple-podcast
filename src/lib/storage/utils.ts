import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';
import * as localforage from 'localforage';

const storage = localforage.createInstance({
	driver: localforage.INDEXEDDB,
});

export type HydrateFn<T> = (val: string) => T;

const key = (name: string) => `DSPP_${name}`;

function safeParse<T>(val: string): T | undefined {
	try {
		return JSON.parse(val ?? '') as T;
	} catch {
		return undefined;
	}
}

async function getDefaultFromStorage<T>(name: string, defaultValue: T, hydrate?: HydrateFn<T>) {
	if (typeof window === 'undefined') return defaultValue;

	const val = await storage.getItem<string>(key(name));

	if (!val) {
		return defaultValue;
	}

	if (hydrate) {
		return hydrate(val);
	}

	return safeParse<T>(val) ?? defaultValue;
}

async function setValueToStorage<T>(name: string, value: T) {
	if (typeof window === 'undefined') return;
	await storage.setItem(key(name), JSON.stringify(value));
}

export function writableStore<T>(
	name: string,
	defaultValue: T,
	hydrate?: HydrateFn<T>,
): Writable<T> {
	const store = writable(defaultValue);

	getDefaultFromStorage<T>(name, defaultValue, hydrate).then((val) => store.update(() => val));
	store.subscribe((val) => setValueToStorage(name, val));

	return store;
}
