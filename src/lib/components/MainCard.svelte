<script>
    export let data;
    export let symbol;
    export let unit;
    export let location;
</script>

<div class="card gradient">
    <h2>Today</h2>
    {#if unit === "Metric"}
        <div class="weather">
            <h3>{Math.round(data.temp_c)}<em>°C</em></h3>
            <img src="/condition/{symbol}.svg" alt={symbol}>
        </div>
        <div class="infos">
            <div class="wind">
                <img src="/wind.svg" alt="">
                <p class="data">{Math.round(data.wind_kph)}km/h</p>
                <p class="description">Wind</p>
            </div>
            <div class="feels">
                <img src="/feelslike.svg" alt="">
                <p class="data">{Math.round(data.feelslike_c)}°C</p>
                <p class="description">Feels like</p>
            </div>
            <div class="humidty">
                <img src="/humidity.svg" alt="">
                <p class="data">{data.humidity}%</p>
                <p class="description">Humidity</p>
            </div>
        </div>
    {:else}
        <div class="weather">
            <h3>{Math.round(data.temp_f)}<em>F</em></h3>
            <img src="/condition/{symbol}.svg" alt={symbol}>
        </div>
        <div class="additional">
            <div class="infos">
                <div class="wind">
                    <img src="/wind.svg" alt="">
                    <p class="data">{Math.round(data.wind_mph)}mph</p>
                    <p class="description">Wind</p>
                </div>
                <div class="feels">
                    <img src="/feelslike.svg" alt="">
                    <p class="data">{Math.round(data.feelslike_f)}F</p>
                    <p class="description">Feels like</p>
                </div>
                <div class="humidty">
                    <img src="/humidity.svg" alt="">
                    <p class="data">{data.humidity}%</p>
                    <p class="description">Humidty</p>
                </div>
            </div>
        </div>
    {/if}
    <p class="location">{location.name}, {location.region}, {location.country}</p>
</div>

<style>
    h2 {
        font-size: 1.5rem;
        margin: 0;
        padding-left: 1rem;
        padding-top: .5rem;
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
        margin-top: .5rem;
        display: flex;
        justify-content: space-around;
    }

    .infos img {
        width: 2.5rem;
    }

    .infos div {
        padding: 0 1rem;
    }

    .data {
        margin-top: -.8rem;
        margin-bottom: -1rem;
    }

    .description {
        font-size: .8rem;
        color: lightgray;
        padding-bottom: 0;
    }

    p {
        font-size: 1rem;
        margin: 0;
        padding: .5rem;
    }
</style>