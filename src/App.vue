<template>
  <div id="app">
    <!--头部-->
    <canvas-headers
      @on-menu="onMenu"
      @on-state="toArrowType"
      :canvas="canvas"
    ></canvas-headers>
    <!--内容body-->
    <div class="left">
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
      >
        <el-submenu
          v-for="(item,index) in tools"
          :index="item.findex"
          :key="index"
        >
          <template slot="title">
            <span>{{item.labeltitle}}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              v-for="(itemItem,index1) in item.children"
              :index="item.findex+'-'+itemItem.cindex"
              :key="index1"
            >
              <img
                v-if='itemItem.name === "image"'
                :src="itemItem.data.image"
                style="width: 50px;height: 50px;display: block;"
                @dragstart="drag($event,itemItem)"
                draggable="true"
              />
              <i
                v-else
                class="icon"
                :title="itemItem.name"
                :class="itemItem.iconname+' '+itemItem.iconFamily"
                @dragstart="drag($event,itemItem)"
                draggable="true"
              ></i>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>

    <div
      id="appId"
      @contextmenu="onContextMenu($event)"
    >
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="smallGrid"
            width="8"
            height="8"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 8 0 L 0 0 0 8"
              fill="none"
              stroke="gray"
              stroke-width="0.5"
            />
          </pattern>
          <pattern
            id="grid"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
          >
            <rect
              width="80"
              height="80"
              fill="url(#smallGrid)"
            />
            <path
              d="M 80 0 L 0 0 0 80"
              fill="none"
              stroke="gray"
              stroke-width="1"
            />
          </pattern>
        </defs>

        <rect
          width="100%"
          height="100%"
          fill="url(#grid)"
        />
      </svg>
    </div>
    <!--右侧内容-->
    <div class="right-content">
      <canvas-props
        :props.sync="props"
        @change="onUpdateProps"
      ></canvas-props>
    </div>
    <div class="button">
      <button @click="getText">获取文字</button>
      <button @click="setDate">修改数据</button>
      <button @click="concatNode">组合</button>
    </div>
    <el-dialog
      title="量测组"
      :visible.sync="dialogFormVisible"
      width='30%'
      :destroy-on-close="true"
    >
      <el-form :model="form">
        <el-form-item
          label="测量组"
          :label-width="formLabelWidth"
        >
          <el-select
            multiple
            v-model="form.region"
            placeholder="请选择活动区域"
          >
            <el-option
              label="蒙牛配电室的调试"
              value="1"
            ></el-option>
            <el-option
              label="蒙牛配电室的调试机房"
              value="2"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="survey"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { Topology, registerNode } from '@topology/core';
