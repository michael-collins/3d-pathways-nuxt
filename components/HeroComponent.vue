<template>
	<div class="hero bg-base-200 py-10 rounded-lg ">
		<div class="hero-content text-left ">
			<div class="max-w-md">
				<h1 class="text-xl md:4xl lg:text-5xl font-bold">{{ title }}</h1>
				<p class="py-6">
					<slot name="description"></slot>
				</p>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		title: {
			type: String,
			required: true
		}
	}
}
</script>