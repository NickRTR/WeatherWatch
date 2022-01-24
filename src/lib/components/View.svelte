<script>
    export let unit;
    export let data;
</script>

<div class="air">
    <img src="view.svg" alt="View Distance">
    {#if unit === "Metric"}
        <div>
            <p>Visibility:</p>
            <h3>{Math.round(data.vis_km)}<em>km</em></h3>
        </div>
    {:else}
        <div>
            <p>Visibility:</p>
            <h3>{Math.round(data.vis_miles)}<em>Miles</em></h3>
        </div>
    {/if}
</div>

<style>
    .air {
        background: linear-gradient(0deg, rgba(0,0,0,0.3) 0%, rgba(47,47,71,1) 100%);
        border-radius: 1rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    .air img {
        width: 5rem;
    }

    em {
        color: #FF9700;
        font-style: normal;
    }
</style>