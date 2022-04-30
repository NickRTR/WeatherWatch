<script>
    export let unit;
    export let data;

    $: if (unit === "Metric") {
        displayUnit = "°C";
    } else {
        displayUnit = "°F";
    }
</script>

<div class="air gradient">
    <img src="/ui/view.svg" alt="View Distance">
    <div>
        <p>Visibility:</p>
        <h3>{Math.round(data.vis_km)}<em>km</em></h3>
    </div>
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
        color: var(--accent);
        font-style: normal;
    }
</style>