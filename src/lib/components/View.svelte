<script>
    export let unit;
    export let data;
</script>

<div class="air gradient">
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