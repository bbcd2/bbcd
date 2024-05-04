<script lang="ts">
	import { goto, invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import '../app.css';

	export let data;
	$: ({ session, supabase } = data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (!newSession) {
				/**
				 * Queue this as a task so the navigation won't prevent the
				 * triggering function from completing
				 */
				setTimeout(() => {
					goto('/', { invalidateAll: true });
				});
			}
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
	async function signIn() {
		await supabase.auth.signInWithOAuth({ provider: 'discord' });
	}
	async function signOut() {
		await supabase.auth.signOut();
	}
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Dropdown, DropdownItem, DropdownDivider, DarkMode, Button, Footer, FooterBrand, FooterCopyright, FooterIcon, FooterLink, FooterLinkGroup } from 'flowbite-svelte';
	import { ChevronDownOutline } from 'flowbite-svelte-icons'
	import { page } from '$app/stores';
	$: activeUrl = $page.url.pathname;
	import { } from 'flowbite-svelte';

	let btnClass = 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-xl p-2';
</script>


<Navbar class="border-b-black dark:border-b-white border-b">
	<NavBrand href="/">
	  <img src="logo.svg" class="me-3 h-6 sm:h-9 dark:invert" alt="BBCD Logo" />
	</NavBrand>
	<NavHamburger />
	<NavUl {activeUrl}>
		<NavLi>
			{#if session}
			<Button on:click={signOut} class="bg-black dark:bg-white dark:text-black text-xl">Sign out</Button>
			{:else}
			<Button on:click={signIn} class="bg-black dark:bg-white dark:text-black text-xl">Sign in</Button>
			{/if}
		</NavLi>
	  <NavLi>
		<DarkMode {btnClass} />
	  </NavLi>
	</NavUl>
</Navbar>


<slot />

<div class="w-full border-t border-black dark:border-white mt-5">
	<p class="text-center py-2">
		Made with ❤️ by Kat 🏳️‍⚧️
	</p>
</div>