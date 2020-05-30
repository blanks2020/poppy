<template>
  <Menu mode="horizontal" theme="light" active-name="1">
    <MenuItem name="1" to="/">
      <Icon type="md-home" />平台首页
    </MenuItem>
    <Submenu name="2">
      <template slot="title">
        <Icon type="ios-stats" />接口测试
      </template>
      <MenuItem name="2-1" to="/interface/create">创建接口</MenuItem>
      <MenuItem name="2-2" to="/interface/">接口列表</MenuItem>
      <MenuItem name="2-3" to="/suite/">测试套件</MenuItem>
    </Submenu>
    <Submenu name="3">
      <template slot="title">
        <Icon type="ios-stats" />配置管理
      </template>
      <MenuItem name="3-1" to="/config/project">项目配置</MenuItem>
      <MenuItem name="3-2" to="/config/variable">变量配置</MenuItem>
      <MenuItem name="3-3" to="/config/keyword" v-if="keyword">关键字配置</MenuItem>
      <MenuItem name="3-4" to="/config/plugin">插件配置</MenuItem>
      <MenuItem name="3-5" to="/config/task" v-if="task">定时任务</MenuItem>
    </Submenu>
    <MenuItem name="4" to="/report">
      <Icon type="ios-people" />查看报告
    </MenuItem>
    <MenuItem name="5" to="https://github.com/taoyanli0808/clover" target="_blank" v-if="join">
      <Icon type="ios-construct" />加入我们
    </MenuItem>
  </Menu>
</template>

<script>
export default {
  name: 'page-header',
  data () {
    return {
      join: true,
      task: true,
      keyword: true
    }
  },
  mounted () {
    this.updateConfig()
  },
  methods: {
    updateConfig () {
      this.$axios
        .get('/api/v1/index/config', {})
        .then((res) => {
          this.join = res.data.data.join
          this.task = res.data.data.task
          this.keyword = res.data.data.keyword
        })
        .catch(() => {
          this.$message({
            type: 'error',
            message: '服务出错，请联系管理员',
            center: true
          })
          this.loading = false
        })
    }
  }
}
</script>
