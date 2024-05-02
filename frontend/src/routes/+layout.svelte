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
</script>

<header class="h-4">
	<nav>
		<a href="/"><h5 class="max left-align">BBCD2</h5></a>
		<div class="max" />
		{#if session}
			<button class="transparent no-round" data-ui="menu">
				<div class="row">
					<img src={session?.user.user_metadata.picture} class="circle" />
					<p>Hi, {session.user.user_metadata.custom_claims.global_name}</p>
					<i>arrow_drop_down</i>
				</div>
				<menu>
					<a href="/account/">Your account</a>
					<a href="/account/recordings/">Your recordings</a>
					<a on:click={signOut}>Sign out</a>
				</menu>
			</button>
		{:else}
			<button class="transparent" on:click={signIn}>
				<i>account_circle</i>
				Sign in
			</button>
		{/if}
	</nav>
</header>

<main class="responsive max">
	<div style="display: contents"><slot /></div>
</main>
