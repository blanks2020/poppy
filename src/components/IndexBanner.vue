<template>
  <div class="banner">
    <Row>
      <Col :span="4" v-for="item in data" :key="item.description">
        <Row class="card">
          <Col :span="8" :style="{background: item.color}" class="icon">
            <Icon :type="item.icon" />
          </Col>
          <Col :span="16" class="content">
            <div>
              <p class="number">{{ item.number }}</p>
            </div>
            <div>
              <p class="description">{{ item.description }}</p>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: {
        team: {
          number: 0,
          description: '团队数量',
          icon: 'ios-people',
          color: '#FDE9D9'
        },
        project: {
          number: 0,
          description: '项目数量',
          icon: 'md-albums',
          color: '#DAEEF3'
        },
        variable: {
          number: 0,
          description: '变量数量',
          icon: 'md-flag',
          color: '#F2DBDB'
        },
        keyword: {
          number: 0,
          description: '关键字数量',
          icon: 'md-paper-plane',
          color: '#EAF1DD'
        },
        interface: {
          number: 0,
          description: '接口数量',
          icon: 'md-outlet',
          color: '#C6D9F1'
        },
        suite: {
          number: 0,
          description: '套件数量',
          icon: 'md-grid',
          color: '#DDD9C3'
        }
      }
    }
  },
  mounted () {
    this.count()
  },
  methods: {
    count () {
      this.$axios
        .get('/api/v1/index/count', {})
        .then((res) => {
          if (res.data.status === 0) {
            // this.data = res.data.data
            for (const i in res.data.data) {
              this.data[i].number = res.data.data[i]
            }
          } else {
            const result = this.mysqlParser(res.data.data)
            if (result.code === 0) {
              this.$message({
                type: 'error',
                message: res.data.message,
                center: true
              })
            } else {
              this.$alert(result.message, {
                title: '数据库错误',
                type: 'error'
              })
            }
          }
        }).catch((res) => {
          console.log(res)

          this.$message({
            type: 'error',
            message: '服务异常，请联系管理员！',
            center: true
          })
        })
    }
  }
}
</script>

<style scoped>
.banner {
  background-color: #f2f2f2;
  padding-top: 20px;
  padding-bottom: 20px;
  margin-left: -20px;
  margin-right: -20px;
}

.card {
  padding-left: 10px;
  padding-right: 10px;
}

.icon {
  height: 100px;
  font-size: 24px;
  border-radius: 5px 0 0 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  border-radius: 0 5px 5px 0;
  background-color: #ffffff;
}

.number {
  font-size: 48px;
  line-height: 70px;
  text-align: center;
}

.description {
  font-size: 14px;
  line-height: 30px;
  text-align: center;
  background-color: #ffffff;
}
</style>
