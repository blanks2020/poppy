<template>
  <Layout>
    <Header>
      <PageHeader />
    </Header>
    <Content style="padding: 0 50px;">
      <router-view />
    </Content>
    <Footer>
      <PageFooter />
    </Footer>
  </Layout>
</template>

<script>
export default {
  name: 'page-layout',
  components: {
    PageHeader: () => import('./page-header'),
    PageFooter: () => import('./page-footer')
  }
}
</script>
