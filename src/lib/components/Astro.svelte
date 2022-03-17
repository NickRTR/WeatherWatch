<script>
    export let data;
</script>

<div class="astro gradient">
    <div class="sunrise">
        <img src="/ui/sunrise.svg" alt="sunrise">
        <p>{data.forecast.forecastday[0].astro.sunrise}</p>
    </div>
    <img style="width: 8rem;" src="/ui/sun.svg" alt="">
    <div class="sunset">
        <img src="/ui/sunset.svg" alt="sunset">
        <p>{data.forecast.forecastday[0].astro.sunset}</p>
    </div>
</div>

<style>
    .astro {
        margin-bottom: 1rem;
        margin-top: .25rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    .astro img {
        width: 5rem;
    }

    p {
        margin: 0;
        margin-bottom: .2rem;
    }
</style>