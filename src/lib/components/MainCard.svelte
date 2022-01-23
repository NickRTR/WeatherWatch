<script>
    export let data;
    export let symbol;
    export let unit;
    export let location;
</script>

<div class="Card">
    <h2>Today</h2>
    <div class="weather">
        {#if unit === "Metric"}
            <h3>{Math.round(data.temp_c)}°C</h3>
        {:else}
            <h3>{Math.round(data.temp_f)}F</h3>
        {/if}
        <img src="/condition/{symbol}.svg" alt={symbol}>
    </div>
    <p class="location">{location.name}, {location.region}, {location.country}</p>
</div>

<style>
    .Card {
        background-color: #2C2C46;
        border-radius: 1rem;
        font-size: 1.6rem;
    }

    h2 {
        font-size: 2rem;
        margin: 0;
        padding-left: 1rem;
        padding-top: .5rem;
        text-align: left;
    }

    img {
        width: 7rem;
        padding: 0;
    }

    h3 {
        text-align: left;
        font-size: 4rem;
        margin: 0;
        color: #FF9700;
    }

    .weather {
        display: flex;
        justify-content: space-between;
        padding: 0 1rem;
        align-items: center;
    }

    p {
        font-size: 1.2rem;
        margin: 0;
        padding: .5rem;
        padding-top: 1rem;
    }

</style>