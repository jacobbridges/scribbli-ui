import AppWrapper from './AppWrapper.svelte';

// force SPA hash routing
// https://github.com/ItalyPaleAle/svelte-spa-router/issues/22
if (!window.location.hash || window.location.hash == '#') {
    history.replaceState(undefined, undefined, '#/')
}

const app = new AppWrapper({
	target: document.body,
    // props: {},
});

export default app;
