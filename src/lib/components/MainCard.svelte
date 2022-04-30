<script>
    import { getTimeFromDate } from "$lib/helper";

    export let data;
    export let symbol;
    export let unit;
    export let location;

    let current = data.current;
    let day = data.forecast.forecastday[0].day;

    let values = {};

    // values
    $: {
        if (unit === "Metric") {
            values = {
                temp: {
                    value: current.temp_c,
                    text: "°C"
                },
                wind: {
                    value: current.wind_kph,
                    text: "km/h"
                },
                minTemp: {
                    value: day.mintemp_c,
                    text: "°C"
                },
                avgTemp: {
                    value: day.avgtemp_c,
                    text: "°C"
                },
                maxTemp: {
                    value: day.maxtemp_c,
                    text: "°C"
                },
            }
        } else {
            values = {
                temp: {
                    value: current.temp_f,
                    text: "F"
                },
                wind: {
                    value: current.wind_mph,
                    text: "mph"
                },
                minTemp: {
                    value: day.mintemp_f,
                    text: "F"
                },
                avgTemp: {
                    value: day.avgtemp_f,
                    text: "F"
                },
                maxTemp: {
                    value: day.maxtemp_f,
                    text: "F"
                },
            }
        }
    }

    let displayLocation = `${location.name}, ${location.region}, ${location.country}`
    if (!location.region) {
        displayLocation = `${location.name}, ${location.country}`;
    } else if (location.region && !location.country) {
        displayLocation = `${location.name}, ${location.region}`;
    }
</script>

<div class="card gradient">
    <h2>{location.name}, {getTimeFromDate(location.localtime)}</h2>
    <div class="weather">
        <h3>{Math.round(values.temp.value)}<em>{values.temp.text}</em></h3>
        <img src="/condition/{symbol}.svg" alt={symbol}>
    </div>
    <p>Condition: {current.condition.text}</p>
    <div class="infos">
        <div class="wind">
            <img src="/ui/wind.svg" alt="">
            <p class="current">{Math.round(values.wind.value) + values.wind.text}</p>
            <p class="description">Wind</p>
        </div>
        <div class="rain">
            <img src="/ui/rainPossibility.svg" alt="">
            <p class="current">{Math.round(day.daily_chance_of_rain)}%</p>
            <p class="description">Rain</p>
        </div>
        <div class="humidty">
            <img src="/ui/humidity.svg" alt="">
            <p class="current">{current.humidity}%</p>
            <p class="description">Humidity</p>
        </div>
        <div class="min">
            <img src="/ui/min.svg" alt="">
            <p class="current">{Math.round(values.minTemp.value) + values.minTemp.text}</p>
            <p class="description">min temp</p>
        </div>
        <div class="avg">
            <img src="/ui/avg.png" alt="">
            <p class="current">{Math.round(values.avgTemp.value) + values.avgTemp.text}</p>
            <p class="description">avg temp</p>
        </div>
        <div class="max">
            <img src="/ui/max.svg" alt="">
            <p class="current">{Math.round(values.maxTemp.value) + values.maxTemp.text}</p>
            <p class="description">max temp</p>
        </div>
    </div>
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