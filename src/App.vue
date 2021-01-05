<template>
	<div id="app">
		<div class="text-left px-5 py-2">
			<button class="btn btn-info" @click="reset">Reset System</button>
			<a class="btn btn-danger ml-3" @click.prevent="$router.push('/orders')"
				>View Orders</a
			>
		</div>
		<router-view />
	</div>
</template>

<script>
/* eslint-disable */
import {mapMutations, mapGetters} from 'vuex'
import {lessons} from './apis/lessons.js'
export default {
	name: 'Home',
	components: {},
	mounted() {},

	methods: {
		...mapMutations(['addLesson', 'clearLessons']),
		loadLessons: async function() {
			try {
				let result = await lessons()
				this.clearLessons()
				for (let lesson of result.lessons) {
					this.addLesson(lesson)
				}
			} catch (error) {
				console.log(error.message)
			}
		},
		reset() {
			this.loadLessons()
			this.$router.push('/')
		}
	}
}
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
}

#nav {
	padding: 30px;
}

#nav a {
	font-weight: bold;
	color: #2c3e50;
}

#nav a.router-link-exact-active {
	color: #42b983;
}
</style>
