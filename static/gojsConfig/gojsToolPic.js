import Vue from "vue";
import gojs from "gojs";

Vue.prototype.go = gojs

let go = Vue.prototype.go;
let $ = go.GraphObject.make;


function DragLinkingTool() {
  go.DraggingTool.call(this);
  this.isGridSnapEnabled = true;
  this.isGridSnapRealtime = false;
  this.gridSnapCellSize = new go.Size(182, 1);
  this.gridSnapOrigin = new go.Point(5.5, 0);
}
go.Diagram.inherit(DragLinkingTool, go.DraggingTool);

//
// // Handle dragging a link specially -- by starting the RelinkingTool on that Link
DragLinkingTool.prototype.doActivate = function() {
  console.log(this)
  var diagram = this.diagram;
  if (diagram === null) return;
  this.standardMouseSelect();
  var main = this.currentPart;  // this is set by the standardMouseSelect
  if (main instanceof go.Link) { // maybe start relinking instead of dragging
    var relinkingtool = diagram.toolManager.relinkingTool;
    // tell the RelinkingTool to work on this Link, not what is under the mouse
    relinkingtool.originalLink = main;
    // start the RelinkingTool
    diagram.currentTool = relinkingtool;
    // can activate it right now, because it already has the originalLink to reconnect
    relinkingtool.doActivate();
    relinkingtool.doMouseMove();
  } else {
    go.DraggingTool.prototype.doActivate.call(this);
  }
};

//组态用到的
function previewDiagram() {
  return[{
    "isReadOnly": true
  }]
}

function configDiagram() {
  return[{
    grid: $(go.Panel, "Grid",
      $(go.Shape, "LineH", {stroke: "lightgray", strokeWidth: 0.5}),
      $(go.Shape, "LineH", {stroke: "gray", strokeWidth: 0.5, interval: 10}),
      $(go.Shape, "LineV", {stroke: "lightgray", strokeWidth: 0.5}),
      $(go.Shape, "LineV", {stroke: "gray", strokeWidth: 0.5, interval: 10})
    ),
    "isReadOnly": false,
  }]
}

function diagramDefined() {
  return [
    {
      allowDrop: true,  // 必须是真的才能接受调色板中的液滴
      allowResize: true,
      "draggingTool.dragsLink": true,
      "draggingTool.isGridSnapEnabled": true,
      "linkingTool.isUnconnectedLinkValid": false,
      "linkingTool.portGravity": 20,
      "relinkingTool.isUnconnectedLinkValid": true,
      "relinkingTool.portGravity": 20,
      "relinkingTool.fromHandleArchetype":
        $(go.Shape, "Diamond", {
          segmentIndex: 0,
          cursor: "pointer",
          desiredSize: new go.Size(8, 8),
          fill: "tomato",
          stroke: "darkred"
        }),
      "relinkingTool.toHandleArchetype":
        $(go.Shape, "Diamond", {
          segmentIndex: -1,
          cursor: "pointer",
          desiredSize: new go.Size(8, 8),
          fill: "darkred",
          stroke: "tomato"
        }),
      "linkReshapingTool.handleArchetype":
        $(go.Shape, "Diamond", {
          desiredSize: new go.Size(7, 7),
          fill: "lightblue",
          stroke: "deepskyblue"
        }),
      "undoManager.isEnabled": true,
      // autoScale: go.Diagram.Uniform,
      "toolManager.mouseWheelBehavior": go.ToolManager.WheelZoom
    }
  ]
}

var nodeSelectionAdornmentTemplate = //装饰选中状态时的虚线
  $(go.Adornment, "Auto",
    $(go.Shape, {fill: null, stroke: "deepskyblue", strokeWidth: 1.5, strokeDashArray: [4, 2]}),
    $(go.Placeholder)
  );
