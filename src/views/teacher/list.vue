<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item label="班级ID">
					<el-input v-model="filters.id" placeholder="班级ID"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getData">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<template>
			<el-table :data="dynamicList" highlight-current-row v-loading="loading" style="width: 100%;">
				<el-table-column type="index" width="60">
				</el-table-column>
				<el-table-column prop="id" label="ID" sortable>
				</el-table-column>
				<el-table-column prop="auther" label="作者" sortable>
				</el-table-column>
				<el-table-column prop="category" label="类别" sortable>
				</el-table-column>
				<el-table-column prop="date" label="时间" sortable>
				</el-table-column>
				<el-table-column prop="content" label="内容" min-width="200" sortable>
				</el-table-column>
				<el-table-column prop="albums.length" label="配图" sortable>
				</el-table-column>
				<el-table-column prop="comment.length" label="评论" sortable>
				</el-table-column>
				<el-table-column prop="like" label="点赞" sortable>
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
				},
			}
		},
		computed: {
			data() {
				if (!this.$store.getters.dynamicList.length) {
					return this.getData();
				}
				return this.$store.getters.dynamicList;
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

<style scoped>

</style>
