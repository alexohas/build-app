<template>
	<div id="app">
		<div class="text-left px-5 py-2">
			<button class="btn btn-info" @click="reset">Reset System</button>
		</div>
		<router-view />
	</div>
</template>

<script>
/* eslint-disable */
import {mapMutations, mapGetters} from 'vuex'
export default {
	name: 'Home',
	components: {},
	mounted() {},

	methods: {
		...mapMutations(['addLesson', 'clearLessons']),
		loadLessons() {
			let lessons = this.$lessons(20)
			let id = 1
			for (let lesson of lessons) {
				if (lesson) {
					lesson.id = id
					this.addLesson(lesson)
				}
				id++
			}
		},
		reset() {
			this.clearLessons()
			this.loadLessons()
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
