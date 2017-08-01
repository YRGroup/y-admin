<template>
	<section>

		<el-card class="box-card" style="background:#ecf0f1">
			<!-- <div slot="header" class="clearfix">
				<span >这是主页</span>
			</div> -->
			<div class="item">
				育人教育 智慧校园系统管理后台
			</div>
		</el-card>

		</br>

		 <el-row :gutter="20">
			<el-col :span="6">
				<el-card class="box-card" style="color:#fff;background:#3498db">
					<div slot="header" class="clearfix">
						<span style="line-height: 36px;">班级</span>
						<el-button style="float: right;" type="text">班级管理</el-button>
						
					</div>
					<div class="item">
						共有班级50个
					</div>
				</el-card>
			</el-col>
			<el-col :span="6">
				<el-card class="box-card" style="color:#fff;background:#9b59b6">
					<div slot="header" class="clearfix">
						<span style="line-height: 36px;">动态</span>
						<el-button style="float: right;" type="text">动态管理</el-button>
					</div>
					<div class="item">
						<div>共有动态200条</div>
						<div>评论100条</div>
						<div>今日新增动态20条</div>
						<div>今日新增评论20条</div>
					</div>
				</el-card>
			</el-col>
			<el-col :span="6">
				<el-card class="box-card" style="color:#fff;background:#2ecc71">
					<div slot="header" class="clearfix">
						<span style="line-height: 36px;">用户</span>
						<el-button style="float: right;" type="text">用户管理</el-button>
					</div>
					<div class="item">
						<div>共有用户200个</div>
						<div>今日新增用户20个</div>
					</div>
				</el-card>
			</el-col>
		</el-row> 

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
