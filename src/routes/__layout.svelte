<body>
    <slot></slot>
</body>

<footer>
    <p>©2022 Nick Reutlinger</p>
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

    :global(.gradient) {
        background: linear-gradient(0deg, rgba(0,0,0,0.3) 10%, rgba(47,47,71,1) 100%);
        border-radius: 1rem;
    }
    
    :global(:root) {
        --accent: red;
    }
</style>