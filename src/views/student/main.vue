<template>
	<section>

		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span >学生管理主页</span>
			</div>
			<div class="item">
				000</br></br></br></br></br></br></br>000
			</div>
		</el-card>

		</br>

		<el-row :gutter="20">
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
			data() {
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
			getData() {
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
.box-card {
   	.item{
		   min-height:200px;
	   }
  }
</style>
