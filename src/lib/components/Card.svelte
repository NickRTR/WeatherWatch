<script>
    export let forecastData;
    export let symbol;
    export let unit;
</script>

<div class="Card">
    <img src="/condition/{symbol}.svg" alt={symbol}>
    <p>{forecastData.time.substr(forecastData.time.length - 5)}</p>
    {#if unit === "Metric"}
        <h3>{Math.round(forecastData.temp_c)}°C</h3>
    {:else}
        <h3>{Math.round(forecastData.temp_f)}F</h3>
    {/if}
</div>

<style>
    .Card {
        background-color: #2C2C46;
        border-radius: 1rem;
        font-size: 1.6rem;
        margin-right: .5rem;
        margin-bottom: 1rem;
    }

    img {
        width: 4rem;
        margin: 0 1rem;
        padding: .2rem 0;
    }

    h3 {
        text-align: left;
        font-size: 2rem;
        color: #FF9700;
        margin: 0;
        margin-left: .5rem;
    }

    p {
        text-align: left;
        font-size: .8rem;
        margin-bottom: -6px;
        margin-top: 0;
        margin-left: .6rem;
    }
</style>