export let API_KEY = import.meta.env.VITE_API_KEY;
// if production, get KEY from Vercel
if (process.env.NODE_ENV === 'production') {
    API_KEY = process.env.API_KEY;
}