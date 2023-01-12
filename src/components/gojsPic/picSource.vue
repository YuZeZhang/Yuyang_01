<template>
  <div class="paletteLeft fl inner-layout" >
    <ul>
      <li class="paletteLi" v-for="(panelItem,index) in panelList" :key="'pal-' + index">
        <span class="panelTitle">{{panelItem.name}}</span>
        <div class="paletteDiv" v-for="(panelTypeItem,panelTypeIndex) in panelItem.children" :key="'panelType-'+panelTypeIndex">
          <div style="width: 100%;height: 100%" :id="'myPaletteDiv_'+panelTypeItem.cid" ></div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import {isIE,findHeadShot,linkStyle} from '@../../../static/gojsConfig/gojsToolPic'
  export default {
    name: "leftPalette",
    props:['myDiagram'],
    data(){
      return{
        panelList : [
          {
            "id":"-1","name":"阀门","type":"-1","children":[
              {"cid":"1-11","parentType":"-1","name":"阀1","path":"阀.svg","type":"1-1"},
              {"cid":"1-12","parentType":"-1","name":"阀2","path":"阀-2.svg","type":"1-2"},
              {"cid":"1-13","parentType":"-1","name":"阀门3","path":"阀门2-01.svg","type":"1-3"},
              {"cid":"1-14","parentType":"-1","name":"阀门4","path":"阀门-01.svg","type":"1-4"}
            ]},
          {
            "id":"-2","name":"泵","type":"-2","children":[
              {"cid":"2-11","parentType":"-2","name":"卧式泵","path":"卧式泵-01.svg","type":"2-1"},
              {"cid":"2-12","parentType":"-2","name":"旋转泵","path":"旋转泵-01.svg","type":"2-2"},
              {"cid":"2-13","parentType":"-2","name":"油池泵","path":"油池泵-01.svg","type":"2-3"},
              {"cid":"2-14","parentType":"-2","name":"立式泵","path":"立式泵-01.svg","type":"2-4"}
            ]}
        ],
        palette:[]
      }
    },
    created(){
      this.getPaletteList();
    },
    methods:{
      getPaletteList(){
        let _this = this;
        setTimeout(function () {
          _this.drawPalette();
        },1000)
      },
      //左侧panel
      drawPalette(){
        let _this = this;
        let go = this.go;
        let $ = go.GraphObject.make;
        let diagram =  _this.myDiagram;


        for(var k in _this.palette){
          _this.palette[k].div = null;
        }

        for(var i = 0 ; i < _this.panelList.length; i++){
          for (var j = 0; j < _this.panelList[i].children.length; j++){

            let cid = "myPaletteDiv_" +  _this.panelList[i].children[j].cid;
            let imgShow =  require('../../../static/img/picSource/' + _this.panelList[i].children[j].path) ;
            let componentText = _this.panelList[i].children[j].name;

            _this.palette[j] =
              $(go.Palette, cid,
                {
                  //节点模板
                  nodeTemplate: diagram.nodeTemplate,
                  contentAlignment: go.Spot.Center
                });
            _this.palette[j].model = new go.GraphLinksModel([
              { key: "pictureNode",category: "pictureTemplate",text: componentText,  source: imgShow, loc: "0 0"}
            ]);
          }
        }

      },
    }
  }
</script>

<style lang="less" scoped>

  .paletteLeft{
    width: 300px;
    border-right: 1px solid #ccc;
    height: 100%;
    .panelTitle{
      display: inline-block;
      width: 100%;
      font-weight: bold;
    }
    .paletteLi{
      overflow: hidden;
      border-bottom: 1px solid #999;
      padding: 5px;
    }
    .paletteDiv{
      float: left;
      width: 49%;
      height: 100px;
      border: 1px solid #ccc;
    }
  }
</style>
