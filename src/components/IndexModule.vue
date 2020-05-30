<template>
  <div class="block">
    <Row v-for="(module, i) in modules" :key="module.title">
      <div v-if="i % 2 === 0" class="module">
        <Col :span="10" style="text-align: center;">
          <img :src="module.image" class="image" />
        </Col>
        <Col :span="14">
          <Row>
            <span class="title">{{ module.title }}</span>
          </Row>
          <Row>
            <span class="content">{{ module.content }}</span>
          </Row>
        </Col>
      </div>
      <div v-else class="module">
        <Col :span="14">
          <span class="title">{{ module.title }}</span>
          <span class="content">{{ module.content }}</span>
        </Col>
        <Col :span="10" style="text-align: center;">
          <img :src="module.image" class="image" />
        </Col>
      </div>
    </Row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      modules: [
        {
          title: '接口测试',
          image: require('@img/module-01.jpg'),
          content: '完善的接口测试功能支持，全局变量替换，接口间参数提取与关联，分隔符与正则断言支持，fixture等应有尽有！'
        },
        {
          title: 'UI自动化',
          image: require('@img/module-02.jpg'),
          content: '关键字驱动框架设计，灵活多变，满足一切自动化测试需求！Selenium与Appium双引擎，支持PC和移动端用例混合运行，让自动化不在难！'
        }
      ]
    }
  }
}
</script>

<style scoped>
.image {
  width: 250px;
  height: 250px;
  vertical-align: middle;
  border-style: none;
  border-radius: 100px;
}

.ivu-col {
  padding-top: 15px;
  padding-bottom: 15px;
}

.title {
  display: block;
  font-size: 32px;
  padding-top: 50px;
  padding-bottom: 10px;
  text-align: left;
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

.content {
  display: block;
  font-size: 14px;
  padding-top: 10px;
  padding-bottom: 50px;
  text-align: left;
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

.module {
  padding-left: 150px;
  padding-right: 150px;
}
</style>
