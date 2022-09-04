<script>
	export let data;
	export let symbol;
	export let unit;
	export let time;

	let values = {};

	// values
	$: {
		if (unit === "Metric") {
			values = {
				temp: {
					value: data.temp_c,
					text: "°C"
				},
				wind: {
					value: data.wind_kph,
					text: "km/h"
				},
				feelsLike: {
					value: data.feelslike_c,
					text: "°C"
				}
			};
		} else {
			values = {
				temp: {
					value: data.temp_f,
					text: "F"
				},
				wind: {
					value: data.wind_mph,
					text: "mph"
				},
				feelsLike: {
					value: data.feelslike_f,
					text: "F"
				}
			};
		}
	}
</script>

<div class="card gradient">
	<div class="title">
		<h2>{time}</h2>
		<p on:click>X</p>
	</div>
	<div class="weather">
		<h3>{Math.round(values.temp.value)}<em>{values.temp.text}</em></h3>
		<img src="/condition/{symbol}.svg" alt={symbol} />
	</div>
	<p>Condition: {data.condition.text}</p>
	<div class="infos">
		<div class="wind">
			<img src="/ui/wind.svg" alt="" />
			<p class="data">{Math.round(values.wind.value) + values.wind.text}</p>
			<p class="description">Wind</p>
		</div>
		<div class="feels">
			<img src="/ui/max.svg" alt="" />
			<p class="data">{Math.round(values.feelsLike.value) + values.feelsLike.text}</p>
			<p class="description">Feels like</p>
		</div>
		<div class="humidty">
			<img src="/ui/humidity.svg" alt="" />
			<p class="data">{data.humidity}%</p>
			<p class="description">Humidity</p>
		</div>
	</div>
</div>

<style>
	.card {
		margin-bottom: 1rem;
		padding-bottom: 0.5rem;
	}

	.title {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.title p {
		border-radius: 100%;
		margin-right: 1rem;
		font-weight: bolder;
		cursor: pointer;
		font-size: 1.5rem;
		color: var(--accent);
	}

	h2 {
		font-size: 1.5rem;
		margin: 0;
		padding-left: 1rem;
		padding-top: 0.7rem;
		text-align: left;
	}

	img {
		width: 6rem;
		padding: 0;
	}

	h3 {
		text-align: left;
		font-size: 3rem;
		margin: 0;
	}

	em {
		color: var(--accent);
		font-style: normal;
	}

	.weather {
		display: flex;
		justify-content: space-around;
		padding: 0 1rem;
		align-items: center;
	}

	.infos {
		margin-top: 0.5rem;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
	}

	.infos img {
		width: 2.5rem;
	}

	.infos div {
		padding: 0 1rem;
	}

	.data {
		margin-top: -0.8rem;
		margin-bottom: -1rem;
	}

	.description {
		font-size: 0.8rem;
		padding-bottom: 0;
		margin-top: 0.5rem;
	}

	p {
		font-size: 1rem;
		margin: 0;
		padding: 0.5rem;
		padding-bottom: 0;
	}
</style>
