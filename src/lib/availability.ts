import { browser } from "$app/environment";
import { writable } from "svelte/store";

const { set, subscribe } = writable(false)

if(browser)
    set(true)

export default { subscribe }