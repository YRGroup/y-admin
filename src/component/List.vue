<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.id" placeholder="班级ID"></el-input>
				</el-form-item>
				<el-radio-group v-model="filtersType">
					<el-radio-button label="全部"></el-radio-button>
					<el-radio-button label="动态"></el-radio-button>
					<el-radio-button label="新闻"></el-radio-button>
					<el-radio-button label="通知"></el-radio-button>
					<el-radio-button label="作业"></el-radio-button>
				</el-radio-group>

				<el-form-item>
					<el-button type="primary" v-on:click="getDynamicList">查询</el-button>
				</el-form-item>
				
			</el-form>
		</el-col>

		<!--列表-->
		<template>
			<el-table :data="dynamicList" highlight-current-row v-loading="loading" style="width: 100%;">
				<el-table-column type="index" width="60">
				</el-table-column>
				<el-table-column prop="id" label="ID" width="60" sortable>
				</el-table-column>
				<el-table-column prop="auther" label="作者" width="80" sortable>
				</el-table-column>
				<el-table-column prop="category" label="类别" width="80" sortable>
				</el-table-column>
				<el-table-column prop="date" label="时间" width="120" sortable>
				</el-table-column>
				<el-table-column prop="content" label="内容" width="200" sortable>
				</el-table-column>
				<el-table-column prop="like" label="点赞" min-width="80" sortable>
				</el-table-column>
			</el-table>
		</template>

	</section>
</template>
<script>
	import { mapGetters } from 'vuex';
	export default {
		data() {
			return {
				filters: {
					id: '',
					type:0
				},
				filtersType:''
				// loading: false,
				// users: [],
			}
		},
		computed: {
			dynamicList() {
				if (!this.$store.getters.dynamicList.length) {
					return this.getDynamicList();
				}
				return this.$store.getters.dynamicList;
			},
			dynamicType(){
				switch(this.filtersType){
					case '全部':
						return 0
						break;
					case '动态':
						return 1
						break;
					case '新闻':
						return 2
						break;
					case '通知':
						return 3
						break;
					case '作业':
						return 4
						break;
					default:
						return 0
						break;
				}
			},
			...mapGetters({
				loading: 'listLoading',
			})
		},
		methods: {
			//性别显示转换
			formatSex: function (row, column) {
				return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
			},
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

<style scoped>

</style>
