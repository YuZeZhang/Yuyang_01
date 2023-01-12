<template>
  <div class="center">
    <div class="left-box">
      <p>请选择图标</p>
      <div class="img-box">
        <img
          v-for="(item, index) in imgList"
          :key="index"
          :src="item.src"
          @click="addImg(item.src)"
        />
      </div>
    </div>
    <div class="right-box">
       // 背景图片
      <div
        id="myH5"
        class="top-box"
        :style="{
          width: parentW + 'px',
          height: parentH + 'px',
          backgroundImage: 'url(' + parentBg + ')',
        }"
      >
        // 拖拽组件
        <VueDragResize
          class="aaaa"
          :style="'margin-left:' + parentWidth + 'px'"
          v-for="(item, index) in code"
          :key="item.id"
          :aspectRatio="true"
          :w="item.codeVw"
          :h="item.codeVh"
          :x="item.codeLeft"
          :y="item.codeTop"
          :parentLimitation="true"
          :parentW="parentW"
          :parentH="parentH"
          v-on:resizing="resize($event, 'code', index)"
          v-on:dragging="resize($event, 'code', index)"
        >
          <div
            :class="'code' + index"
            :style="{
              width: +item.codeVw + 'px',
              height: +item.codeVh + 'px',
              top: +item.codeTop + 'px',
              left: +item.codeLeft + 'px',
            }"
          >
            <img :src="item.src" style="width: 100%; height: 100%" />
            // 右上角上传按钮
            <!-- <img
              v-if="showCencle"
              @click="deleteItem(index)"
              class="cencle"
              src="@/assets/cencle.png"
            /> -->
          </div>
        </VueDragResize>
      </div>
    </div>
    <el-button @click="saveImg('myH5')">保存</el-button>
  </div>
</template>
 
 
<script>
import VueDragResize from "vue-drag-resize";
import html2canvas from "html2canvas";
 
export default {
  data() {
    return {
      parentW: 800, // 海报宽度
      parentH: 400, // 海报高度
      parentWidth: 0, // 拖拽的宽高位置
      showCencle: true, // 保存时隐藏删除按钮
      imgList: [
        {
          codeVw: 80, // 宽度
          codeVh: 80, // 高度
          codeTop: 0, // 顶部距离
          codeLeft: 0, // 左边距离
          src: "https://img0.baidu.com/it/u=1196394774,951923905&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=605",
        }
      ],
      code: [], // 渲染到画布上的元素
      // 海报背景
      // parentBg:
      //   "https://face-ai2020.oss-cn-shanghai.aliyuncs.com/img/11211.png",
      codeVw: 80, // 二维码宽度
      codeVh: 80, // 二维码高度
      codeTop: 0, // 二维码顶部距离
      codeLeft: 0, // 二维码左边距离
    };
  },
  components: {
    VueDragResize,
  },
  mounted() {
    //计算出画布需要拖动的位置
    this.parentWidth =
      (document.documentElement.clientWidth - this.parentW + 180) / 2;
  },
  methods: {
    // 删除
    deleteItem(index) {
      // 重新赋值数组中对应的元素位置
      this.code[index].codeVw = 80;
      this.code[index].codeVh = 80;
      this.code[index].codeLeft = 0;
      this.code[index].codeTop = 0;
      this.code.splice(index, 1);
    },
    // 新增
    addImg(url) {
      this.code.push({
        codeVw: 80,
        codeVh: 80,
        codeTop: 0,
        codeLeft: 0,
        src: url,
      });
    },
    // 拖动、缩放二维码
    resize(newRect, e, index) {
      this.code[index].codeVw = newRect.width;
      this.code[index].codeVh = newRect.height;
      this.code[index].codeTop = newRect.top;
      this.code[index].codeLeft = newRect.left;
    },
 
    // 保存
    saveImg(val) {
      // 隐藏删除按钮
      this.showCencle = false;
      setTimeout(() => {
        window.pageYoffset = 0;
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        // 先获取你要转换为img的dom节点
        var node = document.getElementById(val); //传入的id名称
        var width = node.offsetWidth; //dom宽
        var height = node.offsetHeight; //dom高
        var scale = 2; //放大倍数 这个相当于清晰度 调大一点更清晰一点
        console.log(height);
        console.log(width);
        window.pageYoffset = 0;
 
        document.documentElement.scrollTop = 0;
 
        document.body.scrollTop = 0;
        html2canvas(node, {
          width: width,
          heigth: height,
          backgroundColor: "#ffffff", // 背景颜色
          dpi: window.devicePixelRatio * 2, //按屏幕像素比增加像素
          scale: scale,
          X: 0,
          Y: 0,
          scrollX: 0, // 设置该偏移左边
          scrollY: 0,
          useCORS: true, //开启跨域
          allowTaint: true, //允许跨域图像污染画布
        }).then((canvas) => {
          var url = canvas.toDataURL("image/jpg", 1.0); //这里上面不设值cors会报错
          var a = document.createElement("a"); //创建一个a标签 用来下载
          a.download = "警报图"; //设置下载的图片名称
          var event = new MouseEvent("click"); //增加一个点击事件
          a.href = url; //此处的url为base64格式的图片资源
          a.dispatchEvent(event); //触发a的单击事件 即可完成下载
          this.showCencle = true;
        });
      }, 1000);
    },
  },
};
</script>
 
<style scoped lang="less">
#myH5 {
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.center {
  width: 1200px;
  margin: 0 auto;
}
.left-box {
  display: inline-block;
  width: 20%;
  float: left;
  border: 1px solid #ccc;
  padding: 15px;
  overflow: hidden;
  margin-right: 15px;
  .img-box {
    display: flex;
    flex-wrap: wrap;
    img {
      width: 48%;
      height: 100px;
      margin-right: 2%;
      cursor: pointer;
      margin-bottom: 30px;
    }
  }
}
.right-box {
  .cencle {
    width: 25px;
    height: 25px;
    position: absolute;
    right: -10px;
    top: -10px;
    z-index: 99;
    cursor: pointer;
  }
}
</style>