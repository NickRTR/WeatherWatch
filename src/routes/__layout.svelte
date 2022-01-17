<body>
    <slot></slot>
</body>

<style>
	:global(body) {
        font-family: 'Signika', sans-serif;
		background: rgb(4,0,79);
        /* background: linear-gradient(0deg, rgba(4,0,79,1) 10%, rgba(255,177,61,1) 100%); */
        color: white;

        text-align: center;
    }

    body {
        max-width: 600px;
        margin: 0 auto;
    }
</style>