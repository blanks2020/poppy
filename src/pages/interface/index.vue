<template>
  <div>
    <Card class="mb10">
      <Row>
        <Col :span="5">
          <TeamProjectCascader @selectedTeamProject="selectedTeamProject" />
        </Col>
        <Col :span="2" :offset="18">
          <!-- <el-button
            @click="createSuite"
            type="primary"
            plain
          >
            创建套件
          </el-button>-->
        </Col>
      </Row>
    </Card>
    <Table
      border
      :columns="columns"
      :data="data1"
      class="mb10"
      :loading="loading"
      :draggable="true"
    >
      <template slot-scope="{ row }" slot="action">
        <Button
          type="primary"
          size="small"
          style="margin-right: 10px"
          @click="handleRun(row)"
          icon="md-play"
        >运行</Button>
        <Button
          type="warning"
          size="small"
          style="margin-right: 10px"
          icon="md-create"
          @click="handleEdit(row)"
        >编辑</Button>
        <Button type="error" size="small" icon="md-trash">删除</Button>
      </template>
    </Table>
    <div class="pager mb10">
      <Page
        :total="page.total"
        size="small"
        show-total
        show-elevator
        :current="page.current"
        @on-change="handlePageNumChange"
      />
    </div>

    <Modal v-model="dialogFormVisible" title="运行接口" :footer-hide="true">
      <Row>
        <Col :span="20" offset="2">
          <Form>
            <FormItem label="测试报告名称">
              <Input type="text" v-model="report" placeholder="Username" />
            </FormItem>
            <FormItem label="动态替换变量">
              <Input
                v-model="variables"
                type="textarea"
                :autosize="{minRows: 2,maxRows: 5}"
                placeholder="key:val形式，使用英文;或者换行分隔。"
              ></Input>
            </FormItem>
          </Form>
          <div class="tac">
            <Button class="mr20" @click="dialogFormVisible = false">取消</Button>
            <Button @click="runCase" type="primary">确定</Button>
          </div>
        </Col>
      </Row>
    </Modal>
  </div>
</template>

<script>
export default {
  name: 'home',
  components: {
    TeamProjectCascader: () => import('@c/TeamProjectCascader')
  },
  data () {
    return {
      search: {
        team: '',
        project: '',
        limit: 10,
        offset: 0
      },
      cases: [],
      currentRow: {},
      columns: [
        {
          title: 'ID',
          key: 'id',
          width: 80,
          align: 'center'
        },
        {
          title: '团队',
          key: 'team',
          width: 180,
          align: 'center'
        },
        {
          title: '项目',
          key: 'project',
          width: 180,
          align: 'center'
        },
        {
          title: '用例',
          key: 'name',
          width: 180,
          align: 'center'
        },
        {
          title: '方法',
          key: 'method',
          width: 80,
          align: 'center'
        },
        {
          title: '域名',
          key: 'host',
          width: 180,
          align: 'center'
        },
        {
          title: '路径',
          key: 'path',
          width: 180,
          align: 'center'
        },
        {
          title: '创建时间',
          key: 'created',
          width: 180,
          tooltip: true,
          align: 'center'
        },
        {
          title: '更新时间',
          width: 180,
          tooltip: true,
          key: 'updated',
          align: 'center'
        },
        {
          title: '操作',
          slot: 'action',
          align: 'center',
          width: 300,
          fixed: 'right'
        }
      ],
      page: {
        total: 0,
        current: 1,
        size: 10
      },
      data1: [],
      report: '',
      variables: '',
      // loading: true,
      loading: false,
      dialogFormVisible: false
    }
  },
  mounted () {
    this.refresh()
    document.body.ondrop = function (event) {
      event.preventDefault()
      event.stopPropagation()
    }
    this.rowDrop()
  },
  methods: {
    rowDrop () {
      // const tbody = document.querySelector('.el-table__body-wrapper tbody')
      // const _this = this
      // Sortable.create(tbody, {
      //   onEnd ({ newIndex, oldIndex }) {
      //     const currRow = _this.data.splice(oldIndex, 1)[0]
      //     _this.data.splice(newIndex, 0, currRow)
      //   }
      // })
    },
    handleSelectionChange () {
      //
    },
    handlePageNumChange (value) {
      this.page.current = value
      this.search.offset = this.page.size * (value - 1)
      this.refresh()
    },
    refresh () {
      this.loading = true
      this.$axios
        .post('/api/v1/interface/search', this.search)
        .then((res) => {
          // console.log('----interface/search---res-: ', res)

          if (res.data.status === 0) {
            this.page.total = res.data.total
            this.data1 = res.data.data
          } else {
            this.$message({
              type: 'error',
              message: res.data.message,
              center: true
            })
          }
          this.loading = false
        })
        .catch(() => {
          this.$message({
            type: 'error',
            message: '服务出错，请联系管理员',
            center: true
          })
          this.loading = false
        })
    },
    handleRun (row) {
      this.dialogFormVisible = true
      this.currentRow = row
    },
    runCase () {
      const params = {
        report: this.report,
        ...this.currentRow
      }
      if (this.variables) {
        params.variables = []
        const tmpstr = this.variables.trim().replace(/\n/g, ';')
        const variables = tmpstr.split(';')
        for (const index in variables) {
          const separator = variables[index].indexOf(':')
          params.variables.push({
            name: variables[index].slice(0, separator),
            value: variables[index].slice(separator + 1, variables[index].length)
          })
        }
      }
      this.$axios({
        url: '/api/v1/interface/trigger',
        method: 'post',
        data: JSON.stringify(params),
        headers: {
          'Content-Type': 'application/json;'
        }
      }).then((res) => {
        if (res.data.status === 0) {
          this.$message({
            type: 'success',
            message: '运行用例成功!',
            center: true
          })
        } else {
          this.$message({
            type: 'warning',
            message: res.data.message,
            center: true
          })
        }
        this.dialogFormVisible = false
      }).catch(() => {
        this.$message({
          type: 'error',
          message: '运行接口用例时发生错误!',
          center: true
        })
      })
    },
    handleEdit (row) {
      this.$router.push({
        path: '/interface/edit',
        query: {
          id: row.id
        }
      })
    },
    // handleDelete (index, row) {
    //   this.$confirm('此操作将永久删除该接口, 是否继续?', '删除接口', {
    //     type: 'warning',
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消'
    //   }).then(() => {
    //     this.$axios({
    //       url: '/api/v1/interface/delete',
    //       method: 'post',
    //       data: JSON.stringify({
    //         id_list: [row.id]
    //       }),
    //       headers: {
    //         'Content-Type': 'application/json;'
    //       }
    //     }).then((res) => {
    //       this.refresh()
    //       this.$message({
    //         type: 'success',
    //         message: '删除成功!',
    //         center: true
    //       })
    //     })
    //   }).catch(() => {
    //     this.$message({
    //       type: 'info',
    //       message: '已取消删除',
    //       center: true
    //     })
    //   })
    // },
    selectedTeamProject (value) {
      this.search.team = value.team
      this.search.project = value.project
      this.search.offset = 0
      this.page.current = 1
      this.refresh()
    }
    // handleSelectionChange (value) {
    //   const index = []
    //   value.forEach((val, idx) => {
    //     this.data.forEach((v, i) => {
    //       if (val.id === v.id) {
    //         index.push(i)
    //       }
    //     })
    //   })
    //   this.cases = []
    //   const temp = index.sort()
    //   for (const i in temp) {
    //     this.cases.push(this.data[temp[i]].id)
    //   }
    // }
  }
}
</script>
