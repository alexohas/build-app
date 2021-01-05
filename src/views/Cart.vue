<template>
	<div class="p-5">
		<div class="d-flex justify-content-between mb-3">
			<button class="btn btn-default border" @click="$router.go(-1)">
				Back
			</button>
		</div>
		<h3>Cart</h3>

		<div class="row">
			<div class="col-7">
				<!-- the cart items show here -->
				<div class="border px-5 py-2 mb-2" v-for="(item, i) of cart" :key="i">
					<div class="d-flex justify-content-between align-items-center">
						<div class="d-flex justify-content-start align-items-center">
							<div class="mr-3">
								<img
									:src="lessons.find((e) => e._id === item.lesson).image"
									style="height: 100px; width: 100px; border-radius: 10px"
									alt=""
								/>
							</div>
							<div class="pt-2 text-capitalize">
								<p>
									Subject:
									{{ lessons.find((e) => e._id === item.lesson).lesson }}
								</p>
								<p>
									Location:
									{{ lessons.find((e) => e._id === item.lesson).location }}
								</p>
								<p>
									Unit Price: £{{
										lessons.find((e) => e._id === item.lesson).price
									}}
								</p>
							</div>
						</div>
						<div>
							<p>
								<input
									:id="item.lesson"
									min="1"
									:max="
										lessons.find((e) => e._id === item.lesson).space +
											cart[i].quantity
									"
									@change="(e) => changeQty(i, item, e)"
									class="form-control"
									type="number"
									v-model="cart[i].quantity"
								/>
							</p>
							<p>Total Price: £{{ item.total }}</p>
							<button @click="removeItem(i, item)" class="btn btn-warning">
								Remove
							</button>
						</div>
					</div>
				</div>
			</div>
			<div class="col-5">
				<!-- checkout form here -->
				<div class="border w-100 p-5">
					<h5>Total Payable: £{{ computeTotal }}</h5>

					<form class="mt-5">
						<div class="form-group">
							<label for="exampleFormControlInput1">Full Name</label>
							<input
								v-model="user.name"
								type="text"
								class="form-control"
								id="exampleFormControlInput1"
								placeholder="Josiah Iggah"
							/>
						</div>

						<div class="form-group">
							<label for="exampleFormControlInput1">Phone Number</label>
							<input
								v-model="user.phone"
								type="number"
								class="form-control"
								id="exampleFormControlInput1"
								placeholder="201885109"
							/>
						</div>

						<div class="form-group">
							<button
								type="button"
								@click="checkoutBtn"
								class="btn btn-primary"
								v-if="validatePhone && validateName"
							>
								Checkout Now
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
/* eslint-disable */
import {mapMutations, mapGetters} from 'vuex'
import {place_order} from '../apis/lessons.js'
export default {
	name: 'Home',
	components: {},
	mounted() {},
	data() {
		return {
			user: {
				name: '',
				phone: ''
			}
		}
	},
	computed: {
		...mapGetters(['lessons', 'cart']),
		computeTotal() {
			let total = 0
			for (let item of this.cart) {
				total = total + item.total
			}
			return total
		},

		validatePhone() {
			var phoneno = /^\d{10}$/
			if (this.user.phone.match(phoneno)) {
				return true
			} else {
				return false
			}
		},
		validateName() {
			var name = /^[a-zA-Z ]+$/
			if (this.user.name.match(name)) {
				return true
			} else {
				return false
			}
		}
	},
	methods: {
		...mapMutations(['addToCart', 'clearLessons']),
		checkoutBtn: async function() {
			try {
				let result = await place_order(
					JSON.stringify({
						contents: this.cart,
						user: this.user,
						total: this.computeTotal
					})
				)

				this.$router.push('/confirmation')
			} catch (error) {
				console.log(error.message)
			}
		},
		changeQty(i, item) {
			let old =
				this.cart[i].total /
				this.lessons.find((e) => e._id === item.lesson).price
			this.cart[i].total =
				this.cart[i].quantity *
				this.lessons.find((e) => e._id === item.lesson).price
			if (this.cart[i].quantity > old) {
				this.lessons.find((e) => e._id === item.lesson).space--
			} else {
				this.lessons.find((e) => e._id === item.lesson).space++
			}
		},
		removeItem(i, item) {
			let old =
				this.cart[i].total /
				this.lessons.find((e) => e._id === item.lesson).price
			this.lessons.find((e) => e._id === item.lesson).space++

			this.cart.splice(i, 1)
			if (this.cart.length === 0) {
				this.$router.push('/')
			}
		},
		viewCart() {
			this.$router.push('/cart')
		}
	}
}
</script>

<style scoped></style>
