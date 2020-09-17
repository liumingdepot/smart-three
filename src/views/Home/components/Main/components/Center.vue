<template>
	<div class="center">
		<!-- 雾泡机 -->
		<div class="cannon"><img @click="changeType(4)" src="@/assets/image/cannon.png" /></div>
		<!-- 榨机 -->
		<div class="Turnstile"><img @click="changeType(3)" src="@/assets/image/Turnstile.png" /></div>
		<!-- 飞机 -->
		<div class="drone">
			<img class="img1" src="@/assets/image/drone.png" @click="changeType(2)" />
			<img class="img" src="@/assets/image/ccc.png" alt="" />
		</div>
		<div class="item" v-for="item in items" :key="item.channelNo" @click="clickItem(item)" :class="'item' + item.channelNo">
			<img class="a" src="@/assets/image/a.png" />
			<img class="b" src="@/assets/image/b.png" />
			<div class="c">
				<img style="width: 192px;height: 108px" :src="item.img" :alt="item.name" />
				<div>{{ item.name }}</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			items: []
		};
	},
	created() {
		this.getVideo();
	},
	methods: {
		async getVideo() {
			const p1 = await this.$axios({
				url: 'videoConfig/videoList',
				method: 'get'
			});
			const videoList = p1.video;

			const p2 = await this.$axios({
				url: 'api/lapp/token/get',
				method: 'POST',
				params: {
					appKey: '9090fc50a1114f51b51f909ae4ca4eb6',
					appSecret: 'a21e0a851be69756ea2d7c792155fe59'
				},
				type: true
			});

			const accessToken = p2.data.accessToken;
			const p3 = await this.$axios({
				url: 'api/lapp/live/video/list',
				method: 'POST',
				params: {
					accessToken: accessToken,
					pageStart: 0,
					pageSize: 50
				},
				type: true
			});
			const data = p3.data;

			for (let item of data) {
				for (let val of videoList) {
					if (val.tdh == item.channelNo) {
						this.items.push({
							...item,
							name: val.tdmc,
							img: val.imgurl,
							accessToken
						});
					}
				}
			}
		},
		clickItem(item) {
			this.$emit('changeType', item);
		},
		changeType(index) {
			this.$emit('changeType', index);
		}
	}
};
</script>

<style scoped lang="scss">
@keyframes myfirst {
	from {
		transform: scale(0.8);
	}
	to {
		transform: scale(1.2);
	}
}

@keyframes myfirst1 {
	0% {
		transform: rotate(-30deg);
	}
	50% {
		transform: rotate(10deg);
	}
	100% {
		transform: rotate(-30deg);
	}
}

@keyframes myfirst2 {
	0% {
		opacity: 0;
	}
	25% {
		opacity: 1;
	}
	50% {
		opacity: 0;
	}
	70% {
		opacity: 1;
	}
	100% {
		opacity: 0;
	}
}

@keyframes myfirst3 {
	from {
		top: 15.75rem;
	}
	to {
		top: 14.75rem;
	}
}

.center {
	position: relative;
	z-index: 1;

	.cannon {
		position: absolute;
		right: 17.125rem;
		top: 15.75rem;
		transform: translate(-20px, 100px);
		cursor: pointer;
	}

	.Turnstile {
		position: absolute;
		right: 11.125rem;
		top: 17.75rem;
		transform: translate(90px, 140px);
		cursor: pointer;
	}

	.drone {
		position: absolute;
		right: 13.125rem;
		top: 15.75rem;
		transform: translate(-350px, -150px);
		cursor: pointer;

		.img1 {
			animation: myfirst1 10s 9999;
			cursor: pointer;
			z-index: 999;
		}

		.img {
			animation: myfirst2 5s 9999;
			position: absolute;
			left: -260px;
			top: 50px;
			z-index: -99;
		}
	}

	.item {
		position: absolute;
		left: 18.25rem;
		top: 16rem;

		&:hover {
			.c {
				display: block;
			}
		}

		.a {
			animation: myfirst 2s 9999;
		}

		.b {
			position: absolute;
			left: 8px;
			top: -50px;
			cursor: pointer;
		}

		.c {
			display: none;
			position: absolute;
			left: 0;
			top: -200px;
			width: 192px;
			z-index: 99;
			padding: 6px 10px;
			text-align: center;
			color: #fff;
			background-color: #0d0d0d;
			box-shadow: 0px 11px 8px 0px rgba(0, 0, 0, 0.29);
			border-radius: 10px;
			border: solid 1px rgba(0, 204, 255, 0.13);
			opacity: 0.8;
		}
	}

	.item1 {
		transform: translate(520px, 120px);
	}

	.item2 {
		transform: translate(500px, 150px);
	}

	.item3 {
		transform: translate(610px, 105px);
	}

	.item4 {
		transform: translate(565px, 210px);
	}

	.item5 {
		transform: translate(518px, 185px);
	}

	.item6 {
		transform: translate(500px, 75px);
	}

	.item7 {
		transform: translate(355px, 145px);
	}

	.item8 {
		transform: translate(335px, 135px);
	}

	.item9 {
		transform: translate(430px, 175px);
	}

	.item10 {
		transform: translate(315px, 185px);
	}

	.item11 {
		transform: translate(210px, 190px);
	}

	.item12 {
		transform: translate(95px, 175px);
	}

	.item13 {
		transform: translate(75px, 175px);
	}

	.item14 {
		transform: translate(55px, 190px);
	}

	.item15 {
		transform: translate(-20px, 240px);
	}

	.item16 {
		transform: translate(-123px, 201px);
	}

	.item17 {
		transform: translate(-110px, 150px);
	}

	.item18 {
		transform: translate(-158px, 107px);
	}

	.item19 {
		transform: translate(-199px, 130px);
	}

	.item20 {
		transform: translate(-180px, 159px);
	}

	.item21 {
		transform: translate(570px, 170px);
	}

	.item22 {
		transform: translate(400px, 60px);
	}

	.item23 {
		transform: translate(380px, 60px);
	}
}
</style>
