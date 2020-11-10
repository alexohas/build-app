<template>
	<div class="d-flex justify-content-center pt-5">
		<div class="card w-50 p-5 text-justify">
			<h3>Congratulations</h3>
			<p>
				Thank you for placing your order. Someone will get in touch with you to
				discuss delivery.
			</p>
			<p>Thank you</p>
			<button class="btn btn-default border" @click="$router.push('/')">
				Back to Lessons
			</button>
		</div>
	</div>
</template>

<script>
/* eslint-disable */
import {mapMutations, mapGetters} from 'vuex'
export default {
	name: 'Home',
	components: {},
	mounted() {
		this.clearLessons()
	},
	data() {
		return {}
	},

	methods: {
		...mapMutations(['clearLessons'])
	}
}
</script>

<style scoped></style>