import { MyShape } from './iconinit'
import CanvasProps from './components/CanvasProps'
import CanvasHeaders from './components/CanvasHeaders'
let socket;
var svgDom;
registerNode("HlIcon", MyShape)
export default {
  name: 'App',
  components: {
    CanvasProps,
    CanvasHeaders
  },
  data() {
    return {
      iconStr: "te-kaiguan:e631,te-jiedi:e630,te-bihe:e62f,te-1-6:e62e,te-1-5:e62d,te-1-4:e62c,te-1-3:e62b,te-1-2:e62a,te-1-1:e629,te-duanluqi:e628,te-dianqiyuanqijian-10:e627,te-dianqiyuanqijian-09:e626,te-dianqiyuanqijian-08:e625,te-dianqiyuanqijian-07:e624,te-dianqiyuanqijian-06:e623,te-dianqiyuanqijian-05:e622,te-dianqiyuanqijian-04:e621,te-dianqiyuanqijian-03:e620,te-dianqiyuanqijian_huaban1fuben:e61f,te-dianqiyuanqijian-02:e61e,te-zhishideng:e61b,te-lvboqi:e61a,te-duanluqi--2:e619,te-dianrongqi:e618,te-changkaichudian:e617,te-changbichudian:e616,te-dianqi--anniu:e614",
      meterList: [],
      // 连接标志位
      lockReconnect: false,
      wsCfg: {
        // websocket地址
        url: "ws://192.168.10.97:8181"
      },
      canvas: {},
      dialogFormVisible: false,
      formLabelWidth: "80px",
      meter: "",
      form: {
        region: ""
      },
      tools: [
        {
          findex: "1",
          labeltitle: "图形及文字",
          children: [
            {
              cindex: "1",
              iconname: 'icon-wenzi',
              iconFamily: "iconfont",
              name: "文字",
              data: {
                text: '请输入文字',
                rect: {
                  width: 100,
                  height: 100
                },
                name: "div",
                bkType: 0,
                fillStyle: "white"
              }
            },
            {
              cindex: "2",
              iconname: 'icon-danxuanxuanzhong',
              iconFamily: "iconfont",
              name: "文字",
              data: {
                text: '请输入文字',
                rect: {
                  width: 200,
                  height: 20
                },
                strokeStyle: "transparent",
                icon: "\ue681",
                iconFamily: "iconfont",
                name: "rectangle",
                bkType: 0,
                fillStyle: "white",

              }
            },
            {
              name: 'image',
              icon: 'icon-image',
              data: {
                text: '',
                rect: {
                  width: 50,
                  height: 50
                },
                name: 'image',
                image: require('./assets/v.svg')
              }
            }
          ]
        },
        {
          findex: "2",
          labeltitle: "线对象",
          children: [
            {
              cindex: "1",
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
              cindex: "2",
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
          findex: "3",
          labeltitle: "变压器",
          children: [
          ]
        },
        {
          findex: "4",
          labeltitle: "量测数据",
          children: [
            {
              cindex: "1",
              iconname: 'icon-dianliangceliangicon',
              iconFamily: "iconfont",
              name: "量测量",
              modelValue: 1,
              data: {
                rect: {
                  width: 100,
                  height: 300
                },
                tags: ["data"],
                name: "div",
                bkType: 0,
                fillStyle: "white",
                strokeStyle: 'transparent',
                children: [],

              }
            }
          ]
        }
      ],
      props: { // 右侧属性栏数据
        node: null,
        line: null,
        nodes: null,
        multi: false,
        expand: false,
        locked: false
      },
      //准备合并的节点
      concatN: ""
    }
  },
  mounted() {
    this.iconStr = this.iconStr.split(",")
    this.iconStr.forEach((i,v) => {
      var item = i.split(":")
      var obj = {
        cindex: v + 1,
        iconname: item[0],
        iconFamily: "ltee",
        name: "双绕组",
        data: {
          rect: {
            width: 50,
            height: 50
          },
          paddingTop: 0,
          paddingBottom: 0,
          paddingLeft: 0,
          paddingRight: 0,
          name: "HlIcon",
          iconFamily: "ltee",
          icon:String.fromCharCode('0x'+item[1])
        }
      }
      this.tools[2].children.push(obj)
    })
    var self = this
    this.canvas = new Topology('appId', {
      on: self.onMessage,
      // color:"white"
      translateKey: "m"
    });

    this.canvas.data.lineName = "curve"
    // this.canvas.data.bkColor = "black"
    this.canvas.data.grid = true
    // var json = {
    //   pens: [{ "id": "0360b702", "events": [{ "type": 2, "name": "liangyuxuan", "action": 4,}], "name": "rectangle", "tags": [], "rect": { "x": 97, "y": 108, "width": 100, "height": 100, "center": { "x": 147, "y": 158 }, "ex": 197, "ey": 208 }, "lineWidth": 1, "rotate": 0, "offsetRotate": 0, "globalAlpha": 1, "dash": 0, "strokeStyle": "", "fillStyle": "", "font": { "color": "", "fontFamily": "\"Hiragino Sans GB\", \"Microsoft YaHei\", \"Helvetica Neue\", Helvetica, Arial", "fontSize": 12, "lineHeight": 1.5, "fontStyle": "normal", "fontWeight": "normal", "textAlign": "center", "textBaseline": "middle" }, "animateStart": 0, "animateCycleIndex": 0, "data": "", "zRotate": 0, "anchors": [{ "x": 97, "y": 158, "direction": 4 }, { "x": 147, "y": 108, "direction": 1 }, { "x": 197, "y": 158, "direction": 2 }, { "x": 147, "y": 208, "direction": 3 }], "rotatedAnchors": [{ "x": 97, "y": 158, "direction": 4 }, { "x": 147, "y": 108, "direction": 1 }, { "x": 197, "y": 158, "direction": 2 }, { "x": 147, "y": 208, "direction": 3 }], "animateType": "", "animateDuration": 0, "animateFrames": [], "imgLoaded": false, "borderRadius": 0, "icon": "", "iconFamily": "topology", "iconSize": null, "iconColor": "#2f54eb", "imageAlign": "center", "gradientAngle": 0, "gradientRadius": 0.01, "paddingTop": 10, "paddingBottom": 10, "paddingLeft": 10, "paddingRight": 10, "text": "Topology", "paddingLeftNum": 10, "paddingRightNum": 10, "paddingTopNum": 10, "paddingBottomNum": 10, "textRect": { "x": 107, "y": 178, "width": 80, "height": 20, "center": { "x": 147, "y": 188 }, "ex": 187, "ey": 198 }, "fullTextRect": { "x": 107, "y": 118, "width": 80, "height": 80, "center": { "x": 147, "y": 158 }, "ex": 187, "ey": 198 }, "iconRect": { "x": 107, "y": 118, "width": 80, "height": 55, "center": { "x": 147, "y": 145.5 }, "ex": 187, "ey": 173 }, "fullIconRect": { "x": 107, "y": 118, "width": 80, "height": 80, "center": { "x": 147, "y": 158 }, "ex": 187, "ey": 198 } }, { "id": "5eedb529", "name": "rectangle", "tags": [], "rect": { "x": 755, "y": 92, "width": 100, "height": 100, "center": { "x": 805, "y": 142 }, "ex": 855, "ey": 192 }, "lineWidth": 1, "rotate": 100.66978280449668, "offsetRotate": 0, "globalAlpha": 1, "dash": 0, "strokeStyle": "", "fillStyle": "", "font": { "color": "", "fontFamily": "\"Hiragino Sans GB\", \"Microsoft YaHei\", \"Helvetica Neue\", Helvetica, Arial", "fontSize": 12, "lineHeight": 1.5, "fontStyle": "normal", "fontWeight": "normal", "textAlign": "center", "textBaseline": "middle" }, "animateStart": 0, "animateCycleIndex": 0, "data": "", "zRotate": 0, "anchors": [{ "x": 755, "y": 142, "direction": 4 }, { "x": 805, "y": 92, "direction": 1 }, { "x": 855, "y": 142, "direction": 2 }, { "x": 805, "y": 192, "direction": 3 }], "rotatedAnchors": [{ "x": 814.2574184933081, "y": 92.86447107397991, "direction": 4 }, { "x": 854.1355289260201, "y": 151.25741849330814, "direction": 1 }, { "x": 795.7425815066919, "y": 191.13552892602007, "direction": 2 }, { "x": 755.8644710739799, "y": 132.74258150669186, "direction": 3 }], "animateType": "", "animateDuration": 0, "animateFrames": [], "imgLoaded": false, "borderRadius": 0, "icon": "", "iconFamily": "topology", "iconSize": null, "iconColor": "#2f54eb", "imageAlign": "center", "gradientAngle": 0, "gradientRadius": 0.01, "paddingTop": 10, "paddingBottom": 10, "paddingLeft": 10, "paddingRight": 10, "text": "Topology", "paddingLeftNum": 10, "paddingRightNum": 10, "paddingTopNum": 10, "paddingBottomNum": 10, "textRect": { "x": 765, "y": 162, "width": 80, "height": 20, "center": { "x": 805, "y": 172 }, "ex": 845, "ey": 182 }, "fullTextRect": { "x": 765, "y": 102, "width": 80, "height": 80, "center": { "x": 805, "y": 142 }, "ex": 845, "ey": 182 }, "iconRect": { "x": 765, "y": 102, "width": 80, "height": 55, "center": { "x": 805, "y": 129.5 }, "ex": 845, "ey": 157 }, "fullIconRect": { "x": 765, "y": 102, "width": 80, "height": 80, "center": { "x": 805, "y": 142 }, "ex": 845, "ey": 182 } }], "lines": [{ "id": "b48cfaa2", "name": "curve", "tags": [], "rect": { "x": 0, "y": 0, "width": 0, "height": 0, "center": { "x": 0, "y": 0 }, "ex": 0, "ey": 0 }, "lineWidth": 1, "rotate": 0, "offsetRotate": 0, "globalAlpha": 1, "dash": 0, "strokeStyle": "", "fillStyle": "", "font": { "color": "", "fontFamily": "\"Hiragino Sans GB\", \"Microsoft YaHei\", \"Helvetica Neue\", Helvetica, Arial", "fontSize": 12, "lineHeight": 1.5, "fontStyle": "normal", "fontWeight": "normal", "textAlign": "center", "textBaseline": "middle" }, "animateStart": 0, "animateCycleIndex": 0, "locked": false, "controlPoints": [{ "x": 734, "y": 92, "direction": 4, "anchorIndex": 0, "id": "5eedb529" }, { "x": 197, "y": 185, "id": 1 }], "animateColor": "", "animateSpan": 1, "animatePos": 0, "fromArrow": "", "from": { "x": 814, "y": 92, "direction": 4, "anchorIndex": 0, "id": "5eedb529" }, "to": { "x": 201, "y": 148 }, "toArrow": "triangleSolid" }],
    //   websocket: "ws://127.0.0.1:8181",
    // }
    // this.canvas.open(json)
    this.canvas.render()
    svgDom = document.getElementsByClassName("svg-grid")[0]
  },
  methods: {
    concatNode() {
      this.canvas.combine(this.concatN, true)

    },
    //合并节点
    getLocked(node) {
      this.concatN = node.nodes
    },
    onMenu(value) {
      switch (value) {
        case 'save':
          this.canvas.data.locked = 1
          break;
        case 'savePng':
          this.canvas.saveAsImage('电力.png');
          break;
        case 'undo':
          this.canvas.undo();
          break;
        case 'redo':
          this.canvas.redo();
          break;
        case 'copy':
          this.canvas.copy();
          break;
        case 'cut':
          this.canvas.cut();
          break;
        case 'parse':
          this.canvas.paste();
          break;
      }
    },
    toArrowType(val) {
      console.log(val)
      if (this.props.line) {
        this.props.line[val.key] = val.value
        this.canvas.render()
      }

    },
    getText() {
    },
    setDate() {

      this.props.node.text = "这是修改的"
      this.props.node.iconColor = 'red'
      this.props.node.fillStyle = "red"
      this.canvas.render()
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
      setTimeout(() => {
        switch (event) {
          case 'node':
          case 'addNode':
            this.props = {
              node: data,
              line: null,
              multi: false,
              expand: this.props.expand,
              nodes: null,
              locked: data.locked
            };

            break;
          case 'line':
          case 'addLine':
            this.props = {
              node: null,
              line: data,
              multi: false,
              nodes: null,
              locked: data.locked
            };
            break;
          case 'multi':
            this.props = {
              node: null,
              line: null,
              multi: true,
              nodes: data.length > 1 ? data : null,
              locked: this.getLocked({ nodes: data })
            };
            break;
          case 'space':
            this.props = {
              node: null,
              line: null,
              multi: false,
              nodes: null,
              locked: false
            };
            break;
          case 'moveOut':
            break;
          case 'moveNodes':
          case 'resizeNodes':
            if (data.length > 1) {
              this.props = {
                node: null,
                line: null,
                multi: true,
                nodes: data,
                locked: this.getLocked({ nodes: data })
              };
            } else {
              this.props = {
                node: data[0],
                line: null,
                multi: false,
                nodes: null,
                locked: false
              };
            }
            break;
          case 'resize':
          case 'scale':
            if (data < 1) data = 1
            svgDom.style.transform = "scale(" + data + ")"
            break;
          case 'locked':
            break;
        }
      }, 0);
    },
    drag(e, params) {
      switch (params.modelValue) {
        case 1:
          this.openmeasure()
          this.meter = params.data
          break;
        default:
          console.log(params)
          e.dataTransfer.setData('Topology', JSON.stringify(params.data))

      }
      // var str = document.getElementById("mysvg")
      // var svgData = (new XMLSerializer()).serializeToString(str);
      // var svgstr = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)))
    },
    //弹出量测量的选项框
    // eslint-disable-next-line no-unused-vars
    openmeasure(value) {
      this.dialogFormVisible = true
    },
    //通过选择渲染数据
    survey() {
      this.dialogFormVisible = false
      // eslint-disable-next-line no-unused-vars
      var list = []
      var children = this.form.region
      var y = 0
      children.forEach(() => {
        var obg = {
          rectInParent: {
            x: 0,
            y: y,
            width: "100%",
            height: 30,
            rotate: 0,
          },
          key: 'data1',
          name: "div",
          strokeStyle: 'transparent',
          text: "第一组数据",
          font: {
            color: "transparent",
          },
          children: [
            {
              rectInParent: {
                x: 0,
                y: 0,
                width: "100%",
                height: 30,
                rotate: 0,
              },
              name: "div",
              strokeStyle: 'transparent',
              text: "Su",
              font: {
                color: "black",
                textAlign: 'left'
              },
            },
            {
              rectInParent: {
                x: 0,
                y: 0,
                width: "100%",
                height: 30,
                rotate: 0,
              },
              name: "div",
              strokeStyle: 'transparent',
              text: "0.000",
              font: {
                fontSize: "14",
                color: "black",
                textAlign: 'center'
              },
            },
            {
              rectInParent: {
                x: 0,
                y: 0,
                width: "100%",
                height: 30,
                rotate: 0,
              },
              name: "div",
              strokeStyle: 'transparent',
              text: "V",
              font: {
                fontSize: "14",
                color: "black",
                textAlign: 'right'
              },
            }
          ]
        }
        list.push(obg)
        y += 30
      })
      this.meter.children = list
      this.meter.rect["x"] = 10
      this.meter.rect["y"] = 10
      var as = this.canvas.addNode(this.meter, true);
      this.meterList.push(as.id)
      this.createWebSocket();
    },
    //从绘
    onUpdateProps(node) {
      // 如果是node属性改变，需要传入node，重新计算node相关属性值
      // 如果是line属性改变，无需传参
      this.canvas.updateProps(node);
    },
    // 右键
    onContextMenu(event) {
      event.preventDefault();
      event.stopPropagation();

      if (event.clientY + 360 < document.body.clientHeight) {
        this.contextmenu = {
          left: event.clientX + 'px',
          top: event.clientY + 'px'
        };
      } else {
        this.contextmenu = {
          left: event.clientX + 'px',
          bottom: document.body.clientHeight - event.clientY + 'px'
        };
      }
    },
    createWebSocket() {
      try {
        // 创建Web Socket 连接
        socket = new WebSocket(this.wsCfg.url);
        // 初始化事件
        this.initEventHandle(socket);
      } catch (e) {
        // 出错时重新连接
        this.reconnect(this.wsCfg.url);
      }
    },
    initEventHandle(socket) {
      // 连接关闭时触发
      socket.onclose = () => {
        console.log("连接关闭");
      };
      // 通信发生错误时触发
      socket.onerror = () => {
        // 重新创建长连接
        this.reconnect();
      };
      // 连接建立时触发
      socket.onopen = () => {
        console.log("连接成功");
      };
      // 客户端接收服务端数据时触发
      socket.onmessage = msg => {
        // 业务逻辑处理
        var data = JSON.parse(msg.data)
        this.meterList.forEach((i) => {
          this.canvas.find(i).children[0].children[1].text = data[0].value
        })
        this.canvas.render()
        // this.canvas.updateProps();
      };
    },
    reconnect() {
      if (this.lockReconnect) {
        return;
      }
      this.lockReconnect = true;

      // 没连接上会一直重连，设置延迟避免请求过多
      setTimeout(() => {
        this.lockReconnect = false;
        this.createWebSocket(this.wsCfg.url);
      }, 2000);
    },
    test() {
      // 给服务器发送一个字符串:
      // ws.send("Hello!");
      socket.send("Hello!");
    }
  }
}
</script>

<style>
@import url('~@/assets/css/iconfont.css');
@font-face {
  font-family: 'topology';
  src: url('http://at.alicdn.com/t/font_1331132_h688rvffmbc.ttf?t=1569311680797')
    format('truetype');
}
.svg-grid {
  transition: transform 0.3s;
  /* position: absolute;
  z-index: 11; */
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  font-size: 14px;
}
i.icon {
  font-family: ltee;
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
  font-size: 0;
  border: 1px solid black;
  overflow: hidden !important;
}
.topology-ipad:before {
  content: '\e664';
}
.right-content {
  float: right;
  width: 200px;
  height: 100vh;
  padding: 0.1rem 0;
  background-color: #f8f8f8;
  border-left: 1px solid #d9d9d9;
  overflow-y: auto;
  position: relative;
}
</style>
