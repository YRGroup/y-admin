<template>
	<section>

		<el-card class="box-card">
			<!-- <div slot="header" class="clearfix">
				<span >这是主页</span>
			</div> -->
			<div class="item">
				育人教育 智慧校园系统管理后台
			</div>
		</el-card>

		</br>

		<!-- <el-row :gutter="20">
			<el-col :span="6">
				<el-card class="box-card">
					<div slot="header" class="clearfix">
						<span >卡片名称</span>
					</div>
					<div class="item">
						000
					</div>
				</el-card>
			</el-col>
			<el-col :span="6">
				<el-card class="box-card">
					<div slot="header" class="clearfix">
						<span style="line-height: 36px;">卡片名称</span>
						<el-button style="float: right;" type="primary">操作按钮</el-button>
					</div>
					<div class="item">
						000
					</div>
				</el-card>
			</el-col>
			<el-col :span="6">
				<el-card class="box-card">
					<div slot="header" class="clearfix">
						<span style="line-height: 36px;">卡片名称</span>
						<el-button style="float: right;" type="primary">操作按钮</el-button>
					</div>
					<div class="item">
						000
					</div>
				</el-card>
			</el-col>
		</el-row> -->

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
.box-card {
   	.item{
		   min-height:200px;
	   }
  }
</style>
