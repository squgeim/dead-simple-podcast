import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
	const rssUrl = url.searchParams.get('url');

	if (!rssUrl) {
		return new Response('url is required', { status: 400 });
	}

	const feed = await fetch(rssUrl).then((res) => res.text());

	return new Response(feed, { headers: { 'Content-type': 'text/xml' } });
};
