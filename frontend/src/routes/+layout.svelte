<script lang="ts">
	import { goto, invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import '../app.css';
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Dropdown, DropdownItem, DropdownDivider, DarkMode, Button, Footer, FooterBrand, FooterCopyright, FooterIcon, FooterLink, FooterLinkGroup, Banner } from 'flowbite-svelte';
	import { ChevronDownOutline, BullhornSolid } from 'flowbite-svelte-icons'
	import { page } from '$app/stores';
	$: activeUrl = $page.url.pathname;
	import { } from 'flowbite-svelte';

	let btnClass = 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-xl p-2 center-content';
</script>


<Navbar class="border-b-black dark:border-b-white border-b">
	<NavBrand href="/">
	  <img src="/logo.svg" class="me-3 h-6 sm:h-9 dark:invert" alt="BBCD Logo" />
	</NavBrand>
	<NavHamburger />
	<NavUl {activeUrl}>
		<NavLi href="/auth/signin" {activeUrl}>
			<Button class="bg-black">Sign in</Button>
		</NavLi>
	  <NavLi>
		<DarkMode {btnClass} />
	  </NavLi>
	</NavUl>
</Navbar>


<slot />


<div class="w-full border-t border-black dark:border-white mt-5">
	<p class="text-center">
		Made with ❤️ by Kat 🏳️‍⚧️
	</p>
</div>