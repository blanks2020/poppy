<template>
  <div>
    <h2 class="pt20 pb10">Interface</h2>
    <Row :gutter="4">
      <Col :span="4">
        <Select @change="selectMethod" v-model="method" placeholder="请求方法" clearable>
          <Option v-for="m in methods" :key="m" :label="m" :value="m" />
        </Select>
      </Col>
      <Col :span="10">
        <Input placeholder="https://github.com" />
      </Col>
      <Col :span="8">
        <Input placeholder="/taoyanli0808/clover" />
      </Col>
      <Col :span="2" class="tar">
        <Button type="primary">保存</Button>
      </Col>
    </Row>
    <h2 class="pt40 pb10">Request</h2>
    <Tabs value="name1">
      <TabPane label="请求头信息" name="name1">
        <Input
          v-model="header"
          :autosize="minsize"
          type="textarea"
          placeholder="请输入请求头信息,key:value形式，使用换行分隔参数。"
          show-word-limit
        />
      </TabPane>
      <TabPane label="请求参数" name="name2">
        <Input
          v-model="params"
          :autosize="minsize"
          type="textarea"
          placeholder="请输入请求参数,key:value形式，使用换行分隔参数。一般情况下请求参数会拼接成url，例如http://52clover.cn/s?a=1&b=2"
          show-word-limit
        />
      </TabPane>
      <TabPane label="请求体" name="name3">
        <Select v-model="body.mode" placeholder="请选择">
          <Option
            v-for="type in bodyType"
            :key="type.value"
            :label="type.label"
            :value="type.value"
          />
        </Select>
        <Input
          v-model="body.data"
          :autosize="minsize"
          type="textarea"
          placeholder="请输入请求体,key:value形式，使用换行分隔参数。一般情况下请求体是表单数据。"
          show-word-limit
        />
      </TabPane>
      <TabPane label="添加断言" name="name4">
        <Table
          ref="assertTable"
          :columns="columns"
          :data="assert"
          @row-click="currentAssertTableChange"
          style="width: 100%"
          highlight-row
          border
        >
          <template slot-scope="row" slot="extractor">
            <Select v-model="row.extractor" placeholder="请选择">
              <Option label="delimiter" value="delimiter" />
              <Option label="regular" value="regular" />
            </Select>
            <span>{{ row.extractor }}</span>
          </template>
          <template slot-scope="row" slot="expression">
            <Input v-model="row.expression" size="small" placeholder="请输入内容" />
            <span>{{ row.expression }}</span>
          </template>
          <template slot-scope="row" slot="comparator">
            <Select v-model="row.comparator" placeholder="请选择">
              <Option label="等于" value="equal" />
              <Option label="不等于" value="not_equal" />
              <Option label="包含" value="contain" />
              <Option label="不包含" value="not_contain" />
              <Option label="大于" value="greater" />
              <Option label="大于等于" value="not_less" />
              <Option label="小于" value="less" />
              <Option label="小于等于" value="not_greater" />
            </Select>
            <span>{{ row.comparator }}</span>
          </template>
          <template slot-scope="row" slot="expected">
            <Input v-model="row.expected" size="small" placeholder="请输入内容" />
            <span>{{ row.expected }}</span>
          </template>
          <template slot-scope="row" slot="convertor">
            <Select v-model="row.convertor" placeholder="请选择">
              <Option label="string" value="str" />
              <Option label="int" value="int" />
              <Option label="float" value="float" />
              <Option label="boolean" value="boolean" />
            </Select>
            <span>{{ row.convertor }}</span>
          </template>
          <template slot-scope="row" slot="action">
            <Button @click="addAssertTableRow(row)" size="small" type="primary" class="mr20">添加</Button>
            <Poptip title="确定删除吗？" placement="left">
              <Button size="small" type="error">删除</Button>
              <div slot="content">
                <Button
                  @click="deleteAssertTableRow(row)"
                  size="small"
                  type="primary"
                  class="mr20"
                >确定</Button>
                <Button @click="deleteAssertTableRow(row)" size="small" type="error">取消</Button>
              </div>
            </Poptip>
          </template>
        </Table>
      </TabPane>
      <TabPane label="提取响应" name="name5">标签五的内容</TabPane>
    </Tabs>
    <h2 class="pt40 pb10">Response</h2>
    <Tabs value="name1">
      <TabPane label="响应体" name="name1">标签一的内容</TabPane>
      <TabPane label="响应头" name="name2">标签二的内容</TabPane>
      <TabPane label="响应Cookie" name="name3">标签三的内容</TabPane>
    </Tabs>
  </div>
