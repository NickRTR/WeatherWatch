<script>
	// components
	import MainCard from "$lib/components/MainCard.svelte";
	import ForecastMainCard from "$lib/components/ForecastMainCard.svelte";
	import Card from "$lib/components/Card.svelte";
	import Astro from "$lib/components/Astro.svelte";
	import Air from "$lib/components/Air.svelte";
	import DailyAdvice from "$lib/components/DailyAdvice.svelte";
	// import View from '$lib/components/View.svelte';

	// tools
	import { slide } from "svelte/transition";
	import { onMount } from "svelte";
	import autoselect from "svelte-autoselect";
	import { theme, unit, favourites, fetchLocation } from "$lib/stores";
	import { getHoursFromDate, getSymbol, addFav, deleteFav, changeTheme, changeUnit, changeFetchLocation } from "$lib/helper";

	export let data;

	// variables
	let location = "fetching location...";
	let forecastDay = 0;
	let astro;

	let showFav = false;

	// on Input: fetch suggestions from API
	let suggestions = [];
	async function getSuggestions() {
		// If Input is empty or just spaces, don't show suggestions
		if (location.match(/^ *$/) !== null) {
			return;
		}
		const res = await fetch(`/api/suggestion/${location}.json`);
		const data = await res.json();

		if (data.error) {
			throw new Error(data.error);
		} else {
			suggestions = data.data;
			suggestions.length = suggestions.length === 10 ? 5 : 0;
		}
	}

	onMount(() => {
		// default to New York at load
		location = localStorage.getItem("location") || "New York";
		weatherData = getWeather();
		if ($fetchLocation === "on") getLocation();
	});

	function getLocation() {
		location = "fetching location...";
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				location = `${position.coords.latitude},${position.coords.longitude}`;
				weatherData = getWeather();
			});
		} else {
			alert("Geolocation not available!");
		}
	}

	$: {
		// If "fetchLocation" switches to "on", fetch location and get weather
		if ($fetchLocation === "on") getLocation();
	}

	let weatherData = new Promise(() => {});
	async function getWeather() {
		showFav = false;
		const res = await fetch(`/api/${location}.json`);
		let data = await res.json();

		if (data.error) {
			throw new Error(data.error);
		} else {
			data = data.data;
			location = data.location.name;
			astro = data.forecast.forecastday[0].astro;
			localStorage.setItem("location", `${data.location.name} ${data.location.region}`);
			return data;
		}
	}

	// forecast
	let showForecastMainCard = false;

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
	};
</script>

