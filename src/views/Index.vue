<template>
  <div>
    <Head></Head>
    <div style="padding: 50px 200px">
      <SearchInput v-model="warningInfoSearchInput"
                   placeholder="请输入资源名称" hasBtn
                   @enter="warningInfoSearch"
      />
    </div>
    <div style="margin: 0 50px">
      <el-tabs v-if="activeName" v-model="activeName" class="demo-tabs" @tab-change="handleChange">
        <el-tab-pane v-for="tab in tabsList.value" :label="tab.split('&')[0]" :name="tab.split('&')[1]">

          <el-card class="box-card" v-loading="isLoading">
            <div v-for="item in tableData.value" class="text item">
              <el-link class="text item" @click="goArticle(item.url)">{{ item.title }}</el-link>
            </div>
          </el-card>

        </el-tab-pane>
      </el-tabs>
    </div>

  </div>
  <div style="clear:both">
    <Link/>
    <Footer/>
  </div>
</template>

<script setup>
import {useRoute, useRouter} from "vue-router";
import {getCurrentInstance, onBeforeMount, onMounted, reactive, watch} from "vue";
import {ref} from 'vue'
import SearchInput from "@/components/SearchInput.vue";


const {proxy} = getCurrentInstance();
const route = useRoute()

let activeName = ref('')
let tabsList = reactive([])
onBeforeMount(() => {
  //获取导航列表
  proxy.$axios
      .get("/tabs_list")
      .then((res) => {
        //请求成功
        tabsList.value = res.data
        activeName.value = tabsList.value[0].split('&')[1]
      })
      .finally(() => {
      })
})
onMounted(() => {
  document.title = '88整合库'
})


let isLoading = ref(false)
let warningInfoSearchInput = ref()

let tableData = reactive([])

//获取首页数据
const getIndexData = (() => {
  isLoading.value = true
  proxy.$axios
      .get("/get_list",
          {
            keyword: '三大',
            activeName: activeName.value
          }
      )
      .then((res) => {
        //请求成功
        tableData.value = res.data
      })
      .finally(() => {
        isLoading.value = false
      })
})


const warningInfoSearch = (() => {
  getIndexData();
})

//跳转文章详情页
const goArticle = (url) => {
  window.open(url)
}

const handleChange = (TabPaneName) => {
  tableData.value = []
  getIndexData();
}

</script>

<style scoped>
html, body {
  margin: 0; /*若不设置，默认为8px*/
}

.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.el-link .el-icon--right.el-icon {
  vertical-align: text-bottom;
}

.text {
  font-size: 25px;
}

.item {
  padding: 10px 20px;
}

.box-card {

}
</style>