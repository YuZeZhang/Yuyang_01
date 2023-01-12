<template>
  <div class="mainConfig" >
    <!-- <div class="navHeader">
      <ul>
        <li class="fl navHeader_1">设备选择</li>
        <li class="fl navHeader_2">画布编辑区</li>
      </ul>
    </div> -->
    <picSource :myDiagram="myDiagram"></picSource>
    <div class="centerArea">
      <div id="myDiagramDiv" class="exampleConfigContent"></div>
      <Button type="info" size="large"  @click="saveGOJS" class="fr" >保存</Button>
    </div>
    <!--连线配置-->
    <linkComponent  ref="linkChild" ></linkComponent>

  </div>
</template>

<script>
  import linkComponent from '../gojsPic/linkComponent.vue'
  import picSource from '../gojsPic/picSource.vue'
  import {
    previewDiagram,
    configDiagram,
    diagramDefined,
    isIE,
    makePortCopy,
    makePortCopyDisabled,
    nodeStyle,
    nodeStyleGroup,
    linkStyle,
    textStyle,
    pictureStyle,
    textBlockStyle,
    findHeadShot,
    contextMenuStyle
  } from '@../../../static/gojsConfig/gojsToolPic'

  export default {
    name: "centerCanvas",
    components: {
      linkComponent,picSource
    },
    data() {
      return {
        myDiagram: [],
        timer:'',
        saveData:{ "class": "GraphLinksModel","nodeDataArray": [],"linkDataArray":[]}
      }
    },
    mounted() {
      var _this = this;
      setTimeout(function () {
        _this.palette();
      }, 100)
    },
    methods: {
      //绘制组态
      palette() {
        let _this = this;
        let go = this.go;
        let $ = go.GraphObject.make;

        if (_this.myDiagram != null ||  _this.myDiagram != undefined) {
          _this.myDiagram.div = null;
        }

        let myDiagram =
          $(go.Diagram, 'myDiagramDiv',  // 必须命名或引用div HTML元素
            configDiagram(),
            diagramDefined()
          );

        myDiagram.nodeTemplate = //定义模板的类型
          $(go.Node, "Spot",
            $(go.Panel, "Vertical",
              //设置节点的图片
              $(go.Picture, pictureStyle(),{desiredSize: new go.Size(40, 45)},
                new go.Binding("source","source",findHeadShot),
              ),
              //节点的文本说明
              $(go.TextBlock, textBlockStyle())
            )
          );

        //连线
        myDiagram.linkTemplate =
          $(go.Link, linkStyle(),
            $(go.Shape, { isPanelMain: true, stroke: "black", strokeWidth: 7 }),
            $(go.Shape, { isPanelMain: true, stroke: "gray", strokeWidth: 5 }),
            $(go.Shape, { isPanelMain: true, stroke: "white", strokeWidth: 3, name: "PIPE", strokeDashArray: [10, 10] }),
            $(go.Shape, { toArrow: "Triangle", scale: 1.3, fill: "gray", stroke: null }),
            _this.$refs.linkChild.deleteLinkComponent()
          );

        //定义图片模板的类型
        var pictureComponent =
          $(go.Node, 'Spot',nodeStyle(),
            {locationSpot: go.Spot.Center},
            //设置节点的图片
            $(go.Picture, pictureStyle(),
              new go.Binding("source","source",findHeadShot),
            ),
            //节点的文本说明
            $(go.TextBlock, textBlockStyle()),
            makePortCopy()
            // {contextMenu:commandsAdornmentTextOrPicture},
          );

        //挂载默认节点模板到画布
        let tempMapNode = new go.Map();
        tempMapNode.add("pictureTemplate", pictureComponent);
        tempMapNode.add("", myDiagram.nodeTemplate);
        myDiagram.nodeTemplateMap = tempMapNode;

        _this.myDiagram = myDiagram;

        _this.loadGOJS();
        clearTimeout( _this.$refs.linkChild.timer); //清除连线动画
        _this.$refs.linkChild.loop(); //连线动画
        _this.$refs.linkChild.disableKeyboardEvent(); //禁用键盘事件
        _this.$refs.linkChild.watchTextOverflow(); //监听文字溢出
      },
      loadGOJS() {
        let _this = this;
        _this.myDiagram.model = go.Model.fromJson(_this.saveData);
        // 如果任何节点没有真实位置，请显式进行布局
        if (_this.myDiagram.nodes.any(function (n) {
          return !n.location.isReal();
        })) _this.layoutGOJS();
      },
      layoutGOJS() {
        this.myDiagram.layoutDiagram(true);
      },
      saveGOJS() {
        let _this = this;
        console.log("保存", this.myDiagram.model.toJson())
      }
    },
    beforeDestroy () {
      clearTimeout(this.timer);
    }
  }
</script>

<style scoped lang="less">
  @import '../../assets/utils/common.less';
  
  @blackBG: #15181f;
  @whiteBg: #eee;
  @width: 100%;

  .mainConfig {
    height: 100%;

    .exampleConfigContent {
      width: @width;
      height: 100%;
      background: @whiteBg;
    }
  }

  .configContent{
    height: calc(100% - 48px);
    position: relative;

    .mainConfigContent {
      border: 1px solid @blackBG;
      width: calc(@width - 304px);
      margin: 0 0 0 10px;
      height: 100%;
    }
  }
  .centerArea{
    float: left;
    position: relative;
    width:calc(100% - 310px);
    height: calc(100% - 51px);
  }
  #myDiagramDiv{
    width: 100%;
    height: 650px;
    border: 1px solid #ccc;
    background: #fafafa;
  }
  .navHeader{
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    color: #000;
    border-bottom: 1px solid #DDD;
    background: #b5b7b9;
    .navHeader_1{
      width: 300px;
      padding: 0 20px;
      border-right:1px solid #ccc;
    }
    .navHeader_2{
      padding: 0 20px;
    }
    .navHeader_3{
      width: 200px;
      padding: 0 20px;
      border-left: 1px solid #ddd;
    }
  }
  .demo-spin-container{
    display: inline-block;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border: 1px solid #eee;
  }
</style>