<body>
	<header>
		<h1 on:click={changeTheme}>Weatherwatch</h1>
		<aside class="buttons">
			<div class="unit button" title="switch units">
				<input type="checkbox" name="unit" id="unit" on:change={changeUnit} />
				<label for="unit">
					{#if $unit === "Metric"}
						<p>°C</p>
					{:else if $unit === "Imperial"}
						<p>°F</p>
					{/if}
				</label>
			</div>
			<div class="toggleFetchLocation button" title="turn on/off location fetching">
				<input type="checkbox" name="toggleFetchLocation" id="toggleFetchLocation" on:change={changeFetchLocation} />
				<label for="toggleFetchLocation">
					{#if $fetchLocation === "on"}
						<p>📍</p>
					{:else if $fetchLocation === "off"}
						<p class="grayed">📍</p>
					{/if}
				</label>
			</div>
			<div class="toggleAppeareance button" title="light/dark mode">
				<input type="checkbox" name="toggleAppeareance" id="toggleAppeareance" on:change={changeTheme} />
				<label for="toggleAppeareance">
					{#if $theme === "light"}
						<p>🌞</p>
					{:else if $theme === "dark"}
						<p>🌙</p>
					{/if}
				</label>
			</div>
		</aside>
	</header>

	<div class="input">
		<form>
			<input type="text" placeholder="Enter Location" bind:value={location} on:input={getSuggestions} use:autoselect />
			<button
				type="submit"
				on:click|preventDefault={() => {
					suggestions = [];
					weatherData = getWeather();
				}}>Load</button
			>
			<img
				class="favButton"
				src="/ui/star.svg"
				alt="star"
				title="favourites"
				on:click={() => {
					showFav = !showFav;
				}}
			/>
		</form>

		<div class="suggestions">
			{#each suggestions as suggestion}
				<p
					class="backgroundFont"
					on:click={() => {
						suggestions = [];
						location = suggestion.name;
						weatherData = getWeather();
					}}
				>
					{suggestion.name}
				</p>
			{/each}
		</div>

		{#if showFav}
			<div class="fav gradient" transition:slide>
				{#each $favourites as favourite, id}
					<div class="favItem" style="display: flex; justify-content: center; margin-bottom: .25rem">
						<p
							style="text-decoration: underline; cursor: pointer;"
							on:click={() => {
								location = favourite;
								weatherData = getWeather();
							}}
						>
							{favourite}
						</p>
						<button
							type="button"
							on:click={() => {
								deleteFav(id);
							}}>X</button
						>
					</div>
				{:else}
					<p>No favourites, add one with the "+" in your Main card.</p>
				{/each}
			</div>
		{/if}
	</div>

	<main>
		{#await weatherData}
			<p class="backgroundFont">Lade Wetter ...</p>
		{:then weatherData}
			<div class="cards" style="margin: 1rem;">
				<MainCard
					data={weatherData}
					symbol={getSymbol(weatherData.current.condition.code, new Date().getHours(), astro)}
					unit={$unit}
					location={weatherData.location}
					on:click={() => {
						addFav(weatherData.location.name, weatherData.location.region);
						showFav = true;
					}}
				/>

				<div class="forecastnav">
					<p
						class="backgroundFont"
						class:selected={forecastDay === 0}
						on:click={() => {
							forecastDay = 0;
						}}
					>
						Today
					</p>
					<p
						class="backgroundFont"
						class:selected={forecastDay === 1}
						on:click={() => {
							forecastDay = 1;
						}}
					>
						Tomorrow
					</p>
					<p
						class="backgroundFont"
						class:selected={forecastDay === 2}
						on:click={() => {
							forecastDay = 2;
						}}
					>
						Overmorrow
					</p>
				</div>
				<div class="forecast">
					{#each getForecast(weatherData, forecastDay) as forecastData}
						<Card
							{forecastData}
							unit={$unit}
							symbol={getSymbol(forecastData.condition.code, getHoursFromDate(forecastData.time), astro)}
							on:click={() => {
								forecastDetails.data = forecastData;
								forecastDetails.time = forecastData.time;
								showForecastMainCard = true;
							}}
						/>
					{/each}
				</div>

				{#if showForecastMainCard}
					<div class="forecastMainCard" transition:slide>
						<ForecastMainCard
							time={forecastDetails.time}
							data={forecastDetails.data}
							symbol={// @ts-ignore
							getSymbol(forecastDetails.data.condition.code, getHoursFromDate(forecastDetails.time), astro)}
							unit={$unit}
							on:click={() => {
								showForecastMainCard = false;
							}}
						/>
					</div>
				{/if}

				<Astro {astro} />
				<Air uv={weatherData.current.uv} quality={weatherData.current.air_quality["us-epa-index"]} />
				<!-- <View unit={$unit} data={data.current}></View> -->
				<DailyAdvice advice={data.advice} />
			</div>
		{:catch error}
			<p class="error" style="color: red; margin-top: .5rem">Error: Could not load weather data. Please refresh!</p>
		{/await}
	</main>
</body>

<style>
	header {
		display: flex;
		justify-content: space-between;
		margin: 1rem;
		align-items: center;
	}

	header aside {
		display: flex;
	}

	header aside div {
		margin-inline: 0.5rem;
	}

	h1 {
		margin: 0.8rem 0;
		color: var(--accent);
		cursor: pointer;
	}

	.button input {
		display: none;
	}

	.button p {
		background-color: var(--color);
		border-radius: 100%;
		font-size: 1.52rem;
		padding: 0.5rem;
		box-shadow: 0 0 5px 4px var(--accent);
		user-select: none;
		cursor: pointer;
		width: 35px;
		height: 35px;
	}

	.grayed {
		filter: grayscale(1);
	}

	.unit p {
		font-weight: bold;
		line-height: 2.3rem;
	}

	form {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 1rem;
	}

	input {
		max-width: 200px;
		width: 50%;
		border: none;
		border-radius: 1rem;
		font-size: 1rem;
		padding: 0.3rem 0.5rem;
	}

	button[type="submit"] {
		border: none;
		font-size: 1rem;
		padding: 0.3rem 0.5rem;
		border-radius: 1rem;
		margin: 0 0.4rem;
	}

	.favButton {
		width: 2rem;
	}

	.fav {
		padding: 0.5rem;
		margin: 0 1rem;
		margin-top: 1rem;
	}

	.fav button {
		border: none;
		border-radius: 1rem;
		background-color: var(--accent);
		color: var(--font);
		margin-left: 0.2rem;
		cursor: pointer;
	}

	p {
		margin: 0;
	}

	.suggestions {
		margin-top: 0.5rem;
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
		margin: 1rem 0.5rem;
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
		margin-bottom: 0.5rem;
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

	@media only screen and (max-width: 600px) {
		header {
			flex-direction: column;
			margin-top: 0;
			margin-bottom: 1.5rem;
		}

		.button p {
			font-size: 1.35rem;
			width: 30px;
			height: 30px;
		}

		.unit p {
			line-height: 2rem;
		}
	}
</style>
