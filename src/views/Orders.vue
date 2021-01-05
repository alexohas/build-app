<template>
	<div class="p-5">
		<div class="d-flex justify-content-between mb-3">
			<button class="btn btn-default border" @click="$router.go(-1)">
				Back
			</button>
		</div>
		<h3>Orders</h3>

		<div class="row">
			<div class="col-3">
				<form class="mt-5 border p-5">
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
						<button type="button" @click="checkoutBtn" class="btn btn-primary">
							Fetch Orders
						</button>
					</div>
				</form>
			</div>
			<div class="col-6">
				<!-- checkout form here -->
				<div class=" w-100 p-5 border">
					<div v-if="orders.length === 0">
						Enter your name or phone number to fetch your orders
					</div>
					<div v-for="(order, i) of orders" :key="i" class="border p-2">
						<p class="w-100 d-flex justify-content-between">
							<span> Total cost of order: £{{ order.total }} </span>
							<span>
								Placed on: {{ new Date(order.createdAt).toDateString() }}
							</span>
						</p>
						<div
							class=" px-5 py-2 mb-2"
							v-for="(item, i) of order.contents"
							:key="i"
						>
							<div class="d-flex justify-content-between align-items-center">
								<div class="d-flex justify-content-start align-items-center">
									<div class="mr-3">
										<img
											:src="item.lesson.image"
											style="height: 100px; width: 100px; border-radius: 10px"
											alt=""
										/>
									</div>
									<div class="pt-2 text-capitalize">
										<p>
											Subject:
											{{ item.lesson.lesson }}
										</p>
										<p>
											Location:
											{{ item.lesson.location }}
										</p>
										<p>Unit Price: £{{ item.lesson.price }}</p>
									</div>
								</div>
								<div>
									<p>Qty: {{ item.quantity }}</p>
									<p>Total Price: £{{ item.total }}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
/* eslint-disable */
import {mapMutations, mapGetters} from 'vuex'
import {fetch_orders} from '../apis/lessons.js'
export default {
	name: 'Home',
	components: {},
	mounted() {},
	data() {
		return {
			user: {
				name: '',
				phone: ''
			},
			orders: []
		}
	},
	computed: {},
	methods: {
		checkoutBtn: async function() {
			try {
				let result = await fetch_orders(
					JSON.stringify({
						user: this.user
					})
				)
				this.orders = result.orders
			} catch (error) {
				console.log(error.message)
			}
		}
	}
}
</script>

<style scoped></style>
