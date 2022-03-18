<script>
    import { browser } from "$app/env";
    import { theme } from "$lib/stores";

    theme.set(browser ? localStorage.getItem("theme") : "light");
    $: if (browser) {
        if ($theme === null ) {
            theme.set("light");
        }
        localStorage.setItem("theme", $theme);
    }
</script>

<body class={$theme}>
    <slot></slot>
</body>

<footer>
    <p>©2022 Nick Reutlinger</p>
</footer>

<style>
	* {
        font-family: 'Signika', sans-serif;
        font-display: swap;
        background-color: #1E1E31;
        text-align: center;
        color: var(--font);
    }

    body {
        max-width: 700px;
        margin: 0 auto;

        --accent: red;
        --font: black;
        --color: white;
        --backgroundFont: white;
        --cardBackground: rgba(255, 255, 255, .9);
    }

    p {
        color: white;
    }

    :global(.gradient) {
        background: var(--cardBackground);
        box-shadow: 3px 3px 4px var(--accent);
        border-radius: 1rem;
    }

    :global(.backgroundFont) {
        color: var(--backgroundFont);
    }

    :global(body .dark) {
        --accent: red;
        --font: white;
        --color: black;
        --cardBackground: linear-gradient(0deg, rgba(0,0,0,0.3) 10%, rgba(47,47,71,1) 100%); 
    }
</style>