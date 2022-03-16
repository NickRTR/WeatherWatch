<body>
    <slot></slot>
</body>

<footer>
    <p>©2022 Nick Reutlinger</p>
</footer>

<style>
	* {
        font-family: 'Signika', sans-serif;
        font-display: swap;
        background-color: var(--background);
        text-align: center;
        color: var(--font);
    }

    body {
        max-width: 700px;
        margin: 0 auto;
    }

    :global(.gradient) {
        background: var(--cardBackground);
        box-shadow: 3px 3px 4px var(--accent);
        border-radius: 1rem;
    }

    :global(.backgroundFont) {
        color: var(--backgroundFont);
    }
    
    :global(:root) {
        /* bright */
        --accent: red;
        --font: black;
        --backgroundFont: white;
        --background: #1E1E31;
        --cardBackground: rgba(255, 255, 255, .9);

        /* dark */
        /* --accent: red;
        --font: white;
        --backgroundFont: white;
        --background: #1E1E31;
        --cardBackground: linear-gradient(0deg, rgba(0,0,0,0.3) 10%, rgba(47,47,71,1) 100%);  */
    }
</style>