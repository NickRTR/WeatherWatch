export async function load() {
	let res;
	try {
		res = await fetch("https://api.adviceslip.com/advice");
	} catch (error) {
		return {
			advice: "No internet connection!"
		};
	}
	const data = await res.json();

	return {
		advice: data.slip.advice
	};
}
