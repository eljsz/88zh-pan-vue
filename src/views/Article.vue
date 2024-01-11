<template>
  <div style="background: #e2e2e2; height: 100vh;">

    <div class="division"></div>

    <div class="content" >
      <div class="article" v-loading="isLoading" v-html="articleInfo">
      </div>
    </div>
  </div>
  <!--    <Footer></Footer>-->
</template>

<script setup>
import Footer from "@/components/footer.vue";
import {getCurrentInstance, onMounted, reactive, ref} from "vue";
import {useRoute} from "vue-router";

const {proxy} = getCurrentInstance();
const route = useRoute()

onMounted(() => {
  getArticleInfo();
})
let isLoading = ref(false)
/**
 * 获取文章信息
 * @type {UnwrapNestedRefs<*[]>}
 */
let articleInfo = ref('');
const getArticleInfo = (() => {
  isLoading.value = true
  proxy.$axios
      .get("/article", {id: route.params.id})
      .then((res) => {
        articleInfo.value = res.data
        isLoading.value = false
        //请求成功
      })
})

</script>

<style scoped>
.content {
  margin: 0 auto;
  margin-top: 20px;
  overflow: hidden;
  padding: 0 20%;
}


.division {
  height: 60px;
}

.article {
  padding: 20px 30%;
  background-color: #ffffff;
}

/*防止图片撑出盒子*/
.article >>> img, p, span {
  width: 80%;
}


</style>