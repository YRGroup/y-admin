<template>
	<section>
		<div class="ttt">
			<span>less OK </span>
		this is class manage main page

		</div>

	</section>
</template>
<script>
	import { mapGetters } from 'vuex';
	export default {
		data() {
			return {
				
			}
		},
		computed: {
			dynamicList() {
				if (!this.$store.getters.dynamicList.length) {
					return this.getDynamicList();
				}
				return this.$store.getters.dynamicList;
			},
			...mapGetters({
				loading: 'listLoading',
			})
		},
		methods: {
			getDynamicList() {
				let para = {
					cid: this.filters.id||16,
					count:0,					
					type: this.dynamicType
				};
				this.$store.dispatch('getDynamicList',para);
			},
		},
	};

</script>

<style lang="less" scoped>
.ttt{
	line-height: 200px;
	text-align: center;
	span{
		background: yellow;
	}
}
</style>
