<script lang="ts">
	import ArrowRight from "lucide-svelte/icons/arrow-right";
</script>

<section class="bg-white dark:bg-gray-900">
	<div class="mx-auto grid max-w-screen-xl px-4 py-8 lg:grid-cols-12 lg:gap-8 lg:py-16 xl:gap-0">
		<div class="mr-auto place-self-center lg:col-span-7">
			<h1
				class="mb-4 max-w-2xl text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-white"
			>
				Skills-Based Volunteering Platform
			</h1>
			<p
				class="mb-6 max-w-2xl font-light text-gray-500 md:text-lg lg:mb-8 lg:text-xl dark:text-gray-400"
			>
				A skills-based volunteering platform which has primarily focus on connecting volunteers with
				organisations that need their specific skills and expertise.
			</p>
			<a
				href="/register"
				class="bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 dark:focus:ring-primary-900 mr-3 inline-flex items-center justify-center rounded-lg px-5 py-3 text-center text-base font-medium text-white focus:ring-4 gap-2"
			>
				Get started
				<ArrowRight />
			</a>
		</div>
		<div class="hidden lg:col-span-5 lg:mt-0 lg:flex">
			<img
				src="image.png"
				alt="mockup"
			/>
		</div>
	</div>
</section>
