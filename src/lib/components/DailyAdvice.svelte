<script context="module">
	export async function load() {
		const res = await fetch("https://api.adviceslip.com/advice");
		const data = await res.json();

		return {
            props: {
                advice: data.slip.advice
            }
        }
	}
</script>

<script>
    export let advice;
</script>

<div class="advice gradient">
    <h4>Your daily advice:</h4>
    <p style="color: var(--accent)">{advice}</p>
</div>

<style>
    .advice {
        margin-bottom: 1rem;
        margin-top: .25rem;
        justify-content: space-around;
        align-items: center;
        padding: 1.5rem;
        font-size: 1.2rem;
    }

    h4 {
        margin: 0;
    }

    p {
        margin: .5rem 0;
    }
</style>