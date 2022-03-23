let API_KEY = import.meta.env.VITE_API_KEY;
// if production, get KEY from Vercel
if (process.env.NODE_ENV === "production") {
    API_KEY = process.env.API_KEY;
}

console.log("🚀 ~ file: [search].json.js ~ line 2 ~ API_KEY", API_KEY)
export async function get({ params }) {
    const result = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${params.search}&days=3&aqi=yes`);
    let data = await result.json();

    if (result.ok) {
        return {
            status: 200,
            body: data
        }
    } else {
        return {
            status: 404,
        }
    }
}