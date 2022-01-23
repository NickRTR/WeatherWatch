<script>
import { time_ranges_to_array } from "svelte/internal";


    export let data;
    export let symbol;
    export let unit;
</script>

<div class="Card">
    <img src="/condition/{symbol}.svg" alt={symbol}>
    <p>{data.time.substr(data.time.length - 5)}</p>
    {#if unit === "Metric"}
        <h3>{Math.round(data.temp_c)}°C</h3>
    {:else}
        <h3>{Math.round(data.temp_f)}F</h3>
    {/if}
</div>

<style>
    .Card {
        background-color: #2C2C46;
        border-radius: 1rem;
        font-size: 1.6rem;
        margin-right: .5rem;
        margin-bottom: 1rem;
        text-align: left;
    }

    img {
        width: 4rem;
        margin-left: 2rem;
        padding-right: .5rem;
        padding-top: .5rem;
    }

    h3 {
        text-align: left;
        font-size: 2rem;
        color: #FF9700;
        margin: 0;
        margin: 0 .8rem;
    }

    p {
        font-size: .8rem;
        margin-bottom: -6px;
        padding: 0 .8rem;
        margin-top: 0;
    }
</style>