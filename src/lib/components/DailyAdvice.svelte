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
		margin-top: 0.25rem;
		justify-content: space-around;
		align-items: center;
		padding: 1.5rem;
		font-size: 1.2rem;
	}

	h4 {
		margin: 0;
	}

	p {
		margin: 0.5rem 0;
	}
</style>
