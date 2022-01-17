<script>
    let loc = "Stuttgart";

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

<body>
    <h1>Hallo.</h1>

    <form>
        <input type="text" bind:value={loc} placeholder="Enter Location">
        <button type="submit" on:click|preventDefault={handleClick}>Laden</button>
    </form>

    {#await promise}
        <p>Lade Wetter ...</p>
    {:then data} 
        <div class="cards">
            <div class="card temp">
                <img src="/sun.svg" alt="sun">
                <p>{Math.floor(data.current.temp_c)}°C</p>
            </div>
            <div class="card wind">
                <img src="/wind.svg" alt="wind">
                <p>{data.current.wind_kph}km/h</p>
            </div>

            <div class="card humidity">
                <img src="/humidity.svg" alt="humidity">
                <p>{data.current.humidity}%</p>
            </div>
        </div>
    {:catch error}
        <p style="color: red">Error: Ort nicht vorhanden.</p>
    {/await}
</body>

<style>
    .card {
        background-color: rgba(228, 228, 228, .78);
        margin: 1rem;
        height: 200px;
        border-radius: 1rem;
        color: black;
        font-size: 2.5rem;
    }

    .card img {
        width: 5rem;
        margin-top: 1rem;
    }

    .card p {
        margin: 1rem;
    }
</style>