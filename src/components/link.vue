<template>
  <div class="link_box">
    <div class="link_top">
      友情链接
    <div class="div_body">
      <a class="span_body" v-for="item in links.value" :key="item.id" :href="item.url" target="_blank">{{ item.name }}</a>

    </div>
    </div>
  </div>
</template>

<script setup>
import {getCurrentInstance, reactive} from "vue";
const {proxy} = getCurrentInstance();

var links = reactive([]);
proxy.$axios
    .get("/link/getLink")
    .then((res) => {
      //请求成功
      links.value = res.data
    })
</script>

<style scoped>

.link_box {
  background-color: #ffffff;
  margin: 30px;
  margin-top: 100px;
}

.link_top {
  background-color: #f5f5f5;
  margin: 80px auto 0 auto;
  padding: 15px;
  height: 80px;
  width: 1300px;
}
.div_body{
  padding: 10px 0;
}

.span_body {
  margin-right: 20px;
  color: #26262699;
  font-size: 14px;
  text-decoration: none;

}
</style>