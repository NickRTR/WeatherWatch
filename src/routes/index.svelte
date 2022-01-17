<script>
    let loc = "Balingen";

    let promise = getWeather();

    async function getWeather() {
        const key = "1ac68e62a6ed46e28da135216221501";
        const res = await fetch(`https://api.weatherapi.com/v1/current.json?key=${key}&q=${loc}`);
       
        if (res.ok) {
            const result = await res.json();
            console.table(result);
  		    return result;
		} else {
			throw new Error(await res.json());
		}
    }

    const handleClick = () => {
        promise = getWeather();
    }
</script>

<div class="container">
    <form>
        <input type="text" bind:value={loc}>
        <button type="submit" on:click|preventDefault={handleClick}>Laden</button>
    </form>

    {#await promise}
        <p>Lade Wetter ...</p>
    {:then data} 
        <p>In {data.location.name} hat es im Moment {Math.floor(data.current.temp_c)}°C</p>
    {:catch error}
        <p style="color: red">Error: Ort nicht vorhanden.</p>
    {/await}
</div>