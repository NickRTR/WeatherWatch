import { API_KEY } from "$lib/api";

export async function GET({ params }) {
	const result = await fetch(`https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${params.location}`);
	let data = await result.json();

	if (result.ok) {
		return new Response(JSON.stringify({ data: data }));
	} else {
		return new Response(JSON.stringify({ error: "Error while fetching weather." }));
	}
}
