<script>
    let loc = "Berlin";

    let promise = getWeather();

    async function getWeather() {
        const key = "bba81dedf0f34bda955161436221701";
        const res = await fetch(`https://api.weatherapi.com/v1/current.json?key=${key}&q=${loc}`);
       
        if (res.ok) {
            const result = await res.json();
            console.log(result);
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
        <p>In {data.location.name}, {data.location.country} it is currently {Math.floor(data.current.temp_c)}°C</p>
        <p>The air humidity is around {data.current.humidity}%</p>
        <p>Additionally the wind blows with {data.current.wind_kph}km/h, which leads to the temperature feeling like {data.current.feelslike_c}°C</p>
        <img src={data.current.condition.icon} alt={data.current.condition.text}>
    {:catch error}
        <p style="color: red">Error: Ort nicht vorhanden.</p>
    {/await}
</div>