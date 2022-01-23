<script>
    export let uv;
    export let quality;

    switch (quality) {
        case 1:
            quality = "Good";
            break;
        case 2:
            quality = "Moderate";
            break;
        case 3:
            quality = "Ok";
            break;
        case 4:
            quality = "Unhealthy";
            break;
        case 5:
            quality = "Very Unhealthy";
            break;
        case 6:
            quality = "Hazardous";
            break;
        default:
            break;
    }
</script>

<div class="air">
    <div class="sunrise">
        <img src="/uv.svg" alt="uv">
        <p>UV index: {uv}</p>
    </div>
    <div class="sunset">
        <img src="/air.svg" alt="air quality">
        <p>Air quality: {quality}</p>
    </div>
</div>

<style>
    .air {
        margin: 1rem 0;
        background: linear-gradient(0deg, rgba(0,0,0,0.3) 0%, rgba(47,47,71,1) 100%);
        border-radius: 1rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    .air img {
        margin-top: .5rem;
        width: 5rem;
    }

    p {
        margin: 0;
        margin-bottom: .5rem;
    }
</style>