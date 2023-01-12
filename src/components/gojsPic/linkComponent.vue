<template>
  <div></div>
</template>

<script>
  import {linkStyle,findHeadShot} from '@../../../static/gojsConfig/gojsToolPic'

  export default {
    name: "linkComponent",
    data(){
      return{
        oneLinkComponent:'',
        twoLinkComponent:'',
        thirdLinkComponent:'',
        fourLinkComponent:'',
        fiveLinkComponent:'',
        sixLinkComponent:'',
        sevenLinkComponent:'',
        eightLinkComponent:'',
        timer:''
      }
    },
    created(){
      this.initLink();
    },
    methods: {
      initLink(){
        let _this = this;
        let go = this.go;
        let $ = go.GraphObject.make;

        _this.oneLinkComponent =
          $(go.Link, linkStyle(),
            {
              fromSpot: go.Spot.Bottom, toSpot: go.Spot.Top,
              fromEndSegmentLength: 4, toEndSegmentLength: 4
            },
            new go.Binding("source","source",findHeadShot),
            $(go.Shape, {strokeWidth: 3}),
            $(go.Shape, "LineH", {width: 20, height: 1, visible: false}),  _this.deleteLinkComponent(),
            // $(go.TextBlock, "text", { segmentOffset: new go.Point(40, 0) })
          );

        _this.twoLinkComponent =
          $(go.Link, linkStyle(),
            $(go.Shape, {strokeWidth: 1.5}),
            $(go.Shape, "LineH", {width: 20, height: 1, visible: false}),  _this.deleteLinkComponent(),
            // $(go.TextBlock, "text", { segmentOffset: new go.Point(60, 0) })
          );

        _this.thirdLinkComponent =
          $(go.Link, linkStyle(),
            $(go.Shape, {strokeWidth: 3}),
            $(go.Shape, "LineH", {width: 20, height: 1, visible: false}),  _this.deleteLinkComponent(),
            // $(go.TextBlock, "text", { segmentOffset: new go.Point(60, 0) })
          );
        _this.fourLinkComponent =
          $(go.Link, linkStyle(), $(go.Shape, {strokeWidth: 1.5}),  _this.deleteLinkComponent(),
            // $(go.TextBlock, "text", { segmentOffset: new go.Point(60, 0) })
          )

        _this.fiveLinkComponent =
          $(go.Link, linkStyle(),
            $(go.Shape, {strokeWidth: 1.5}),
            $(go.Shape, {toArrow: "Triangle", fill: "black", stroke: null}),  _this.deleteLinkComponent(),
            // $(go.TextBlock, "text", { segmentOffset: new go.Point(60, 0) })
          );

        _this.sixLinkComponent =
          $(go.Link, linkStyle(),
            $(go.Shape, {isPanelMain: true, stroke: "#00A0E9", strokeWidth: 5}),
            $(go.Shape, {isPanelMain: true, stroke: "#3C8BE9", strokeWidth: 3}),
            $(go.Shape, {isPanelMain: true, stroke: "#fff", strokeWidth: 1, name: "PIPE", strokeDashArray: [10, 10]}),
            $(go.Shape, {toArrow: "Triangle", fill: "black", width: 6, stroke: null}),  _this.deleteLinkComponent(),
            // $(go.TextBlock, "text", { segmentOffset: new go.Point(60, 0) })
          );

        _this.sevenLinkComponent =
          $(go.Link, linkStyle(),
            $(go.Shape, {isPanelMain: true, stroke: "black", strokeWidth: 5}),
            $(go.Shape, {isPanelMain: true, stroke: "gray", strokeWidth: 3}),
            $(go.Shape, {isPanelMain: true, stroke: "white", strokeWidth: 1, name: "PIPE", strokeDashArray: [10, 10]}),
            $(go.Shape, {toArrow: "Triangle", fill: "black", stroke: null}),  _this.deleteLinkComponent(),
            // $(go.TextBlock, "text", { segmentOffset: new go.Point(60, 0) })
          );

        _this.eightLinkComponent =
          $(go.Link, linkStyle(),
            {
              fromSpot: go.Spot.Bottom, toSpot: go.Spot.Top,
              fromEndSegmentLength: 4, toEndSegmentLength: 4
            },
            $(go.Shape, {strokeWidth: 1.5}),
            $(go.Shape, {toArrow: "Triangle", fill: "black", stroke: null}),  _this.deleteLinkComponent(),
            // $(go.TextBlock, "text", { segmentOffset: new go.Point(60, 0) })
          );
      },
      deleteLinkComponent(){
        let _this = this;
        let go = this.go;
        let $ = go.GraphObject.make;
        return [
          {
            contextMenu:
              $(go.Adornment, "Vertical",
                $("ContextMenuButton", $(go.TextBlock, "删除"), {click: _this.deleteLink})
              )
          }
        ]
      },
      //连接线动画
      loop(){
        let _this = this;
        var diagram =  _this.$parent.myDiagram;
        _this.timer = setTimeout(function () {
          var oldskips = diagram.skipsUndoManager;
          diagram.skipsUndoManager = true;
          diagram.links.each(function (link) {
            var shape = link.findObject("PIPE");
            if (shape == null) {
              return false;
            } else {
              var off = shape.strokeDashOffset - 2;
              shape.strokeDashOffset = (off <= 0) ? 20 : off;
            }
          });
          diagram.skipsUndoManager = oldskips;
          _this.loop();
        }, 100);
      },
      //右键删除连线
      deleteLink(e, obj) {
        let _this = this;
        var node = obj.part.adornedPart;
        if (node !== null) {
          let diagram =  _this.$parent.myDiagram;
          diagram.model.startTransaction("delete link");
          diagram.remove(node);
          diagram.model.commitTransaction("delete link");
        }
      },
      //禁用键盘事件
      disableKeyboardEvent(){
        let _this = this;
        let go = this.go;
        let myDiagram = _this.$parent.myDiagram;

        myDiagram.commandHandler.doKeyDown = function () {
          var e = myDiagram.lastInput;
          // Meta（Command）键代替Mac命令的“控制”
          var control = e.control || e.meta;
          var key = e.key;
          //退出任何撤销/重做组合键，具体键值根据需求而定
          if (control && (key === 'Z' || key === 'Y' || key === 'X' || key === 'C' || key === 'V' || key === 'A' || key === 'G'))
            return;
          if (key === 'Del') return;
          if (key === 'Backspace') return;
          //调用没有参数的基础方法（默认功能）
          go.CommandHandler.prototype.doKeyDown.call(this);
        };
      },
      //监听文字溢出
      watchTextOverflow(){
        let _this = this;
        let go = this.go;
        let myDiagram = _this.$parent.myDiagram;

        // //监听缩放part文字溢出
        myDiagram.addDiagramListener("PartResized",
          function (e, obj, node) {
            var partData = e.subject.part.data;
            var GraphSize = go.Point.parse(partData.size);
            var resizePart = myDiagram.model.findNodeDataForKey(partData.key);
            myDiagram.model.setDataProperty(resizePart, 'size', go.Size.stringify(new go.Size(GraphSize.x,GraphSize.y)));
          }
        );

        //监听字体编辑文字溢出
        myDiagram.addDiagramListener("TextEdited",
          function (e) {
            var partData = e.subject.part.data;
            var GraphSize = go.Point.parse(partData.size);
            var resizePart = myDiagram.model.findNodeDataForKey(partData.key);
            if (GraphSize.x == 0) {
              myDiagram.model.setDataProperty(resizePart, 'size', go.Size.stringify(new go.Size(80,20)));
            }else{
              myDiagram.model.setDataProperty(resizePart, 'size', go.Size.stringify(new go.Size(GraphSize.x,GraphSize.y)));
            }
          }
        );
      },
    }
  }
</script>

<style scoped>

</style>
