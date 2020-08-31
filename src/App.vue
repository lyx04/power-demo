<template>
  <div id="app">
    <span
      class="iconfont "
      v-for="(item,index) in iconfont"
      :key="index"
      :class="item"
    ></span>
    <div class="left">
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
      >
        <el-submenu
          :index="toString(index+1)"
          v-for="(item,index) in tools"
          :key="index"
        >
          <template slot="title">
            <span>{{item.labeltitle}}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              :index="toString(index+1+'-'+index1+1)"
              v-for="(itemItem,index1) in item.children"
              :key="index1"
            >
              <i
                class="icon"
                :title="itemItem.name"
                :class="itemItem.iconname+' '+itemItem.iconFamily"
                @dragstart="drag($event,itemItem.data)"
                draggable="true"
              ></i>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>
    <div id="appId"></div>
    <div class="button">
      <button @click="getText">获取文字</button>
      <button @click="setDate">修改数据</button>
      <button @click="save">保存</button>
    </div>
  </div>
</template>

<script>
import { Topology, registerNode } from '@topology/core';
import { MyShape, myAnchors } from './iconinit'
registerNode("HlIcon", MyShape, myAnchors)
export default {
  name: 'App',
  components: {

  },
  data() {
    return {
      canvas: "",
      thisnode: "",
      iconfont: "icon-reduce,icon-user,icon-horizontal,icon-vertical,icon-grid,icon-tiled,icon-box,icon-text,icon-curve2,icon-twoway,icon-bk,icon-json,icon-zip,icon-tag,icon-attention,icon-app,icon-huaxue,icon-paobu,icon-yangguang,icon-bar,icon-line,icon-dashboard,icon-pie,icon-mind,icon-svg,icon-loop,icon-full,icon-pc,icon-play,icon-pause,icon-data,icon-align,icon-align,icon-align,icon-align,icon-align,icon-align,icon-from,icon-to,icon-flow,icon-to,icon-from,icon-to,icon-from,icon-from,icon-to,icon-from,icon-to,icon-from,icon-to,icon-to,icon-from,icon-from,icon-to,icon-from,icon-to,icon-to,icon-from,icon-picture,icon-polyline,icon-curve,icon-folder,icon-share2,icon-class,icon-simple,icon-focus,icon-people,icon-lifeline,icon-fork,icon-fork,icon-swimlane,icon-swimlane,icon-action,icon-inital,icon-final,icon-loading,icon-cube,icon-help,icon-help,icon-line,icon-extern,icon-internal,icon-db,icon-flow,icon-msg,icon-cloud,icon-pentagram,icon-hexagon,icon-pentagon,icon-triangle,icon-rect,icon-flow,icon-flow,icon-flow,icon-flow,icon-flow,icon-diamond,icon-rectangle,icon-flow,icon-flow,icon-flow,icon-flow,icon-file,icon-star,half-o,icon-star,icon-star,icon-clock,icon-triangle,icon-triangle,icon-triangle,icon-triangle,icon-dash,icon-appreciate,icon-check,icon-close,icon-edit,icon-roundcheckfill,icon-roundcheck,icon-roundclosefill,icon-roundclose,icon-warnfill,icon-warn,icon-commentfill,icon-likefill,icon-like,icon-notificationfill,icon-notification,icon-arrow,icon-more,icon-moreandroid,icon-cart,icon-delete,icon-home,icon-message,icon-lock,icon-unlock,icon-add,icon-appreciatefill,icon-infofill,icon-info,icon-share,icon-sort,icon-copy,icon-noticefill,icon-notice,icon-font,icon-angle,icon-angle,icon-angle,icon-angle,icon-arrow,icon-bold,icon-search,icon-reply,icon-redo,icon-download,icon-upload,icon-fly,icon-image,icon-panel,icon-arrow,icon-circle,icon-round,icon-arrow",
      tools: [
        {
          labeltitle: "线对象",
          children: [
            {
              iconname: "icon-hengxian-",
              iconFamily: "iconfont",
              name: "横线",
              data: {
                text: "",
                rect: {
                  width: 100,
                  height: 100
                },
                name: "line",
                bkType: 0,
                strokeStyle: "red",
              }
            },
            {
              iconname: "icon-xuxian",
              iconFamily: "iconfont",
              name: "虚线",
              data: {
                
                text: "",
                rect: {
                  width: 100,
                  height: 100
                },
                name: "line",
                bkType: 0,
                strokeStyle: "red",
                lineDash: [5, 5]
              }
            }
          ]
        },
        {
          labeltitle: "变压器",
          children: [
            {
              iconname: "icon-srzdyhgq",
              iconFamily: "iconfont",
              name: "双绕组",
              data: {
                rect: {
                  width: 50,
                  height: 50
                },
                name: "HlIcon",
                iconFamily: "iconfont",
                icon: "\ue63a"
              }
            },
            {
              iconname: "icon-sanrzbyq_a",
              iconFamily: "iconfont",
              name: "双绕组",
              data: {
                rect: {
                  width: 50,
                  height: 50
                },
                name: "HlIcon",
                iconFamily: "iconfont",
                icon: "\ue624"
              }
            },
            {
              iconname: "icon-srzbyq_p",
              iconFamily: "iconfont",
              name: "双绕组",
              data: {
                rect: {
                  width: 50,
                  height: 50
                },
                name: "HlIcon",
                iconFamily: "iconfont",
                icon: "\ue636"
              }
            },

            {
              iconname: "icon-sanrzbyq_j",
              iconFamily: "iconfont",
              name: "双绕组",
              data: {
                rect: {
                  width: 50,
                  height: 50
                },
                name: "HlIcon",
                iconFamily: "iconfont",
                icon: "\ue627"
              }
            }
          ]
        },
        {
          labeltitle: "开断设备",
          children: [
            {
              iconname: ""
            }
          ]
        }
      ]
    }
  },
  mounted() {
    var self = this
    this.canvas = new Topology('appId', {
      on: self.onMessage,
    });
    this.iconfont = this.iconfont.split(",")
    // var json = {
    //   pens: [{ "id": "0360b702", "events": [{ "type": 2, "name": "liangyuxuan", "action": 4,}], "name": "rectangle", "tags": [], "rect": { "x": 97, "y": 108, "width": 100, "height": 100, "center": { "x": 147, "y": 158 }, "ex": 197, "ey": 208 }, "lineWidth": 1, "rotate": 0, "offsetRotate": 0, "globalAlpha": 1, "dash": 0, "strokeStyle": "", "fillStyle": "", "font": { "color": "", "fontFamily": "\"Hiragino Sans GB\", \"Microsoft YaHei\", \"Helvetica Neue\", Helvetica, Arial", "fontSize": 12, "lineHeight": 1.5, "fontStyle": "normal", "fontWeight": "normal", "textAlign": "center", "textBaseline": "middle" }, "animateStart": 0, "animateCycleIndex": 0, "data": "", "zRotate": 0, "anchors": [{ "x": 97, "y": 158, "direction": 4 }, { "x": 147, "y": 108, "direction": 1 }, { "x": 197, "y": 158, "direction": 2 }, { "x": 147, "y": 208, "direction": 3 }], "rotatedAnchors": [{ "x": 97, "y": 158, "direction": 4 }, { "x": 147, "y": 108, "direction": 1 }, { "x": 197, "y": 158, "direction": 2 }, { "x": 147, "y": 208, "direction": 3 }], "animateType": "", "animateDuration": 0, "animateFrames": [], "imgLoaded": false, "borderRadius": 0, "icon": "", "iconFamily": "topology", "iconSize": null, "iconColor": "#2f54eb", "imageAlign": "center", "gradientAngle": 0, "gradientRadius": 0.01, "paddingTop": 10, "paddingBottom": 10, "paddingLeft": 10, "paddingRight": 10, "text": "Topology", "paddingLeftNum": 10, "paddingRightNum": 10, "paddingTopNum": 10, "paddingBottomNum": 10, "textRect": { "x": 107, "y": 178, "width": 80, "height": 20, "center": { "x": 147, "y": 188 }, "ex": 187, "ey": 198 }, "fullTextRect": { "x": 107, "y": 118, "width": 80, "height": 80, "center": { "x": 147, "y": 158 }, "ex": 187, "ey": 198 }, "iconRect": { "x": 107, "y": 118, "width": 80, "height": 55, "center": { "x": 147, "y": 145.5 }, "ex": 187, "ey": 173 }, "fullIconRect": { "x": 107, "y": 118, "width": 80, "height": 80, "center": { "x": 147, "y": 158 }, "ex": 187, "ey": 198 } }, { "id": "5eedb529", "name": "rectangle", "tags": [], "rect": { "x": 755, "y": 92, "width": 100, "height": 100, "center": { "x": 805, "y": 142 }, "ex": 855, "ey": 192 }, "lineWidth": 1, "rotate": 100.66978280449668, "offsetRotate": 0, "globalAlpha": 1, "dash": 0, "strokeStyle": "", "fillStyle": "", "font": { "color": "", "fontFamily": "\"Hiragino Sans GB\", \"Microsoft YaHei\", \"Helvetica Neue\", Helvetica, Arial", "fontSize": 12, "lineHeight": 1.5, "fontStyle": "normal", "fontWeight": "normal", "textAlign": "center", "textBaseline": "middle" }, "animateStart": 0, "animateCycleIndex": 0, "data": "", "zRotate": 0, "anchors": [{ "x": 755, "y": 142, "direction": 4 }, { "x": 805, "y": 92, "direction": 1 }, { "x": 855, "y": 142, "direction": 2 }, { "x": 805, "y": 192, "direction": 3 }], "rotatedAnchors": [{ "x": 814.2574184933081, "y": 92.86447107397991, "direction": 4 }, { "x": 854.1355289260201, "y": 151.25741849330814, "direction": 1 }, { "x": 795.7425815066919, "y": 191.13552892602007, "direction": 2 }, { "x": 755.8644710739799, "y": 132.74258150669186, "direction": 3 }], "animateType": "", "animateDuration": 0, "animateFrames": [], "imgLoaded": false, "borderRadius": 0, "icon": "", "iconFamily": "topology", "iconSize": null, "iconColor": "#2f54eb", "imageAlign": "center", "gradientAngle": 0, "gradientRadius": 0.01, "paddingTop": 10, "paddingBottom": 10, "paddingLeft": 10, "paddingRight": 10, "text": "Topology", "paddingLeftNum": 10, "paddingRightNum": 10, "paddingTopNum": 10, "paddingBottomNum": 10, "textRect": { "x": 765, "y": 162, "width": 80, "height": 20, "center": { "x": 805, "y": 172 }, "ex": 845, "ey": 182 }, "fullTextRect": { "x": 765, "y": 102, "width": 80, "height": 80, "center": { "x": 805, "y": 142 }, "ex": 845, "ey": 182 }, "iconRect": { "x": 765, "y": 102, "width": 80, "height": 55, "center": { "x": 805, "y": 129.5 }, "ex": 845, "ey": 157 }, "fullIconRect": { "x": 765, "y": 102, "width": 80, "height": 80, "center": { "x": 805, "y": 142 }, "ex": 845, "ey": 182 } }], "lines": [{ "id": "b48cfaa2", "name": "curve", "tags": [], "rect": { "x": 0, "y": 0, "width": 0, "height": 0, "center": { "x": 0, "y": 0 }, "ex": 0, "ey": 0 }, "lineWidth": 1, "rotate": 0, "offsetRotate": 0, "globalAlpha": 1, "dash": 0, "strokeStyle": "", "fillStyle": "", "font": { "color": "", "fontFamily": "\"Hiragino Sans GB\", \"Microsoft YaHei\", \"Helvetica Neue\", Helvetica, Arial", "fontSize": 12, "lineHeight": 1.5, "fontStyle": "normal", "fontWeight": "normal", "textAlign": "center", "textBaseline": "middle" }, "animateStart": 0, "animateCycleIndex": 0, "locked": false, "controlPoints": [{ "x": 734, "y": 92, "direction": 4, "anchorIndex": 0, "id": "5eedb529" }, { "x": 197, "y": 185, "id": 1 }], "animateColor": "", "animateSpan": 1, "animatePos": 0, "fromArrow": "", "from": { "x": 814, "y": 92, "direction": 4, "anchorIndex": 0, "id": "5eedb529" }, "to": { "x": 201, "y": 148 }, "toArrow": "triangleSolid" }],
    //   websocket: "ws://127.0.0.1:8181",
    // }
    // this.canvas.open(json)
    // this.canvas.render()
  },
  methods: {
    save() {
      console.log(this.canvas.data)
    },
    getText() {

    },
    setDate() {
      // 连接建立时触发
      // Socket.onopen = function () {
      //   // 验证webscoket连接是否建立，是否可以进行通信
      //   // 0表示连接尚未建立
      //   if (Socket.readyState === 0) {
      //     console.log('连接还未建立')
      //   }
      //   // 1表示连接已建立，可以进行通信
      //   if (Socket.readyState === 1) {
      //     console.log("连接成功")
      //   }
      // }
      // Socket.onmessage =  (res)=> {
      //   var node = new Node(this.thisnode)
      //   this.canvas.setValue(node.id, res.data, 'text')
      //   this.canvas.render()
      // }
      // // socket关闭时触发
      // Socket.onclose = function () {
      //   console.log('连接已关闭')
      // }
    },
    onMessage(event, data) {
      console.log(event, data)
      if (event == "node" || event == "addNode") {
        this.thisnode = data

      }
    },
    drag(e, params) {
      e.dataTransfer.setData('Topology', JSON.stringify(params))
    }
  }
}
</script>

<style>
@font-face {
  font-family: 'topology';
  src: url('http://at.alicdn.com/t/font_1331132_h688rvffmbc.ttf?t=1569311680797')
    format('truetype');
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  font-size: 0;
}
i.icon {
  font-family: topology;
  font-size: 24px;
  font-style: normal;
  color: black !important;
  display: inline-block;
  width: 100%;
}
.left {
  float: left;
  width: 300px;
  height: 100%;
  background-color: white;
  color: black;
  font-size: 20px;
  text-align: center;
}
#appId {
  width: 1000px;
  height: 500px;
  display: inline-block;
  border: 1px solid black;
}
.topology-ipad:before {
  content: '\e664';
}
</style>
