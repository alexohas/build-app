<template>
	<div>
		<h3>Cart</h3>
	</div>
</template>

<script>
/* eslint-disable */
import {mapMutations, mapGetters} from 'vuex'
export default {
	name: 'Home',
	components: {},
	mounted() {},
	computed: {
		...mapGetters(['lessons', 'cart'])
	},
	methods: {
		...mapMutations(['addToCart']),

		viewCart() {
			this.$router.push('/cart')
		}
	}
}
</script>

<style scoped></style>
