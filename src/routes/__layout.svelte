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

<body>
    <slot></slot>
</body>

<footer>
    <p style="margin: 0 .5rem;">Your daily advice: <em>{advice}</em></p>
    <p class="copyright">©2022 Nick Reutlinger</p>
</footer>

<style>
	* {
        font-family: 'Signika', sans-serif;
        background-color: #1E1E31;
        text-align: center;
        color: white;
    }

    body {
        max-width: 700px;
        margin: 0 auto;
    }

    em {
        color: var(--accent);
        font-style: normal;
    }

    .copyright {
        margin: .5rem;
    }

    :global(.gradient) {
        background: linear-gradient(0deg, rgba(0,0,0,0.3) 10%, rgba(47,47,71,1) 100%);
        border-radius: 1rem;
    }
    
    :global(:root) {
        --accent: red;
    }
</style>