import { conditions } from "$lib/conditions.js";

// go through all possible conditions and get the fitting according to the weather code
export function getSymbol (code, hours, astro) {
    for (const condition in conditions) {
        if (conditions[condition].includes(code)) {
            if (hours < parseInt(getHoursFromTime(astro.sunrise)) || hours > parseInt(getHoursFromTime(astro.sunset)) + 12) { // return available night icons if it's night
                switch (condition) {
                    case "sun":
                        return "night sun"
                    case "partly cloudy":
                        return "night partly cloudy"
                    case "cloudy":
                        return "night cloudy"
                    default:
                        return condition;
                }
            }
            return condition;
        }
    }
}

// ----------------------------
// Favourites
// ----------------------------

import { favourites } from "$lib/stores";
import { get } from "svelte/store";

let favs = get(favourites);

// add favourite to favourite list and save to localStorage
export function addFav (name, region) {
    let location = region ? `${name}, ${region}` : name; // only display region if there
    for (let i in favs) {
        if (favs[i] === location) {
            alert("You already saved this location!");
            return; 
        }
    }
    let updatedFavourites = [...favs, location];
    favourites.set(updatedFavourites);
    localStorage.setItem("fav", JSON.stringify(updatedFavourites));
}

export function deleteFav (id) {
    favourites.set(favs.splice(id, 1));
    localStorage.setItem("fav", JSON.stringify(favs));
}

// ----------------------------
// Theme ----------------------
// ----------------------------

import { theme } from "$lib/stores";

export function changeTheme() {
    if (get(theme) === "light") {
        theme.set("dark");
    } else {
        theme.set("light");
    }
    localStorage.setItem("theme", get(theme));
}

// ----------------------------
// Time -----------------------
// ----------------------------

export function getHoursFromDate(time) {    
    return time.substr(11, 2).replace(":", ""); // filter only hour from time and replace : for one digit times like 6:40
}

export function getHoursFromTime(time) { 
    return time.substr(0, 2).replace("0", ""); // filter only hour from time and replace : for one digit times like 6:40
}

export function getTimeFromDate(time) {    
    return time.substr(11, 5); // filter time from date
}