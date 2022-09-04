import { API_KEY } from "$lib/api";

export async function GET({ params }) {
	const result = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${params.search}&days=3&aqi=yes`);
	let data = await result.json();

	if (result.ok) {
		return new Response(JSON.stringify({ data }));
	} else {
		return new Response(JSON.stringify({ error: "Error while fetching weather." }));
	}
}
