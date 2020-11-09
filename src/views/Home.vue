<template>
	<div class="home p-5">
		<div class="d-flex justify-content-between align-items-center">
			<h3>Available Lessons</h3>
			<button class="btn btn-success" @click="viewCart">
				View Cart ({{ cart.length }})
			</button>
		</div>
		<div class="row">
			<div class="col-12" v-for="(lesson, i) of lessons" :key="i">
				<div
					class="border px-5 py-2 my-2 d-flex justify-content-between align-items-center"
				>
					<div class="d-flex justify-content-start align-items-center">
						<div class="mr-3">
							<img
								:src="lesson.image"
								style="height: 100px; width: 100px; border-radius: 10px"
								alt=""
							/>
						</div>
						<div class="pt-2 text-capitalize">
							<p>Subject: {{ lesson.lesson }}</p>
							<p>Location: {{ lesson.location }}</p>
							<p>Spaces Left: {{ lesson.space }}</p>
						</div>
					</div>
					<div>
						<p>Price: £{{ lesson.price }}</p>
						<button class="btn btn-primary" @click="addCart(lesson.id, i)">
							Add to cart
						</button>
					</div>
				</div>
			</div>
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
		this.loadLessons()
	},
	computed: {
		...mapGetters(['lessons', 'cart'])
	},
	methods: {
		...mapMutations(['addLesson', 'clearLessons', 'addToCart']),
		loadLessons() {
			if (this.lessons.length === 0) {
				let lessons = this.$lessons(30)
				let id = 1
				for (let lesson of lessons) {
					if (lesson) {
						lesson.id = id
						this.addLesson(lesson)
					}
					id++
				}
			}
		},
		addCart(lesson, index) {
			let exist = this.cart.findIndex((e) => e.lesson === lesson)
			let current = this.lessons[index]
			if (exist !== -1) {
				this.cart[exist].quantity++
			} else {
				let item = {
					lesson,
					quantity: 1,
					total: current.price
				}
				this.addToCart(item)
			}

			this.lessons[index].space--
		},
		viewCart() {
			this.$router.push('/cart')
		}
	}
}
</script>
