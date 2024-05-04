<script lang="ts">
	import { createClient } from '@supabase/supabase-js';
	import { onMount } from 'svelte';
	import {
		Label,
		Input,
		Select,
		Button,
		Toast,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import {
		AngleRightOutline,
		ArrowRightOutline,
		LinkOutline,
		PaperPlaneOutline
	} from 'flowbite-svelte-icons';
	export let data;
	$: ({ session, supabase } = data);
	// Get the last 15 records from the recordings table
	const getRecordings = async () => {
		const { data, error } = await supabase
			.from('recordings')
			.select('*')
			.limit(15)
			.order('created_at', { ascending: false });
		if (error) console.log('error', error.message);
		return data;
	};
	let id: string;
	onMount(async () => {
		id = (await supabase.auth.getUser())?.data?.user?.id ?? '';
	});
	function statusString(status: number) {
		switch (status) {
			case 1:
				return 'Initialising';
			case 2:
				return 'Downloading Video';
			case 3:
				return 'Downloading Audio';
			case 4:
				return 'Combining Audio and Video';
			case 5:
				return 'Cleaning Segments';
			case 6:
				return 'Uploading File';
			case 7:
				return 'Complete';
			default:
				return 'Unknown';
		}
	}
	function channelString(channel: number) {
		switch (channel) {
			case 0:
				return 'BBC ONE HD';
			case 1:
				return 'BBC ONE WALES HD';
			case 2:
				return 'BBC ONE SCOTLAND HD';
			case 3:
				return 'BBC ONE NORTHERN IRELAND HD';
			case 4:
				return 'BBC ONE CHANNEL ISLANDS HD';
			case 5:
				return 'BBC ONE EAST HD';
			case 6:
				return 'BBC ONE EAST MIDLANDS HD';
			case 7:
				return 'BBC ONE EAST YORKSHIRE & LINCOLNSHIRE HD';
			case 8:
				return 'BBC ONE LONDON HD';
			case 9:
				return 'BBC ONE NORTH EAST HD';
			case 10:
				return 'BBC ONE NORTH WEST HD';
			case 11:
				return 'BBC ONE SOUTH HD';
			case 12:
				return 'BBC ONE SOUTH EAST HD';
			case 13:
				return 'BBC ONE SOUTH WEST HD';
			case 14:
				return 'BBC ONE WEST HD';
			case 15:
				return 'BBC ONE WEST MIDLANDS HD';
			case 16:
				return 'BBC ONE YORKSHIRE HD';
			case 17:
				return 'BBC TWO HD';
			case 18:
				return 'BBC TWO NORTHERN IRELAND HD';
			case 19:
				return 'BBC TWO WALES DIGITAL';
			case 20:
				return 'BBC THREE HD';
			case 21:
				return 'BBC FOUR HD';
			case 22:
				return 'CBBC HD';
			case 23:
				return 'CBEEBIES HD';
			case 24:
				return 'BBC SCOTLAND HD';
			case 25:
				return 'BBC NEWS CHANNEL HD';
			case 26:
				return 'BBC PARLIAMENT';
			case 27:
				return 'BBC ALBA';
			case 28:
				return 'S4C';
			case 29:
				return 'BBC WORLD NEWS AMERICA HD';
			default:
				return 'Unknown';
		}
	}
	export let form;
	// onmount
	onMount(() => {
		if (form?.status === 200) {
			const snackbar = document.getElementById('snackbar');
			if (snackbar) {
				snackbar.className = 'snackbar primary';
				snackbar.innerText = 'Successfully submitted form';
				snackbar.classList.add('active');
				setTimeout(() => {
					snackbar.className = snackbar.className.replace('active', '');
				}, 3000);
			}
		} else if (form?.status === 400) {
			const snackbar = document.getElementById('snackbar');
			if (snackbar) {
				snackbar.className = 'snackbar error';
				snackbar.innerText = form?.body || 'Failed to submit form';
				snackbar.classList.add('active');
				setTimeout(() => {
					snackbar.className = snackbar.className.replace('active', '');
				}, 3000);
			}
		}
	});
	let startMonth = new Date().toLocaleString('en-GB', {
		timeZone: 'Europe/London',
		month: 'numeric'
	});
	let startDay = new Date().toLocaleString('en-GB', { timeZone: 'Europe/London', day: 'numeric' });
	let startHour = new Date().toLocaleString('en-GB', {
		timeZone: 'Europe/London',
		hour: 'numeric'
	});
	let startMinute = new Date().toLocaleString('en-GB', {
		timeZone: 'Europe/London',
		minute: 'numeric'
	});
	let channel: number;
	let length = 0;
	let lengthUnit = 1;
	let endHour = 0;
	let endMinute = 0;
	let startSeconds = 0;
	async function submitForm() {
		const form = document.querySelector('form');

		form?.submit();
	}
	// Set the end time based on the start time and length(and keep it updated)
	$: {
		let totalMinutes = 0;
		if (lengthUnit === 0) {
			totalMinutes = Math.floor(length / 60);
		} else if (lengthUnit === 1) {
			totalMinutes = length;
		} else if (lengthUnit === 2) {
			totalMinutes = length * 60;
		}
		endHour = parseInt(startHour) + Math.floor(totalMinutes / 60);
		endMinute = parseInt(startMinute) + (totalMinutes % 60);
		if (endMinute > 59) {
			endHour++;
			endMinute -= 60;
		}
		endHour = endHour.toString().padStart(2, '0');
		endMinute = endMinute.toString().padStart(2, '0');
	}
</script>

{#if session}
	<aside
		class="border-2 p-4 mx-[22rem] md:mx-[8rem] my-10 border-black dark:border-white lg:grid md:grid lg:grid-cols-3 md:grid-cols-3"
	>
		<div class="flex flex-col justify-start items-start">
			<!-- Left aligned -->
			<h1 class="text-3xl pb-2 font-bold">From</h1>
			<div class="flex flex-row">
				<div class="w-20">
					<Input
						size="md"
						min="0"
						max="23"
						type="number"
						bind:value={startDay}
						class="rounded-r-none font-semibold"
					/>
				</div>
				<div class="w-20">
					<Input
						size="md"
						min="0"
						max="59"
						type="number"
						bind:value={startMonth}
						class="rounded-l-none font-semibold"
					/>
				</div>
			</div>

			<div class="flex items-center mt-2">
				<div class="w-20">
					<Input
						size="md"
						min="0"
						max="23"
						type="number"
						bind:value={startHour}
						class="rounded-r-none font-semibold"
					/>
				</div>
				<div class="w-20">
					<Input
						size="md"
						min="0"
						max="59"
						type="number"
						bind:value={startMinute}
						class="rounded-l-none font-semibold"
					/>
				</div>
			</div>
			<Select
				size="md"
				class="w-full mt-2 font-semibold"
				items={[
					{ value: '0', name: 'BBC ONE HD' },
					{ value: '1', name: 'BBC ONE WALES HD' },
					{ value: '2', name: 'BBC ONE SCOTLAND HD' },
					{ value: '3', name: 'BBC ONE NORTHERN IRELAND HD' },
					{ value: '4', name: 'BBC ONE CHANNEL ISLANDS HD' },
					{ value: '5', name: 'BBC ONE EAST HD' },
					{ value: '6', name: 'BBC ONE EAST MIDLANDS HD' },
					{ value: '7', name: 'BBC ONE EAST YORKSHIRE & LINCOLNSHIRE HD' },
					{ value: '8', name: 'BBC ONE LONDON HD' },
					{ value: '9', name: 'BBC ONE NORTH EAST HD' },
					{ value: '10', name: 'BBC ONE NORTH WEST HD' },
					{ value: '11', name: 'BBC ONE SOUTH HD' },
					{ value: '12', name: 'BBC ONE SOUTH EAST HD' },
					{ value: '13', name: 'BBC ONE SOUTH WEST HD' },
					{ value: '14', name: 'BBC ONE WEST HD' },
					{ value: '15', name: 'BBC ONE WEST MIDLANDS HD' },
					{ value: '16', name: 'BBC ONE YORKSHIRE HD' },
					{ value: '17', name: 'BBC TWO HD' },
					{ value: '18', name: 'BBC TWO NORTHERN IRELAND HD' },
					{ value: '19', name: 'BBC TWO WALES DIGITAL' },
					{ value: '20', name: 'BBC THREE HD' },
					{ value: '21', name: 'BBC FOUR HD' },
					{ value: '22', name: 'CBBC HD' },
					{ value: '23', name: 'CBEEBIES HD' },
					{ value: '24', name: 'BBC SCOTLAND HD' },
					{ value: '25', name: 'BBC NEWS CHANNEL HD' },
					{ value: '26', name: 'BBC PARLIAMENT' },
					{ value: '27', name: 'BBC ALBA' },
					{ value: '28', name: 'S4C' }
				]}
				bind:value={channel}
				placeholder="Select channel..."
			/>
		</div>
		<div class="flex flex-col justify-center items-center py-2">
			<ArrowRightOutline />
		</div>

		<div class="flex flex-col">
			<!-- Right aligned -->
			<h1 class="text-3xl pb-2 self-start font-bold">Length</h1>
			<div class="flex flex-row">
				<div class="mt-2 w-20">
					<Input size="md" type="number" bind:value={length} min="0" class="rounded-r-none font-semibold" />
				</div>
				<div class="mt-2 w-100">
					<Select
						size="md"
						class="font-semibold w-full rounded-l-none"
						items={[
							{ value: 0, name: 'Seconds' },
							{ value: 1, name: 'Minutes' },
							{ value: 2, name: 'Hours' }
						]}
						bind:value={lengthUnit}
					/>
				</div>
			</div>
			<h6 class="font-semibold text-md pt-4 self-start">Ends at {endHour}:{endMinute}</h6>
		</div>
	</aside>
	<div class="absolute flex flex-col justify-center items-center w-full -translate-y-[3.8rem]">
		<Button class="bg-black dark:bg-white dark:text-black font-bold" buttonClass="font-bold">Record</Button>
		<p class="pb-4">Status: Combining Audio & Video</p>
	</div>
{/if}
<form method="post">
	<input type="hidden" name="startMonth" bind:value={startMonth} required />
	<input type="hidden" name="startDay" bind:value={startDay} required />
	<input type="hidden" name="startHour" bind:value={startHour} required />
	<input type="hidden" name="startMinute" bind:value={startMinute} required />
	<input type="hidden" name="startSeconds" bind:value={startSeconds} required />
	<input type="hidden" name="channel" bind:value={channel} required />
	<input type="hidden" name="user" value={id} required />
	<input type="hidden" name="length" bind:value={length} required />
	<input type="hidden" name="lengthUnit" bind:value={lengthUnit} required />
</form>

<div class="space" />

{#await getRecordings()}
	<p>Fetching recordings...</p>
{:then recordings}
	<div class="flex justify-center">
		<table class="mx-[22rem] my-2 border-black dark:border-white w-full table-auto">
			<thead>
				<tr>
					<th>Date</th>
					<th>Time</th>
					<th>Channel</th>
					<th>Status</th>
					<th></th>
				</tr>
			</thead>
			<tbody class="divide-y border-2 border-black dark:border-white">
				{#each recordings ?? [] as recording}
					<tr
						><td class="p-2 border-2 border-black dark:border-white">
							{(() => {
								const startDate = new Date(recording.rec_start * 1000);
								const endDate = new Date(recording.rec_end * 1000);
								const sameDay =
									startDate.getDate() === endDate.getDate() &&
									startDate.getMonth() === endDate.getMonth() &&
									startDate.getFullYear() === endDate.getFullYear();
								return sameDay
									? startDate.toLocaleDateString('en-GB', { month: 'short', day: '2-digit' })
									: startDate.toLocaleDateString('en-GB', { month: 'short', day: '2-digit' }) +
											' - ' +
											endDate.toLocaleDateString('en-GB', { month: 'short', day: '2-digit' });
							})()}
						</td>
						<td class="p-2 border-2 border-black dark:border-white">
							{(() => {
								const startDate = new Date(recording.rec_start * 1000);
								const endDate = new Date(recording.rec_end * 1000);
								return (
									startDate.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) +
									' - ' +
									endDate.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
								);
							})()}
						</td>
						<td class="p-2 border-2 border-black dark:border-white"
							>{channelString(recording.channel)}</td
						>
						<td class="p-2 border-2 border-black dark:border-white"
							>{statusString(recording.status)}</td
						>
						<td class="p-2 border-2 border-black dark:border-white"
							><a href="/express/download/{recording.uuid}"><LinkOutline /></a></td
						>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{:catch error}
	<p>Failed to fetch recordings: {error.message}</p>
{/await}
<div class="flex justify-center hidden">
	<Toast
		dismissable={true}
		contentClass="flex space-x-4 rtl:space-x-reverse divide-x rtl:divide-x-reverse divide-gray-200 dark:divide-gray-700"
	>
		<PaperPlaneOutline class="w-5 h-5 text-primary-600 dark:text-primary-500 rotate-45" />
		<div class="ps-4 text-sm font-normal">Message sent successfully.</div>
	</Toast>
</div>
