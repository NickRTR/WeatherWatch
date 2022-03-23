// import { API_KEY } from "$lib/api";

import dotenv from 'dotenv'
dotenv.config()

const API_KEY = process.env.VITE_API_KEY;

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