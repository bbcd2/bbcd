<script>
	import { createClient } from '@supabase/supabase-js';
	import { onMount } from 'svelte';
	const client = createClient(
		'https://hlbdezevgntxspmvfmyv.supabase.co',
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhsYmRlemV2Z250eHNwbXZmbXl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQzNTA1ODksImV4cCI6MjAyOTkyNjU4OX0.U1pYhVQLSPUegwEaeBwMcApFYMUKzkrQDYo8lkxBIac'
	);
	// Get the last 15 records from the recordings table
	const getRecordings = async () => {
		const { data, error } = await client
			.from('recordings')
			.select('*')
			.limit(15)
			.order('created_at', { ascending: false });
		if (error) console.log('error', error.message);
		return data;
	};
	function statusString(status) {
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
	function channelString(channel) {
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
			default:
				return 'Unknown';
		}
	}
	export let data;
	export let form;
	// onmount
	onMount(() => {
		if (form?.status === 200) {
			const snackbar = document.getElementById('snackbar');
			snackbar.className = 'snackbar primary';
			snackbar.innerText = 'Successfully submitted form';
			snackbar.classList.add('active');
			setTimeout(() => {
				snackbar.className = snackbar.className.replace('active', '');
			}, 3000);
		} else if (form?.status === 400) {
			const snackbar = document.getElementById('snackbar');
			snackbar.className = 'snackbar error';
			snackbar.innerText = form?.body || 'Failed to submit form';
			snackbar.classList.add('active');
			setTimeout(() => {
				snackbar.className = snackbar.className.replace('active', '');
			}, 3000);
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
	let endMonth = new Date().toLocaleString('en-GB', {
		timeZone: 'Europe/London',
		month: 'numeric'
	});
	let endDay = new Date().toLocaleString('en-GB', { timeZone: 'Europe/London', day: 'numeric' });
	let endHour = new Date().toLocaleString('en-GB', { timeZone: 'Europe/London', hour: 'numeric' });
	let endMinute = new Date().toLocaleString('en-GB', {
		timeZone: 'Europe/London',
		minute: 'numeric'
	});
	let channel = null;
	async function submitForm() {
		const form = document.querySelector('form');
		form.submit();
	}
</script>

<h2>BBCD2</h2>
<p>Not at all affiliated with the original BBCD</p>
<h4>Start time</h4>
<div class="grid l">
	<div class="s1">
		<div class="field label border round">
			<input type="number" bind:value={startMonth} />
			<label>Month</label>
		</div>
	</div>
	<!--Day, hour, minute, second-->
	<div class="s1">
		<div class="field label border round">
			<input type="number" bind:value={startDay} />
			<label>Day</label>
		</div>
	</div>
	<div class="s1">
		<div class="field label border round">
			<input type="number" bind:value={startHour} />
			<label>Hour</label>
		</div>
	</div>
	<div class="s1">
		<div class="field label border round">
			<input type="number" bind:value={startMinute} />
			<label>Minute</label>
		</div>
	</div>
</div>
<div class="s m">
	<div class="field label border round">
		<input type="number" bind:value={startMonth} />
		<label>Month</label>
	</div>
	<div class="field label border round">
		<input type="number" bind:value={startDay} />
		<label>Day</label>
	</div>
	<div class="field label border round">
		<input type="number" bind:value={startHour} />
		<label>Hour</label>
	</div>
	<div class="field label border round">
		<input type="number" bind:value={startMinute} />
		<label>Minute</label>
	</div>
</div>
<h4>End time</h4>
<div class="grid l">
	<div class="s1">
		<div class="field label border round">
			<input type="number" bind:value={endMonth} />
			<label>Month</label>
		</div>
	</div>
	<!--Day, hour, minute, second-->
	<div class="s1">
		<div class="field label border round">
			<input type="number" bind:value={endDay} />
			<label>Day</label>
		</div>
	</div>
	<div class="s1">
		<div class="field label border round">
			<input type="number" bind:value={endHour} />
			<label>Hour</label>
		</div>
	</div>
	<div class="s1">
		<div class="field label border round">
			<input type="number" bind:value={endMinute} />
			<label>Minute</label>
		</div>
	</div>
</div>
<div class="s m">
	<div class="field label border round">
		<input type="number" bind:value={endMonth} />
		<label>Month</label>
	</div>
	<div class="field label border round">
		<input type="number" bind:value={endDay} />
		<label>Day</label>
	</div>
	<div class="field label border round">
		<input type="number" bind:value={endHour} />
		<label>Hour</label>
	</div>
	<div class="field label border round">
		<input type="number" bind:value={endMinute} />
		<label>Minute</label>
	</div>
</div>
<div class="grid l">
	<div class="s4">
		<div class="field label suffix border round">
			<select bind:value={channel}>
				<option value="0">BBC ONE HD</option>
				<option value="1">BBC ONE WALES HD</option>
				<option value="2">BBC ONE SCOTLAND HD</option>
				<option value="3">BBC ONE NORTHERN IRELAND HD</option>
				<option value="4">BBC ONE CHANNEL ISLANDS HD</option>
				<option value="5">BBC ONE EAST HD</option>
				<option value="6">BBC ONE EAST MIDLANDS HD</option>
				<option value="7">BBC ONE EAST YORKSHIRE & LINCOLNSHIRE HD</option>
				<option value="8">BBC ONE LONDON HD</option>
				<option value="9">BBC ONE NORTH EAST HD</option>
				<option value="10">BBC ONE NORTH WEST HD</option>
				<option value="11">BBC ONE SOUTH HD</option>
				<option value="12">BBC ONE SOUTH EAST HD</option>
				<option value="13">BBC ONE SOUTH WEST HD</option>
				<option value="14">BBC ONE WEST HD</option>
				<option value="15">BBC ONE WEST MIDLANDS HD</option>
				<option value="16">BBC ONE YORKSHIRE HD</option>
				<option value="17">BBC TWO HD</option>
				<option value="18">BBC TWO NORTHERN IRELAND HD</option>
				<option value="19">BBC TWO WALES DIGITAL</option>
				<option value="20">BBC THREE HD</option>
				<option value="21">BBC FOUR HD</option>
				<option value="22">CBBC HD</option>
				<option value="23">CBEEBIES HD</option>
				<option value="24">BBC SCOTLAND HD</option>
				<option value="25">BBC NEWS CHANNEL HD</option>
				<option value="26">BBC PARLIAMENT</option>
				<option value="27">BBC ALBA</option>
				<option value="28">S4C</option>
			</select>

			<label>Channel</label>
			<i>arrow_drop_down</i>
		</div>
	</div>
</div>
<div class="s m">
	<div class="field label suffix border round">
		<select bind:value={channel}>
			<option value="0">BBC ONE HD</option>
			<option value="1">BBC ONE WALES HD</option>
			<option value="2">BBC ONE SCOTLAND HD</option>
			<option value="3">BBC ONE NORTHERN IRELAND HD</option>
			<option value="4">BBC ONE CHANNEL ISLANDS HD</option>
			<option value="5">BBC ONE EAST HD</option>
			<option value="6">BBC ONE EAST MIDLANDS HD</option>
			<option value="7">BBC ONE EAST YORKSHIRE & LINCOLNSHIRE HD</option>
			<option value="8">BBC ONE LONDON HD</option>
			<option value="9">BBC ONE NORTH EAST HD</option>
			<option value="10">BBC ONE NORTH WEST HD</option>
			<option value="11">BBC ONE SOUTH HD</option>
			<option value="12">BBC ONE SOUTH EAST HD</option>
			<option value="13">BBC ONE SOUTH WEST HD</option>
			<option value="14">BBC ONE WEST HD</option>
			<option value="15">BBC ONE WEST MIDLANDS HD</option>
			<option value="16">BBC ONE YORKSHIRE HD</option>
			<option value="17">BBC TWO HD</option>
			<option value="18">BBC TWO NORTHERN IRELAND HD</option>
			<option value="19">BBC TWO WALES DIGITAL</option>
			<option value="20">BBC THREE HD</option>
			<option value="21">BBC FOUR HD</option>
			<option value="22">CBBC HD</option>
			<option value="23">CBEEBIES HD</option>
			<option value="24">BBC SCOTLAND HD</option>
			<option value="25">BBC NEWS CHANNEL HD</option>
			<option value="26">BBC PARLIAMENT</option>
			<option value="27">BBC ALBA</option>
			<option value="28">S4C</option>
		</select>

		<label>Channel</label>
		<i>arrow_drop_down</i>
	</div>
</div>
<button on:click={submitForm}>Submit</button>

<form method="post">
	<input type="hidden" name="startMonth" bind:value={startMonth} required />
	<input type="hidden" name="startDay" bind:value={startDay} required />
	<input type="hidden" name="startHour" bind:value={startHour} required />
	<input type="hidden" name="startMinute" bind:value={startMinute} required />
	<input type="hidden" name="endMonth" bind:value={endMonth} required />
	<input type="hidden" name="endDay" bind:value={endDay} required />
	<input type="hidden" name="endHour" bind:value={endHour} required />
	<input type="hidden" name="endMinute" bind:value={endMinute} required />
	<input type="hidden" name="channel" bind:value={channel} required />
</form>

<div class="space" />

{#await getRecordings()}
	<p>Fetching recordings...</p>
{:then recordings}
	<table class="border scroll">
		<tr>
			<th>Start Time</th>
			<th>End Time</th>
			<th>Channel</th>
			<th>Status</th>
			<th>Download</th>
		</tr>

		{#each recordings as recording}
			<tr>
				<td
					>{new Date(recording.rec_start * 1000).toLocaleString('en-GB', {
						timeZone: 'Europe/London'
					})}</td
				>
				<td
					>{new Date(recording.rec_end * 1000).toLocaleString('en-GB', {
						timeZone: 'Europe/London'
					})}</td
				>
				<td>{channelString(parseInt(recording.channel))}</td>
				<td>{statusString(recording.status)}</td>
				<td><u><a href="/express/download/{recording.uuid}">Click</a></u></td>
			</tr>
		{/each}
	</table>
{:catch error}
	<p>Failed to fetch recordings: {error.message}</p>
{/await}
<div id="snackbar" class="snackbar error">Some text here</div>
