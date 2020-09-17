<template>
	<div className="section">
		<Top />
		<div class="common">
			<Center @changeType="changeType" />
			<v-video v-if="type == 1" @changeType="changeType" :item="item" />
			<v-drone v-if="type == 2" @changeType="changeType" />
			<v-table v-if="type == 3" @changeType="changeType"/>
			<Cannon v-if="type == 4" @changeType="changeType" />
		</div>
		<Bottom />
	</div>
</template>

<script>
import Top from './components/Top.vue';
import Center from './components/Center.vue';
import Bottom from './components/Bottom.vue';
import vVideo from './components/Video.vue';
import vDrone from './components/Drone.vue';
import vTable from './components/Table.vue';
import Cannon from './components/Cannon.vue';
import bus from '@/bus/bus'
export default {
	name: 'Home',
	components: {
		Top,
		Center,
		Bottom,
		vVideo,
		vTable,
		vDrone,
		Cannon
	},
	data() {
		return {
			type: 0,
			item: {}
		};
	},
	created(){
		bus.$on('changeName', () => {
			this.type = 3
		})
	},
	methods: {
		changeType(index) {
			if (typeof index == 'number') {
				this.type = index;
			} else {
				this.type = 1;
				this.item = index;
			}
		}
	}
};
</script>

<style scoped>
.common {
	height: calc(100% - 300px);
}
</style>
