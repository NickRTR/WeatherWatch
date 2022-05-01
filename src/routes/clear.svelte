<script>
    import { onMount } from "svelte";

    onMount(() => {
        localStorage.clear();
    })
</script>

<body>
    <h2>This page clears WeatherWatch's localStorage to fix issues.</h2>
    <p>You don't need to do anything, by accessing this page, your localStorage has already been cleared.</p>
    <a href="/" sveltekit:prefetch title="Home">Back to WeatherWatch</a>
</body>

<style>
    body {
        color: white;
    }

    a {
        color: white;
    }
</style>