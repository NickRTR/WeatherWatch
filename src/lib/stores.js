import { writable } from "svelte-local-storage-store";

export const theme = writable("theme", "light");

export const unit = writable("unit", "Imperial");

export const fetchLocation = writable("fetchLocation", "off");

export const favourites = writable("favourites", []);
