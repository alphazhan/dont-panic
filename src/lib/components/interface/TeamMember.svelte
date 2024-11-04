<script lang="ts">
	export let name: string;
	export let username: string;
	export let role: string;
</script>

<li class="flex items-center py-2">
	<span class="text-lg font-semibold text-blue-700">{name}</span>
	<span class="ml-2 text-sm text-gray-500">@{username}</span>
	<span class="ml-auto text-gray-700">— {role}</span>
</li>