</template>

<script>
// import TeamProjectCascader from '~/components/TeamProjectCascader.vue'

export default {
  // components: {
  //   TeamProjectCascader
  // },
  data () {
    return {
      teams: [],
      projects: [],
      methods: ['get', 'post', 'put', 'delete'],
      activeName: 'first',
      activeResponseTab: 'responseBody',
      selectors: [{
        label: '分隔符',
        value: 'delimiter'
      },
      {
        label: '正则',
        value: 're'
      }],
      bodyType: [{
        label: 'formdata',
        value: 'formdata'
      }, {
        label: 'urlencoded',
        value: 'urlencoded'
      }, {
        label: 'raw',
        value: 'raw'
      }],
      response: '',
      id: '',
      team: '',
      project: '',
      name: '',
      host: '',
      path: '',
      method: '',
      header: '',
      params: '',
      body: {
        mode: 'raw',
        data: ''
      },
      assert: [
        {
          extractor: '',
          expression: '',
          comparator: '',
          convertor: '',
          expected: ''
        },
        {
          extractor: '',
          expression: '',
          comparator: '',
          convertor: '',
          expected: ''
        }
      ],
      extract: [{
        selector: '',
        expression: '',
        variable: ''
      }],
      minsize: { minRows: 6 },
      dialogSubmitFormVisible: false,
      columns: [
        {
          title: 'EXTRACTOR',
          slot: 'extractor',
          minWidth: 150,
          align: 'center'
        },
        {
          title: 'EXPRESSION',
          slot: 'expression',
          minWidth: 150,
          align: 'center'
        },
        {
          title: 'COMPARATOR',
          slot: 'comparator',
          minWidth: 150,
          align: 'center'
        },
        {
          title: 'EXPECTED',
          slot: 'expected',
          minWidth: 150,
          align: 'center'
        },
        {
          title: 'CONVERTOR',
          slot: 'convertor',
          minWidth: 150,
          align: 'center'
        },
        {
          title: '操作',
          slot: 'action',
          minWidth: 150,
          align: 'center'
        }
      ]
    }
  },
  methods: {
    selectedTeamProject (value) {
      this.team = value.team
      this.project = value.project
    },
    selectMethod (value) {
      this.method = value
    },
    // addHeaderTableRow (index, row) {
    //   this.header.push({
    //     key: '',
    //     value: ''
    //   })
    //   const last = this.$refs.headerTable.data.length
    //   const currentRow = this.$refs.headerTable.data[last]
    //   this.$refs.headerTable.setCurrentRow(currentRow)
    // },
    // deleteHeaderTableRow (index, row) {
    //   this.header = this.header.filter(item => item.key !== row.key)
    //   if (Array.prototype.isPrototypeOf(this.header) && this.header.length === 0) {
    //     this.header.push({
    //       key: '',
    //       value: ''
    //     })
    //   }
    // },
    // addParameterTableRow (index, row) {
    //   this.param.push({
    //     key: '',
    //     value: ''
    //   })
    // },
    // deleteParameterTableRow (index, row) {
    //   this.param = this.param.filter(item => item.key !== row.key)
    //   if (Array.prototype.isPrototypeOf(this.param) && this.param.length === 0) {
    //     this.param.push({
    //       key: '',
    //       value: ''
    //     })
    //   }
    // },
    // addBodyTableRow (index, row) {
    //   this.body.data.push({
    //     key: '',
    //     value: ''
    //   })
    // },
    // deleteBodyTableRow (index, row) {
    //   this.body.data = this.body.data.filter(item => item.key !== row.key)
    //   if (Array.prototype.isPrototypeOf(this.body.data) && this.body.data.length === 0) {
    //     this.body.data.push({
    //       key: '',
    //       value: ''
    //     })
    //   }
    // },
    currentAssertTableChange (row, index) {
      console.log('---- row :', row)
      console.log('---- index :', index)
    }
    // addAssertTableRow (index, row) {
    //   this.assert.push({
    //     extractor: '',
    //     expression: '',
    //     comparator: '',
    //     convertor: '',
    //     expected: ''
    //   })
    // },
    // deleteAssertTableRow (index, row) {
    //   this.assert = this.assert.filter((item, idx) => idx !== index)
    //   if (Array.prototype.isPrototypeOf(this.assert) && this.assert.length === 0) {
    //     this.assert.push({
    //       extractor: '',
    //       expression: '',
    //       comparator: '',
    //       convertor: '',
    //       expected: ''
    //     })
    //   }
    // },
    // addExtractTableRow (index, row) {
    //   this.extract.push({
    //     selector: '',
    //     expression: '',
    //     variabel: ''
    //   })
    //   const last = this.$refs.extractTable.data.length
    //   const currentRow = this.$refs.extractTable.data[last]
    //   this.$refs.extractTable.setCurrentRow(currentRow)
    // },
    // deleteExtractTableRow (index, row) {
    //   this.extract = this.extract.filter((item, idx) => idx !== index)
    //   if (Array.prototype.isPrototypeOf(this.extract) && this.extract.length === 0) {
    //     this.extract.push({
    //       selector: '',
    //       expression: '',
    //       expected: ''
    //     })
    //   }
    // },
    // translateData (data) {
    //   const result = []
    //   const variables = data.split('\n')
    //   for (const index in variables) {
    //     // remove empty string
    //     if (variables[index] === '') {
    //       continue
    //     }
    //     const sep = variables[index].indexOf(':')
    //     result.push({
    //       key: variables[index].slice(0, sep),
    //       value: variables[index].slice(sep + 1, variables[index].length)
    //     })
    //   }
    //   return result
    // },
    // translateBody (data) {
    //   if (data.mode === 'formdata' || data.mode === 'urlencoded') {
    //     const result = []
    //     const newData = { ...data }
    //     const variables = data.data.split('\n')
    //     for (const index in variables) {
    //       // remove empty string
    //       if (variables[index] === '') {
    //         continue
    //       }
    //       const sep = variables[index].indexOf(':')
    //       result.push({
    //         key: variables[index].slice(0, sep),
    //         value: variables[index].slice(sep + 1, variables[index].length)
    //       })
    //     }
    //     newData.data = result
    //     return newData
    //   } else if (data.mode === 'file') { // mode === 'file'
    //     return data
    //   } else { // mode === 'raw'
    //     return data
    //   }
    // },
    // translateVerify (data) {
    //   return data.filter(item => item.extractor !== '')
    // },
    // translateExtract (data) {
    //   return data.filter(item => item.selector !== '')
    // },
    // create () {
    //   this.$axios({
    //     url: '/api/v1/interface/create',
    //     method: 'post',
    //     data: JSON.stringify({
    //       team: this.team,
    //       project: this.project,
    //       name: this.name,
    //       host: this.host,
    //       path: this.path,
    //       method: this.method,
    //       header: this.translateData(this.header),
    //       params: this.translateData(this.params),
    //       body: this.translateBody(this.body),
    //       verify: this.translateVerify(this.assert),
    //       extract: this.translateExtract(this.extract)
    //     }),
    //     headers: {
    //       'Content-Type': 'application/json;'
    //     }
    //   }).then((res) => {
    //     if (res.data.status === 0) {
    //       this.$message({
    //         type: 'success',
    //         message: '提交成功',
    //         center: true
    //       })
    //       this.id = res.data.data.id
    //       this.team = res.data.data.team
    //       this.project = res.data.data.project
    //       this.name = res.data.data.name
    //       this.host = res.data.data.host
    //       this.path = res.data.data.path
    //       this.method = res.data.data.method
    //       this.header = this.untranslateData(res.data.data.header)
    //       this.params = this.untranslateData(res.data.data.params)
    //       this.body = this.untranslateBody(res.data.data.body)
    //       this.assert = this.untranslateVerify(res.data.data.verify)
    //       this.extract = this.untranslateExtract(res.data.data.extract)
    //       this.response = res.data.data.response
    //     } else {
    //       let level = 'info'
    //       if (res.data.status >= 500) {
    //         level = 'error'
    //       }
    //       this.$message({
    //         type: level,
    //         message: res.data.message,
    //         center: true
    //       })
    //       this.response = res.data.data
    //     }
    //     this.dialogSubmitFormVisible = false
    //   }).catch(() => {
    //     this.$message({
    //       type: 'error',
    //       message: '服务器偷懒了！',
    //       center: true
    //     })
    //   })
    // },
    // update () {
    //   this.$axios({
    //     url: '/api/v1/interface/update',
    //     method: 'post',
    //     data: JSON.stringify({
    //       id: this.id,
    //       team: this.team,
    //       project: this.project,
    //       name: this.name,
    //       host: this.host,
    //       path: this.path,
    //       method: this.method,
    //       header: this.translateData(this.header),
    //       params: this.translateData(this.params),
    //       body: this.translateBody(this.body),
    //       verify: this.translateVerify(this.assert),
    //       extract: this.translateExtract(this.extract)
    //     }),
    //     headers: {
    //       'Content-Type': 'application/json;'
    //     }
    //   }).then((res) => {
    //     if (res.data.status === 0) {
    //       this.$message({
    //         type: 'success',
    //         message: '提交成功',
    //         center: true
    //       })
    //       this.id = res.data.data.id
    //       this.team = res.data.data.team
    //       this.project = res.data.data.project
    //       this.name = res.data.data.name
    //       this.host = res.data.data.host
    //       this.path = res.data.data.path
    //       this.method = res.data.data.method
    //       this.header = this.untranslateData(res.data.data.header)
    //       this.params = this.untranslateData(res.data.data.params)
    //       this.body = this.untranslateBody(res.data.data.body)
    //       this.assert = this.untranslateVerify(res.data.data.verify)
    //       this.extract = this.untranslateExtract(res.data.data.extract)
    //       this.response = res.data.data.response
    //     } else {
    //       let level = 'info'
    //       if (res.data.status >= 500) {
    //         level = 'error'
    //       }
    //       this.$message({
    //         type: level,
    //         message: res.data.message,
    //         center: true
    //       })
    //       this.response = res.data.data
    //     }
    //     this.dialogSubmitFormVisible = false
    //   }).catch(() => {
    //     this.$message({
    //       type: 'error',
    //       message: '服务器偷懒了！',
    //       center: true
    //     })
    //   })
    // },
    // submit () {
    //   if (this.id === '') {
    //     this.create()
    //   } else {
    //     this.update()
    //   }
    // },
    // untranslateData (data) {
    //   let result = ''
    //   for (const i in data) {
    //     if (data[i].key !== '') {
    //       result += data[i].key + ':' + data[i].value + '\n'
    //     }
    //   }
    //   return result
    // },
    // untranslateBody (data) {
    //   /*
    //   * 由于页面展示body数据使用的是areatext，因此如果数据格式是
    //   * formdata或urlencoded需要转换为\n分割的字符串格式以便显示
    //   * 如果格式是file，暂时为定义处理方式，暂不支持
    //   * 如果数据格式是raw则直接展示，默认情况下格式为raw
    //   */
    //   // switch (data.mode) {
    //   //   case 'formdata':
    //   //     const formdata = []
    //   //     for (const i in data.data) {
    //   //       const item = data.data[i].key + ':' + data.data[i].value
    //   //       formdata.push(item)
    //   //     }
    //   //     data.data = formdata.join('\n')
    //   //     break
    //   //   case 'urlencoded':
    //   //     const urlencoded = []
    //   //     for (const i in data.data) {
    //   //       const item = data.data[i].key + ':' + data.data[i].value
    //   //       urlencoded.push(item)
    //   //     }
    //   //     data.data = urlencoded.join('\n')
    //   //     break
    //   //   case 'file':
    //   //     break
    //   //   default:
    //   //     data.mode = 'raw'
    //   //     data.data = ''
    //   //     break
    //   // }
    //   // return data
    // },
    // untranslateVerify (data) {
    //   // if (Array.prototype.isPrototypeOf(data) && data.length === 0) {
    //   //   data = [
    //   //     {
    //   //       'expected': '',
    //   //       'convertor': '',
    //   //       'extractor': '',
    //   //       'comparator': '',
    //   //       'expression': ''
    //   //     }
    //   //   ]
    //   //   return data
    //   // } else {
    //   //   return data
    //   // }
    // },
    // untranslateExtract (data) {
    //   //   if (Array.prototype.isPrototypeOf(data) && data.length === 0) {
    //   //     data = [
    //   //       {
    //   //         'selector': '',
    //   //         'variable': '',
    //   //         'expression': ''
    //   //       }
    //   //     ]
    //   //     return data
    //   //   } else {
    //   //     return data
    //   //   }
    // }
  }
}
</script>
