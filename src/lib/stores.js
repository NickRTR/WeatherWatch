import { writable } from "svelte/store";
import { browser } from "$app/env";

export const theme = writable("light");

export const unit = writable(browser ? localStorage.getItem("unit") : "Metric");

unit.subscribe((u) => {
    if (browser) localStorage.setItem("unit", u);
});

export const favourites = writable(browser ? JSON.parse(localStorage.getItem("fav")) : []);

favourites.subscribe((f) => {
    if (browser) {
        if (localStorage.getItem("fav") === null) {
            localStorage.setItem("fav", JSON.stringify([])); // if now favourites stored, store empty Array
        } else {
            localStorage.setItem("fav", JSON.stringify(f));
        }
    }
});
