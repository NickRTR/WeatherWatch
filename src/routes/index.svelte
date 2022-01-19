<script>
    import {conditions} from "$lib/conditions.js";
    import {selectTextOnFocus} from "$lib/inputDirectives.js";

    let loc = "Berlin";
    let suggestions = [];
    let symbol = "";

    async function getSuggestions() {
        if (loc.match(/^ *$/) !== null) {
            return;
        }
        const key = "bba81dedf0f34bda955161436221701";
        const res = await fetch(`https://api.weatherapi.com/v1/search.json?key=${key}&q=${loc}`);
        if (res.ok) {
            const result = await res.json();
  		    suggestions = result;
		} else {
			throw new Error(await res.json());
		}
    }

    let promise = getWeather();
    async function getWeather() {
        suggestions = [];
        symbol = "";
        const key = "bba81dedf0f34bda955161436221701";
        const res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${loc}`);
        if (res.ok) {
            const result = await res.json();
            loc = result.location.name;
            console.log(result);
            getSymbol(result.current.condition.code);
  		    return result;
		} else {
			throw new Error(await res.json());
		}
    }

    const getSymbol = (code) => {
        for (const condition in conditions) {
            if (conditions[condition].includes(code)) {
                symbol = condition;
            }
        }
    }

    const handleClick = () => {
        promise = getWeather();
    }
</script>

<body>
    <h1>Hello</h1>

    <form>
        <input type="text" placeholder="Enter Location" bind:value={loc} on:input={getSuggestions} use:selectTextOnFocus>
        <button type="submit" on:click|preventDefault={handleClick}>Load</button>
    </form>

    <div class="suggestions">
        {#each suggestions as suggestion}
            <p on:click|preventDefault={() => {loc = suggestion.name; handleClick()}}>{suggestion.name}</p>
        {/each}
    </div>

    {#await promise}
        <p>Lade Wetter ...</p>
    {:then data} 
        <div class="cards">
            <div class="card temp">
                <img src="/condition/{symbol}.svg" alt={symbol}>
                <p>{data.current.condition.text}, {Math.floor(data.current.temp_c)}°C</p>
            </div>
            <div class="card wind">
                <img src="/wind.svg" alt="wind">
                <p>{data.current.wind_kph}km/h</p>
            </div>

            <div class="card humidity">
                <img src="/humidity.svg" alt="humidity">
                <p>{data.current.humidity}%</p>
            </div>

            <div class="card sun">
                <div class="sunrise">
                    <img src="/sunrise.svg" alt="sunrise">
                    <p>{data.forecast.forecastday[0].astro.sunrise}</p>
                </div>
                <div class="sunset">
                    <img src="/sunrise.svg" alt="sunrise">
                    <p>{data.forecast.forecastday[0].astro.sunset}</p>
                </div>
                
            </div>
        </div>
    {:catch error}
        <p class="error">Error: Ort nicht vorhanden.</p>
    {/await}
</body>

<style>
    h1 {
        margin-top: .8rem;
        margin-bottom: .7rem; 
        letter-spacing: .2rem;
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

    .suggestions {
        margin-top: .5rem;
    }

    .suggestions p {
        cursor: pointer;
        text-decoration: underline;
    }

    .cards {
        margin: 0 1rem;
        margin-top: 1rem;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
    }

    .card {
        background-color: rgba(228, 228, 228, .78);
        border-radius: 1rem;
        font-size: 1.8rem;
        box-shadow: 0 0 .5rem black;
    }

    .card img {
        width: 3.5rem;
        margin: 0;
        margin-top: .5rem;
    }

    p {
        margin: 0;
    }

    .sun {
        display: flex;
        justify-content: space-between;
        padding: 0 1rem;
    }

    .error {
        color: red;
        margin-top: .5rem;
    }

    /* Responsive Design */

    @media only screen and (max-width: 400px) {
        .cards {
            grid-template-columns: 1fr;
        }
    }
</style>