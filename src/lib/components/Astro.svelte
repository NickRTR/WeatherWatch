<script>
    export let data;
</script>

<div class="astro">
    <div class="sunrise">
        <img src="/sunrise.svg" alt="sunrise">
        <p>{data.forecast.forecastday[0].astro.sunrise}</p>
    </div>
    <img style="width: 8rem;" src="sun.svg" alt="">
    <div class="sunset">
        <img src="/sunset.svg" alt="sunset">
        <p>{data.forecast.forecastday[0].astro.sunset}</p>
    </div>
</div>

<style>
    .astro {
        margin: 1rem 0;
        background: linear-gradient(0deg, rgba(0,0,0,0.3) 0%, rgba(47,47,71,1) 100%);
        border-radius: 1rem;
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