<script>
    // packages
    import {conditions} from "$lib/conditions.js";
    import {selectTextOnFocus} from "$lib/components/inputDirectives.js";
    import Switch from '$lib/components/Switch.svelte';
    import MainCard from "$lib/components/MainCard.svelte";
    import Card from "$lib/components/Card.svelte";

    // tools
    import {browser} from "$app/env";
import { dataset_dev } from "svelte/internal";

    // variables
    const key = "bba81dedf0f34bda955161436221701";
    let symbol = "";
    let loc = browser ? localStorage.getItem("location") : "New York"; // get/save location name from/to localStorage
    let displayLocation = ""; // whole location data for region print

    // get/set preffered unit from/to localStorage
    let unit = browser ? localStorage.getItem("unit") : "Metric";
    $: if (browser) {
        if (unit === null) {
            unit = "Metric";
        }
        localStorage.setItem("unit", unit);
    }

    // on Input: fetch suggestions from API
    let suggestions = [];
    async function getSuggestions() {
        // If Input is empty or just spaces, don't show suggestions
        if (loc.match(/^ *$/) !== null) {
            return;
        }
        const res = await fetch(`https://api.weatherapi.com/v1/search.json?key=${key}&q=${loc}`);
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
        loc = (loc === null) ? "New York" : loc;
        const res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${loc}`);
        if (res.ok) {
            const result = await res.json();
            console.log(result);
            loc = result.location.name;
            displayLocation = result.location;
            getSymbol(result.current.condition.code); // get weather symbol
            localStorage.setItem("location", loc);
  		    return result;
		} else {
			throw new Error(await res.json());
		}
    }

    // go through all possible conditions and get the fitting according to the weather code
    const getSymbol = (code) => {
        for (const condition in conditions) {
            if (conditions[condition].includes(code)) {
                symbol = condition;
                return symbol;
            }
        }
    }
</script>

<body>
    <h1>Weatherwatch</h1>

    <div class="unit">
        <Switch bind:value={unit} label="" design="multi" options={['Metric', 'Imperial']} fontSize={18}/>
    </div>

    <form>
        <input type="text" placeholder="Enter Location" bind:value={loc} on:input={getSuggestions} use:selectTextOnFocus>
        <button type="submit" on:click|preventDefault={() => {promise = getWeather()}}>Load</button>
    </form>

    <div class="suggestions">
        {#each suggestions as suggestion}
            <p on:click|preventDefault={() => {loc = suggestion.name; promise = getWeather()}}>{suggestion.name}</p>
        {/each}
    </div>

    {#await promise}
        <p>Lade Wetter ...</p>
    {:then data} 
        <div class="cards">
            <MainCard data={data.current} {symbol} {unit} location={data.location}></MainCard>

            <div class="forecastnav">
                <p style="color: #FF9700;">Today</p>
                <p>Tomorrow</p>
                <p>next 7 days</p>
            </div>
            <div class="forecast">
                {#each data.forecast.forecastday[0].hour as data}
                    <Card {data} {unit} symbol={getSymbol(data.condition.code)}></Card>
                {/each}
            </div>
        </div>
    {:catch error}
        <p class="error">Error: Ort nicht vorhanden.</p>
    {/await}
</body>

<style>
    h1 {
        margin: .8rem 0;
        letter-spacing: .1rem;
        color: #FF9700;
    }

    .unit {
        margin-bottom: .8rem;
    }

    input {
        border: none;
        border-radius: 1rem;
        font-size: 1rem;
        padding: .3rem .5rem;
    }

    button {
        border: none;
        font-size: 1rem;
        padding: .3rem .5rem;
        border-radius: 1rem;
    }

    p {
        margin: 0
    }

    .suggestions {
        margin-top: .5rem;
}

    .suggestions p {
        cursor: pointer;
        text-decoration: underline;
    }

    .cards {
        margin: 1rem;
    }

    .forecastnav {
        display: flex;
        text-align: left;
    }

    .forecastnav p {
        margin: 1rem .5rem;
        font-size: 1.2rem;
    }

    .forecast {
        display: flex;
        overflow-x: scoll;
        overflow-y: hidden;
        white-space: nowrap;
    }

    .error {
        color: red;
        margin-top: .5rem;
    }

    /* Responsive Design */
    
    @media only screen and (max-width: 450px) {
        .cards {
            grid-template-columns: 1fr;
        }
    }
</style>