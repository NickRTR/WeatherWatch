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
    import { theme } from "$lib/stores";
    import { getHoursFromDate, getHoursFromTime } from "$lib/time";
    import { onMount } from 'svelte';
    
    // export variables
    export let advice;

    // variables   
    let location = "Fetching Location...";
    let forecastType = 0;
    let astro;

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
        if (location.match(/^ *$/) !== null) {
            return;
        }
        const res = await fetch(`/api/suggestion/${location}.json`);
        if (res.ok) {
            const result = await res.json();
  		    suggestions = result;
            suggestions.length = (suggestions.length === 10) ? 5 : 0; 
		} else {
			throw new Error(await res.json());
		}
    }

    onMount(() => {
        location = localStorage.getItem("location") || "New York";
        promise = getWeather();
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                location = `${position.coords.latitude},${position.coords.longitude}`;
                promise = getWeather();
            });
        } else {
            alert("Geolocation not available!");
        }
    })
    
    // fetch weather data
    let promise = new Promise(() => {});
    async function getWeather() {
        suggestions = []; 
        showFav = false;
        let res = await fetch(`/api/${location}.json`);
        if (res.ok) {
            const result = await res.json();
            location = result.location.name;
            astro = result.forecast.forecastday[0].astro;
            localStorage.setItem("location", `${result.location.name} ${result.location.region}`);
  		    return result;
		} else {
			throw new Error(await res.json());
		}
    }

    // go through all possible conditions and get the fitting according to the weather code
    const getSymbol = (code, hours) => {
        for (const condition in conditions) {
            if (conditions[condition].includes(code)) {
                if (hours < parseInt(getHoursFromTime(astro.sunrise)) || hours > parseInt(getHoursFromTime(astro.sunset)) + 12) { // return available night icons if it's night
                    switch (condition) {
                        case "sun":
                            return "night sun"
                        case "partly cloudy":
                            return "night partly cloudy"
                        case "cloudy":
                            return "night cloudy"
                        default:
                            return condition;
                    }
                }
                return condition;
            }
        }
    }

    // forecast
    let showForeCastMainCard = false;

    let forecastDetails = {
        data: "",
        time: ""
    };

    // get correct forecast for specific day
    const getForecast = (result, day) => {
        let now = getHoursFromDate(result.location.localtime);
        let forecast = result.forecast.forecastday[day].hour; // weather report per hour
        let forecastArray = [];
        if (day === 0) {
            for (let i = Number(now) + 1; i < 24; i++) {
                forecastArray.push(forecast[i]);
            }
            // if it's after 23:00 but before the next day, display the forecast for 23:00
            if (forecastArray.length === 0) return [forecast[23]];
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

    const changeTheme = () => {
        if ($theme === "light") {
            theme.set("dark");
        } else {
            theme.set("light");
        }
        localStorage.setItem("theme", $theme);
    }
</script>

<body>
    <header>
        <h1 on:click={changeTheme}>Weatherwatch</h1>
        <div class="toggleAppeareance">
            <input type="checkbox" name="toggleAppeareance" id="toggleAppeareance" on:change={changeTheme} checked={$theme === "light" ? true : false}>
            <label for="toggleAppeareance">
                {#if $theme === "light"}
                    <p class="light">🌞</p>
                {:else if $theme === "dark"}
                    <p class="dark">🌙</p>
                {/if}
            </label>
        </div>
    </header>

    <div class="unit backgroundFont" style="margin-bottom: .6rem;">
        <Switch bind:value={unit} label="" design="multi" options={['Metric', 'Imperial']} fontSize={18}/>
    </div>

    <form>
        <input type="text" placeholder="Enter Location" bind:value={location} on:input={getSuggestions} use:selectTextOnFocus>
        <button type="submit" on:click|preventDefault={() => {promise = getWeather()}}>Load</button>
        <img class="favButton" src="/ui/star.svg" alt="star" title="favourites" on:click={() => {showFav = !showFav}}>
    </form>

    <div class="suggestions">
        {#each suggestions as suggestion}
            <p class="backgroundFont" on:click={() => {location = suggestion.name; promise = getWeather()}}>{suggestion.name}</p>
        {/each}
    </div>

    {#if showFav}
        <div class="fav gradient" transition:slide>
            {#each favourites as favourite, id}
                <div class="favItem" style="display: flex; justify-content: center; margin-bottom: .25rem">
                    <p style="text-decoration: underline; cursor: pointer;" on:click={() => {location = favourite; promise = getWeather()}}>{favourite}</p>
                    <button type="button" on:click={() => {deleteFav(id)}}>X</button>
                </div>
            {:else}
                <p>No favourites, add one with the "+" in your Main card.</p>
            {/each}
        </div>
    {/if}

    {#await promise}
        <p class="backgroundFont">Lade Wetter ...</p>
    {:then data} 
        <div class="cards" style="margin: 1rem;">
            <MainCard data={data} symbol={getSymbol(data.current.condition.code, new Date().getHours())} {unit} location={data.location} on:click={() => {addFav(data.location.name, data.location.region)}}></MainCard>

            <div class="forecastnav">
                <p class="backgroundFont" class:selected="{forecastType === 0}" on:click={() => {forecastType = 0}}>Today</p>
                <p class="backgroundFont" class:selected="{forecastType === 1}" on:click={() => {forecastType = 1}}>Tomorrow</p>
                <p class="backgroundFont" class:selected="{forecastType === 2}" on:click={() => {forecastType = 2}}>Overmorrow</p>
            </div>
            <div class="forecast">
                {#each getForecast(data, forecastType) as forecastData}
                    <Card {forecastData} {unit} symbol={getSymbol(forecastData.condition.code, getHoursFromDate(forecastData.time))} on:click={() => {forecastDetails.data = forecastData; forecastDetails.time = forecastData.time; showForeCastMainCard = true}}></Card>
                {/each}
            </div>

            {#if showForeCastMainCard}
                <div class="forecastMainCard" transition:slide>
                    <ForecastMainCard time={forecastDetails.time} data={forecastDetails.data} symbol={
                        // @ts-ignore
                        getSymbol(forecastDetails.data.condition.code, getHoursFromDate(forecastDetails.time))
                    } {unit} on:click={() => {showForeCastMainCard = false}} />
                </div>
            {/if}

            <Astro {astro}></Astro>
            <Air uv={data.current.uv} quality={data.current.air_quality["us-epa-index"]}></Air>
            <!-- <View {unit} data={data.current}></View> -->
            <DailyAdvice {advice}></DailyAdvice>
        </div>
    {:catch error}
        <p class="error" style="color: red; margin-top: .5rem">Error: Could not load weather data. Please refresh!</p>
    {/await}
</body>

<style>
    header {
        display: flex;
        justify-content: space-between;
        margin: 0 1rem;
        align-items: center;
    }

    h1 {
        margin: .8rem 0;
        color: var(--accent);
        cursor: pointer;
    }

    .toggleAppeareance input {
        display: none;
    }

    .toggleAppeareance p {
        background-color: var(--color);
        border-radius: 100%;
        font-size: 1.8rem;
        padding: .5rem;
        box-shadow: 0 0 5px 4px var(--accent);
        user-select: none;
        cursor: pointer;
        width: 40px;
        height: 40px;
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
        padding: .5rem;
        margin: 0 1rem;
        margin-top: 1rem;
    }

    .fav button {
        border: none;
        border-radius: 1rem;
        background-color: var(--accent);
        color: var(--font);
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