var nodeResizeAdornmentTemplate = //装饰选中四周的8个点
  $(go.Adornment, "Spot",
    {locationSpot: go.Spot.Right},
    $(go.Placeholder),
    $(go.Shape, {
      alignment: go.Spot.TopLeft,
      cursor: "nw-resize",
      desiredSize: new go.Size(6, 6),
      fill: "lightblue",
      stroke: "deepskyblue"
    }),
    $(go.Shape, {
      alignment: go.Spot.Top,
      cursor: "n-resize",
      desiredSize: new go.Size(6, 6),
      fill: "lightblue",
      stroke: "deepskyblue"
    }),
    $(go.Shape, {
      alignment: go.Spot.TopRight,
      cursor: "ne-resize",
      desiredSize: new go.Size(6, 6),
      fill: "lightblue",
      stroke: "deepskyblue"
    }),
    $(go.Shape, {
      alignment: go.Spot.Left,
      cursor: "w-resize",
      desiredSize: new go.Size(6, 6),
      fill: "lightblue",
      stroke: "deepskyblue"
    }),
    $(go.Shape, {
      alignment: go.Spot.Right,
      cursor: "e-resize",
      desiredSize: new go.Size(6, 6),
      fill: "lightblue",
      stroke: "deepskyblue"
    }),
    $(go.Shape, {
      alignment: go.Spot.BottomLeft,
      cursor: "se-resize",
      desiredSize: new go.Size(6, 6),
      fill: "lightblue",
      stroke: "deepskyblue"
    }),
    $(go.Shape, {
      alignment: go.Spot.Bottom,
      cursor: "s-resize",
      desiredSize: new go.Size(6, 6),
      fill: "lightblue",
      stroke: "deepskyblue"
    }),
    $(go.Shape, {
      alignment: go.Spot.BottomRight,
      cursor: "sw-resize",
      desiredSize: new go.Size(6, 6),
      fill: "lightblue",
      stroke: "deepskyblue"
    })
  );
var nodeRotateAdornmentTemplate = //装饰上方旋转的小圈圈
  $(go.Adornment,
    {locationSpot: go.Spot.Center, locationObjectName: "CIRCLE"},
    $(go.Shape, "Circle", {
      name: "CIRCLE",
      cursor: "pointer",
      desiredSize: new go.Size(7, 7),
      fill: "lightblue",
      stroke: "deepskyblue"
    })
    // $(go.Shape, {
    //   geometryString: "M3.5 7 L3.5 30",
    //   isGeometryPositioned: true,
    //   stroke: "deepskyblue",
    //   strokeWidth: 1.5,
    //   strokeDashArray: [4, 2]
    // })
  );


// 定义一个创建通常透明的“端口”的函数。
//“name”用作GraphObject.portId，“spot”用于控制链接的连接方式
// 以及端口在节点上的位置以及布尔型“输出”和“输入”参数
// 控制用户是否可以从端口或从端口获取链接。
function makePort(name, spot, output, input) { //潜在的链接点
                                               // 港口基本上只是一个小透明的广场
  return $(go.Shape, "Circle",
    {
      fill: null,  // 没有看到，默认情况下; 通过showSmallPorts设置为半透明灰色，如下定义
      stroke: null,
      desiredSize: new go.Size(8, 8),
      alignment: spot,  // 对齐主Shape中的端口
      alignmentFocus: spot,  // 只是在形状内
      portId: name,  // 声明这个对象是一个“端口”，默认端口：如果链接数据没有位置，请使用最近端
      fromSpot: spot, toSpot: spot,  // 声明链接可能在此端口连接的位置
      fromLinkable: output, toLinkable: input,  // 声明用户是否可以在此处绘制链接
      cursor: "pointer"  // 显示不同的光标以指示潜在的链接点
    });
}

//鼠标移入显示四个端口
function showSmallPorts(node, show) {
  node.ports.each(function (port) {
    if (port.portId !== "") {  // 不要更改默认端口，这是一个很大的形状
      port.fill = show ? "rgba(0,0,0,.5)" : null;
    }
  });
}

function nodeStyle() {
  return [
    new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
    {alignment: go.Spot.Center, desiredSize: new go.Size(50, 55)},
    {selectable: true, selectionAdornmentTemplate: nodeSelectionAdornmentTemplate},
    {resizable: true, resizeObjectName: "Picture", resizeAdornmentTemplate: nodeResizeAdornmentTemplate},
    {rotatable: true, rotateAdornmentTemplate: nodeRotateAdornmentTemplate},
    new go.Binding("angle").makeTwoWay(),
    new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify)
  ];
}
function nodeStyleGroup() {
  return [
    new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
    {alignment: go.Spot.Center, desiredSize: new go.Size(50, 55)},
    {selectable: true, selectionAdornmentTemplate: nodeSelectionAdornmentTemplate},
    {resizable: true, resizeObjectName: "Picture", resizeAdornmentTemplate: nodeResizeAdornmentTemplate},
    {rotatable: true, rotateAdornmentTemplate: nodeRotateAdornmentTemplate},
    new go.Binding("angle").makeTwoWay(),
    new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify)
  ];
}

