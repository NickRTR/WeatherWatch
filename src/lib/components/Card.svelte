<script>
    export let forecastData;
    export let symbol;
    export let unit;
</script>

<div class="card gradient">
    <img src="/condition/{symbol}.svg" alt={symbol}>
    <p>{forecastData.time.substr(11, 5)}</p>
    {#if unit === "Metric"}
        <h3>{Math.round(forecastData.temp_c)}<em>°C</em></h3>
    {:else}
        <h3>{Math.round(forecastData.temp_f)}<em>°F</em></h3>
    {/if}
</div>

<style>
    .card {
        margin-right: .5rem;
        margin-bottom: .55rem;
    }

    img {
        width: 4rem;
        margin: 0 1.8rem;
        padding: .2rem 0;
    }

    h3 {
        text-align: left;
        font-size: 2rem;
        margin: 0;
        margin-left: .5rem;
    }

    em {
        color: var(--accent);
        font-style: normal;
    }

    p {
        text-align: left;
        font-size: .8rem;
        margin-bottom: -6px;
        margin-top: 0;
        margin-left: .6rem;
    }
</style>