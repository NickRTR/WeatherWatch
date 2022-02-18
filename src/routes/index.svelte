<script context="module">
	export async function load() {
        let res;
        try {
		    res = await fetch("https://api.adviceslip.com/advice"); 
        } catch (error) {
            return {
                props: {
                    advice: "No internet connection!"
                }
            }
        }
		const data = await res.json();

		return {
            props: {
                advice: data.slip.advice
            }
        }
	}
</script>

<script>
    // components
    import Switch from '$lib/components/Switch.svelte';
    import MainCard from "$lib/components/MainCard.svelte";
    import ForecastMainCard from "$lib/components/ForecastMainCard.svelte";
    import Card from "$lib/components/Card.svelte";
    import Astro from "$lib/components/Astro.svelte";
    import Air from '$lib/components/Air.svelte';
    import DailyAdvice from '$lib/components/DailyAdvice.svelte';
    // import View from '$lib/components/View.svelte';

    // tools
    import { conditions } from "$lib/conditions.js";
    import { browser } from "$app/env";
    import { selectTextOnFocus } from "$lib/selectText.js";
    import { slide } from "svelte/transition";
    
    // export variables
    export let advice;

    let API_KEY = import.meta.env.VITE_API_KEY;
    // if production, get KEY from Vercel
    if (process.env.NODE_ENV === 'production') {
        API_KEY = process.env.API_KEY;
    }

    // variables
    let loc = browser ? localStorage.getItem("location") : "New York"; // get/save location name from/to localStorage
    let forecastType = 0;

    // get/set preffered unit from/to localStorage
    let unit = browser ? localStorage.getItem("unit") : "Metric";
    $: if (browser) {
        if (unit === null) {
            unit = "Metric";
        }
        localStorage.setItem("unit", unit);
    }

    let showFav = false;
    // get favourites from localStorage
    let favourites = browser ? JSON.parse(localStorage.getItem("fav")) : [];
    $: if (browser) {
        if (favourites === null) {
            favourites = [];
        }
        localStorage.setItem("fav", JSON.stringify(favourites)); // if now favourites stored, store empty Array
    }

    // on Input: fetch suggestions from API
    let suggestions = [];
    async function getSuggestions() {
        // If Input is empty or just spaces, don't show suggestions
        if (loc.match(/^ *$/) !== null) {
            return;
        }
        const res = await fetch(`https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${loc}`);
        if (res.ok) {
            const result = await res.json();
  		    suggestions = result;
            suggestions.length = (suggestions.length === 10) ? 5 : 0; 
		} else {
			throw new Error(await res.json());
		}
    }

    // fetch weather data
    let promise = getWeather();
    async function getWeather() {
        suggestions = []; 
        showFav = false;
        loc = (loc === null) ? "New York" : loc;
        const res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${loc}&days=3&aqi=yes`);
        if (res.ok) {
            const result = await res.json();
            loc = result.location.name;
            localStorage.setItem("location", `${result.location.name} ${result.location.region}`);
  		    return result;
		} else {
			throw new Error(await res.json());
		}
    }

    // go through all possible conditions and get the fitting according to the weather code
    const getSymbol = (code) => {
        for (const condition in conditions) {
            if (conditions[condition].includes(code)) {
                return condition;
            }
        }
        // return code;
    }

    // forecast
    let showForeCastMainCard = false;

    let forecastDetails = {
        data: "",
        time: ""
    };

    // get correct forecast for specific day
    const getForecast = (result, day) => {
        let now = result.location.localtime.substr(11, 2).replace(":", ""); // filter only hour from time and replace : for one digit times like 6:40
        let forecast = result.forecast.forecastday[day].hour; // weather report per hour
        let forecastArray = [];
        if (day === 0) {
            for (let i = Number(now) + 1; i < 24; i++) {
                forecastArray.push(forecast[i]);
            }
            return forecastArray;
        } else {
            return forecast;
        }
    }

    // add favourite to favourite list and save to localStorage
    const addFav = (name, region) => {
        let location = region ? `${name}, ${region}` : name; // only display region if there
        for (let i in favourites) {
            if (favourites[i] === location) {
                alert("You already saved this location!");
                return; 
            }
        }
        favourites = [...favourites, location];
        localStorage.setItem("fav", JSON.stringify(favourites));
        showFav = true; 
    }

    const deleteFav = (id) => {
        favourites.splice(id, 1);
        favourites = favourites;
        localStorage.setItem("fav", JSON.stringify(favourites));
    }
</script>

<body>
    <h1>Weatherwatch</h1>

    <div class="unit" style="margin-bottom: .6rem;">
        <Switch bind:value={unit} label="" design="multi" options={['Metric', 'Imperial']} fontSize={18}/>
    </div>

    <form>
        <input type="text" placeholder="Enter Location" bind:value={loc} on:input={getSuggestions} use:selectTextOnFocus>
        <button type="submit" on:click|preventDefault={() => {promise = getWeather()}}>Load</button>
        <img class="favButton" src="star.svg" alt="star" title="favourites" on:click={() => {showFav = !showFav}}>
    </form>

    <div class="suggestions">
        {#each suggestions as suggestion}
            <p on:click={() => {loc = suggestion.name; promise = getWeather()}}>{suggestion.name}</p>
        {/each}
    </div>

    {#if showFav}
        <div class="fav gradient">
            <img class="favButton" src="star.svg" alt="star"  title="favourites">
            {#each favourites as favourite, id}
                <div class="favItem" style="display: flex; justify-content: center; margin-bottom: .25rem">
                    <p style="text-decoration: underline;" on:click={() => {loc = favourite; promise = getWeather()}}>{favourite}</p>
                    <button type="button" on:click={() => {deleteFav(id)}}>X</button>
                </div>
            {:else}
                <p>No favourites, add one with the "+" in your Main card.</p>
            {/each}
        </div>
    {/if}

    {#await promise}
        <p>Lade Wetter ...</p>
    {:then data} 
        <div class="cards" style="margin: 1rem;">
            <MainCard data={data.current} symbol={getSymbol(data.current.condition.code)} {unit} location={data.location} on:click={() => {addFav(data.location.name, data.location.region)}}></MainCard>

            <div class="forecastnav">
                <p class:selected="{forecastType === 0}" on:click={() => {forecastType = 0}}>Today</p>
                <p class:selected="{forecastType === 1}" on:click={() => {forecastType = 1}}>Tomorrow</p>
                <p class:selected="{forecastType === 2}" on:click={() => {forecastType = 2}}>Overmorrow</p>
            </div>
            <div class="forecast">
                {#each getForecast(data, forecastType) as forecastData}
                    <Card {forecastData} {unit} symbol={getSymbol(forecastData.condition.code)} on:click={() => {forecastDetails.data = forecastData; forecastDetails.time = forecastData.time; showForeCastMainCard = true}}></Card>
                {/each}
            </div>

            {#if showForeCastMainCard}
                <div class="forecastMainCard" transition:slide>
                    <ForecastMainCard time={forecastDetails.time} data={forecastDetails.data} symbol={getSymbol(forecastDetails.data.condition.code)} {unit} on:click={() => {showForeCastMainCard = false}} />
                </div>
            {/if}

            <Astro {data}></Astro>
            <Air uv={data.current.uv} quality={data.current.air_quality["us-epa-index"]}></Air>
            <!-- <View {unit} data={data.current}></View> -->
            <DailyAdvice {advice}></DailyAdvice>
        </div>
    {:catch error}
        <p class="error" style="color: red; margin-top: .5rem">Error: Could not load weather data. Please refresh!</p>
    {/await}
</body>

<style>
    h1 {
        margin: .8rem 0;
        color: var(--accent);
    }

    form {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    input {
        max-width: 200px;
        width: 50%;
        border: none;
        border-radius: 1rem;
        font-size: 1rem;
        padding: .3rem .5rem;
    }

    button[type=submit] {
        border: none;
        font-size: 1rem;
        padding: .3rem .5rem;
        border-radius: 1rem;
        margin: 0 .4rem;
    }

    .favButton {
        width: 2rem;
    }

    .fav {
        padding: .5rem .5rem;
        margin: 0 1rem;
        margin-top: 1rem;
    }

    .fav button {
        border: none;
        border-radius: 1rem;
        background-color: red;
        color: white;
        margin-left: .2rem;
        cursor: pointer;
    }

    p {
        margin: 0;
    }

    .suggestions {
        margin-top: .5rem;
}

    .suggestions p {
        cursor: pointer;
        text-decoration: underline;
    }

    .forecastnav {
        display: flex;
        text-align: left;
    }

    .forecastnav p {
        margin: 1rem .5rem;
        font-size: 1.2rem;
        cursor: pointer;
    }

    .selected {
        color: var(--accent);
    }

    .forecast {
        display: flex;
        overflow-x: scoll;
        overflow-y: hidden;
        white-space: nowrap;
        margin-bottom: .5rem;
    }

    /* Scroll Bar */

    /* width */
    ::-webkit-scrollbar {
        width: 20px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px grey;
        border-radius: 10px;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: var(--accent);
        border-radius: 10px;
    }
</style>