function pictureStyle() {
  return [
    {name: "Picture",desiredSize: new go.Size(50, 55)},
    new go.Binding('strokeWidth'),
    new go.Binding("verticalAlignment", "textVerticalAlignment"),
    new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify)
  ]
}

function linkStyle() {
  return [
    {
      routing: go.Link.AvoidsNodes,
      curve: go.Link.JumpGap, //重叠连线时采用跳过
      // curve: go.Link.Bezier, //重叠连线时采用跳过
      corner: 10,
      reshapable: true,
      toShortLength: 7,
      relinkableFrom: true, //可连接
      relinkableTo: true
    },
    new go.Binding("points").makeTwoWay(),
    new go.Binding("category").makeTwoWay(),
  ]
}

function makePortCopy() {
  return [
    makePort("T", go.Spot.Top, true, true),
    makePort("TL", go.Spot.TopLeft, true, true),
    makePort("L", go.Spot.Left, true, true),
    makePort("BL", go.Spot.BottomLeft, true, true),
    makePort("R", go.Spot.Right, true, true),
    makePort("TR", go.Spot.TopRight, true, true),
    makePort("BR", go.Spot.BottomRight, true, true),
    makePort("B", go.Spot.Bottom, true, true),
    { // 处理鼠标进入/离开事件以显示/隐藏端口
      mouseEnter: function (e, node) {
        showSmallPorts(node, true);
      },
      mouseLeave: function (e, node) {
        showSmallPorts(node, false);
      }
    }
  ]
}
function makePortCopyDisabled() {
  return [
    makePort("T", go.Spot.Top, false, false),
    makePort("TL", go.Spot.TopLeft, false, false),
    makePort("L", go.Spot.Left, false, false),
    makePort("BL", go.Spot.BottomLeft, false, false),
    makePort("R", go.Spot.Right, false, false),
    makePort("TR", go.Spot.TopRight, false, false),
    makePort("BR", go.Spot.BottomRight, false, false),
    makePort("B", go.Spot.Bottom, false, false),
    { // 处理鼠标进入/离开事件以显示/隐藏端口
      mouseEnter: function (e, node) {
        showSmallPorts(node, false);
      },
      mouseLeave: function (e, node) {
        showSmallPorts(node, false);
      }
    }
  ]
}
// This converter is used by the Picture.
function findHeadShot(key) {
  return key
}

function textBlockStyle() {
  return [
    {
      alignment: go.Spot.Center,
      //文本不允许换行
      isMultiline: false,
      wrap: go.TextBlock.None,
      overflow: go.TextBlock.OverflowEllipsis,
      margin: new go.Margin(8, 0, 8, 0),
      verticalAlignment: go.Spot.Center,
      font: "bold 14px Helvetica, Arial,sans-serif",
      editable: false
    },
    new go.Binding("text", "text").makeTwoWay(),
    new go.Binding("desiredSize", "size").makeTwoWay(),
    new go.Binding("verticalAlignment", "textVerticalAlignment")
  ]
}

function textStyle() {
  return [
    {
      margin: new go.Margin(5,5,5,5),
      isMultiline: false,
      wrap: go.TextBlock.None,
      overflow: go.TextBlock.OverflowEllipsis,
      textAlign: "center",
      alignment: go.Spot.Center,
      editable: false,
      verticalAlignment: go.Spot.Center,
      font: "bold 12px Helvetica, Arial, sans-serif",
      stroke: '#000'
    },
    new go.Binding("desiredSize", "size").makeTwoWay()
  ]
}

function isIE()//判断浏览器类型
{
  if(!!window.ActiveXObject || "ActiveXObject" in window)
    return true;
  else
    return false;
}

function contextMenuStyle() {
  return [
    {
      fill: '#1B1D20', stroke: "#3AF5FC",margin:0,maxSize: new go.Size(NaN, 20)
    }
  ]
}



export {previewDiagram,configDiagram,diagramDefined,DragLinkingTool,isIE,textBlockStyle,pictureStyle,nodeStyle,nodeStyleGroup,textStyle,linkStyle,makePortCopy,makePort,makePortCopyDisabled,findHeadShot,contextMenuStyle}
