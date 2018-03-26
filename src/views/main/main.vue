<template>
	<section class="chart-container">
		<el-row>
			<!-- <el-col :span="12"  class="card">
				<div id="chartBar" style="width:100%; height:400px;"></div>
			</el-col> -->
			<el-col :span="12"  class="card">
				<div id="chartColumn" style="width:100%; height:400px;"></div>
			</el-col>
			<el-col :span="12"  class="card">
				<div id="chartLine" style="width:100%; height:400px;"></div>
			</el-col>
			<el-col :span="12"  class="card">
				<div id="chartPie" style="width:100%; height:400px;"></div>
			</el-col>
		</el-row>
	</section>
</template>

<script>
import echarts from 'echarts';
import theme from '../../../static/macarons.js'

export default {
	data() {
		return {
			chartColumn: null,
			chartBar: null,
			chartLine: null,
			chartPie: null,
			chart1_x: [],
			chart1_line1: [],
			chart1_line2: [],
			chart2_line1: [],
			chart2_line2: [],
			chart3_x: [],
			chart3_line1: [],
			chart3_line2: [],
			chart3_line3: [],
			chart4_data: [],
		}
	},
	methods: {
		getData() {
			this.$sysAPI.getChartData().then(res => {
        // this.setChart1()
        console.log(res)
				if (res.UserActivated.length) {
					res.UserActivated.forEach(o => {
						this.chart2_line1.push(o.Activated)
						this.chart2_line2.push(o.UnActivated)
					})
					this.chart2_line1.reverse()
					this.chart2_line2.reverse()
					this.setChart2()
				}
				if (res.MonthlyActivity.length > 1) {
					res.MonthlyActivity.forEach(o => {
						this.chart3_x.push(o.Year + '-' + o.Month)
						this.chart3_line1.push(o.NewCount)
						this.chart3_line2.push(o.ActivityCount)
						this.chart3_line3.push(o.TotalCount)
					})
					this.setChart3()
				} else if (res.MonthlyActivity.length === 1) {
					this.chart3_x.push('--')
					this.chart3_line1.push(0)
					this.chart3_line2.push(0)
					res.MonthlyActivity.forEach(o => {
						this.chart3_x.push(o.Year + '-' + o.Month)
						this.chart3_line1.push(o.NewCount)
						this.chart3_line2.push(o.TotalCount)
					})
					this.setChart3()
				}
				if (res.UserType.length) {
					let chartData = []
					res.UserType.forEach(o => {
						let a = {}
						switch (o.Type) {
							case '1':
								a.name = '学生'
								break
							case '2':
								a.name = '家长'
								break
							case '3':
								a.name = '老师'
								break
						}
						a.value = o.Count
						chartData.push(a)
					})
					this.chart4_data= chartData.slice(0,3)
					this.setChart4()
				}
			})
		},
		setChart1() {
			this.chartBar.setOption({
				title: {
					text: '学校信息',
					subtext: '暂无数据',
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'shadow',
					}
				},
				legend: {
					data: ['已激活', '未激活'],
				},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					containLabel: true,
				},
				yAxis: {
					type: 'value',
				},
				xAxis: {
					type: 'category',
					data: ['学校1', '学校2', '学校3', '学校4', '学校5', '学校6'],
				},
				series: [
					{
						name: '已激活',
						type: 'bar',
						stack: '总用户',
						data: [300, 354, 141, 155, 240, 320],
					},
					{
						name: '未激活',
						type: 'bar',
						stack: '总用户',
						data: [500, 600, 500, 300, 400, 700],
					}
				],
			});
		},
		setChart2() {
			this.chartColumn.setOption({
				title: {
					text: '用户信息',
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'shadow'
					}
				},
				legend: {
					data: ['已激活', '未激活']
				},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					containLabel: true
				},
				xAxis: {
					type: 'value'
				},
				yAxis: {
					type: 'category',
					data: ['学生', '家长', '老师'] 
				},
				series: [
					{
						name: '已激活',
						type: 'bar',
						stack: '总量',
						label: {
							normal: {
								show: true,
								position: 'insideRight'
							}
						},
						data: this.chart2_line1
					},
					{
						name: '未激活',
						type: 'bar',
						stack: '总量',
						label: {
							normal: {
								show: true,
								position: 'insideRight'
							}
						},
						data: this.chart2_line2
					},
				]
			});
		},
		setChart3() {
			this.chartLine.setOption({
				title: { text: '用户活跃度' },
				tooltip: { trigger: 'axis' },
				legend: { data: ['新增用户', '活跃用户', '总用户'] },
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					containLabel: true,
				},
				xAxis: {
					type: 'category',
					boundaryGap: false,
					data: this.chart3_x
				},
				yAxis: { type: 'value' },
				series: [
					{
						name: '新增用户',
						type: 'line',
						stack: '总量',
						data: this.chart3_line1
					},
					{
						name: '活跃用户',
						type: 'line',
						stack: '总量',
						data: this.chart3_line2
					},
					{
						name: '总用户',
						type: 'line',
						stack: '总量',
						data: this.chart3_line3
					},
				],
			});
		},
		setChart4() {
			this.chartPie.setOption({
				title: {
					text: '所有用户',
				},
				tooltip: {
					trigger: 'item',
					formatter: '{a} <br/>{b} : {c} ({d}%)',
				},
				legend: {
					data: ['老师', '学生', '家长'],
				},
				series: [
					{
						name: '访问来源',
						type: 'pie',
						radius: '55%',
						center: ['50%', '60%'],
						data: this.chart4_data,
						itemStyle: {
							emphasis: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)',
							}
						}
					}
				],
			});
		},
	},
	created() {
		this.getData()
	},
	mounted() {
		this.chartColumn = echarts.init(document.getElementById('chartColumn'),'macarons');
		// this.chartBar = echarts.init(document.getElementById('chartBar'),'macarons');
		this.chartLine = echarts.init(document.getElementById('chartLine'),'macarons');
		this.chartPie = echarts.init(document.getElementById('chartPie'),'macarons');
	}
}
</script>
<style>
.chart-container{
	padding:10px;
}
.card{
	padding:20px;
	border:1px solid #eee;
}

</style>