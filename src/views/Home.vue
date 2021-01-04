<template>
	<div class="home p-5">
		<div class="d-flex justify-content-between align-items-center">
			<h3>Available Lessons</h3>
			<div>
				<div class="form-inline">
					<div class="form-group mb-2 mr-3">
						<h5 for="staticEmail2">Sort</h5>
					</div>
					<div class="form-group mb-2">
						<label for="staticEmail2" class="sr-only">Sort</label>
						<select class="form-control" v-model="sort">
							<option value="lesson">Subject</option>
							<option value="location">Location</option>
							<option value="price">Price</option>
							<option value="space">Availability</option>
						</select>
					</div>
					<div class="form-group mx-sm-3 mb-2">
						<label for="inputPassword2" class="sr-only">Direction</label>
						<select class="form-control" v-model="dir">
							<option value="asc">Ascending</option>
							<option value="desc">Descending</option>
						</select>
					</div>
					<div class="form-group mx-sm-3 mb-2">
						<button
							v-if="cart.length > 0"
							class="btn btn-success"
							@click="viewCart"
						>
							View Cart ({{ cart.length }})
						</button>
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-12" v-for="(lesson, i) of computedLessons" :key="i">
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
						<button
							:disabled="lesson.space === 0"
							class="btn btn-primary"
							@click="addCart(lesson.id, i)"
						>
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
	data() {
		return {
			sort: 'price',
			dir: 'desc'
		}
	},
	mounted() {
		this.loadLessons()
	},
	computed: {
		...mapGetters(['lessons', 'cart']),
		computedLessons() {
			if (this.sort && this.dir) {
				switch (this.sort) {
					case 'price':
						this.lessons.sort((a, b) => {
							if (a.price < b.price) {
								return -1
							}
							if (a.price > b.price) {
								return 1
							}
							return 0
						})
						if (this.dir === 'desc') {
							this.lessons.reverse()
						}
						return this.lessons
						break
					case 'location':
						this.lessons.sort((a, b) => a.location.localeCompare(b.location))
						if (this.dir === 'desc') {
							this.lessons.reverse()
						}
						return this.lessons
					case 'space':
						this.lessons.sort((a, b) => {
							if (a.space < b.space) {
								return -1
							}
							if (a.space > b.space) {
								return 1
							}
							return 0
						})
						if (this.dir === 'desc') {
							this.lessons.reverse()
						}
						return this.lessons
						break
					case 'lesson':
						this.lessons.sort((a, b) => a.lesson.localeCompare(b.lesson))
						if (this.dir === 'desc') {
							this.lessons.reverse()
						}
						return this.lessons
						break
				}
			} else {
				return this.lessons
			}
		}
	},
	methods: {
		...mapMutations(['addLesson', 'clearLessons', 'addToCart']),
		loadLessons() {
			if (this.lessons.length === 0) {
				let lessons = this.$lessons(3)
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
				this.cart[exist].total = this.cart[exist].total + current.price
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
