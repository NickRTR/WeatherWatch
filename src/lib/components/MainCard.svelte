<script>
    export let data;
    export let symbol;
    export let unit;
    export let location;

    let current = data.current;
    let day = data.forecast.forecastday[0].day;

    import { getTimeFromDate } from "$lib/time";

    let displayLocation = `${location.name}, ${location.region}, ${location.country}`
    if (!location.region) {
        displayLocation = `${location.name}, ${location.country}`;
    } else if (location.region && !location.country) {
        displayLocation = `${location.name}, ${location.region}`;
    }
</script>

<div class="card gradient">
    <h2>Today {getTimeFromDate(location.localtime)}</h2>
    {#if unit === "Metric"}
        <div class="weather">
            <h3>{Math.round(current.temp_c)}<em>°C</em></h3>
            <img src="/condition/{symbol}.svg" alt={symbol}>
        </div>
        <p>Condition: {current.condition.text}</p>
        <div class="infos">
            <div class="wind">
                <img src="/ui/wind.svg" alt="">
                <p class="current">{Math.round(current.wind_kph)}km/h</p>
                <p class="description">Wind</p>
            </div>
            <div class="rain">
                <img src="/ui/rainPossibility.svg" alt="">
                <p class="current">{Math.round(day.daily_chance_of_rain)}%</p>
                <p class="description">rain possible</p>
            </div>
            <div class="humidty">
                <img src="/ui/humidity.svg" alt="">
                <p class="current">{current.humidity}%</p>
                <p class="description">Humidity</p>
            </div>
            <div class="min">
                <img src="/ui/min.svg" alt="">
                <p class="current">{Math.round(day.mintemp_c)}°C</p>
                <p class="description">min temp</p>
            </div>
            <div class="avg">
                <img src="/ui/avg.png" alt="">
                <p class="current">{Math.round(day.avgtemp_c)}°C</p>
                <p class="description">avg temp</p>
            </div>
            <div class="max">
                <img src="/ui/max.svg" alt="">
                <p class="current">{Math.round(day.maxtemp_c)}°C</p>
                <p class="description">max temp</p>
            </div>
        </div>
    {:else}
        <div class="weather">
            <h3>{Math.round(current.temp_f)}<em>F</em></h3>
            <img src="/condition/{symbol}.svg" alt={symbol}>
        </div>
        <p>Condition: {current.condition.text}</p>
        <div class="infos">
            <div class="wind">
                <img src="/ui/wind.svg" alt="">
                <p class="current">{Math.round(current.wind_mph)}mph</p>
                <p class="description">Wind</p>
            </div>
            <div class="rain">
                <img src="/ui/rainPossibility.svg" alt="">
                <p class="current">{Math.round(day.daily_chance_of_rain)}%</p>
                <p class="description">rain possible</p>
            </div>
            <div class="humidty">
                <img src="/ui/humidity.svg" alt="">
                <p class="current">{current.humidity}%</p>
                <p class="description">Humidty</p>
            </div>
            <div class="min">
                <img src="/ui/min.svg" alt="">
                <p class="current">{Math.round(day.mintemp_f)}F</p>
                <p class="description">min temp</p>
            </div>
            <div class="avg">
                <img src="/ui/avg.png" alt="">
                <p class="current">{Math.round(day.avgtemp_f)}F</p>
                <p class="description">avg temp</p>
            </div>
            <div class="max">
                <img src="/ui/max.svg" alt="">
                <p class="current">{Math.round(day.maxtemp_f)}F</p>
                <p class="description">max temp</p>
            </div>
        </div>
    {/if}
</div>
<p class="location">{displayLocation}</p>
<button type="button" on:click>Add location to favourites</button>

<style>
    .card {
        padding-bottom: .5rem;
    }

    h2 {
        font-size: 1.5rem;
        margin: 0;
        padding-left: 1rem;
        padding-top: .7rem;
        text-align: left;
    }

    img {
        width: 6rem;
        padding: 0;
    }

    h3 {
        text-align: left;
        font-size: 3rem;
        margin: 0;
    }

    em {
        color: var(--accent);
        font-style: normal;
    }

    .weather {
        display: flex;
        justify-content: space-around;
        padding: 0 1rem;
        align-items: center;
    }

    .infos {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr;
        margin-top: .5rem;
        gap: .5rem
    }

    .infos img {
        width: 2.5rem;
    }

    .infos div {
        padding: 0 1rem;
    }

    .current {
        margin-top: -.8rem;
        margin-bottom: -1rem;
    }

    .description {
        font-size: .8rem;
        padding-bottom: 0;
        margin-top: .5rem;
    }

    p {
        font-size: 1rem;
        margin: 0;
        padding: .5rem;
        padding-bottom: 0;
    }

    .location {
        color: var(--backgroundFont);
    }

    button {
        border-radius: 1rem;
        background-color: greenyellow;
        color: black;
        border: none;
        margin-top: .4rem;
        padding: .25rem .5rem;
        cursor: pointer;
    }
</style>