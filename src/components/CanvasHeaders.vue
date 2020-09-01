<template>
  <!-- 顶部导航栏 -->
  <div class="headers">
    <el-menu mode="horizontal" @select="onMenu" background-color="#f8f8f8">
      <el-submenu index="file">
        <template slot="title">文件</template>
        <el-menu-item index="new">新建文件</el-menu-item>
        <el-menu-item index="save">保存</el-menu-item>
        <el-menu-item index="savePng">下载为PNG</el-menu-item>
      </el-submenu>
      <el-submenu index="edit">
        <template slot="title">编辑</template>
        <el-menu-item index="undo">撤消<span class="menu-key">Ctrl + z</span></el-menu-item>
        <el-menu-item index="redo">重做</el-menu-item>
        <el-menu-item index="copy">复制<span class="menu-key">Ctrl + c</span></el-menu-item>
        <el-menu-item index="cut">剪切<span class="menu-key">Ctrl + x</span></el-menu-item>
        <el-menu-item index="parse">粘贴<span class="menu-key">Ctrl + v</span></el-menu-item>
      </el-submenu>
    </el-menu>
    <el-menu mode="horizontal">
      <el-menu-item>视图：{{scale}}%</el-menu-item>
      <el-submenu index="state" title="默认连线类型">
        <template slot="title">
          <i :class="`iconfont icon-${lineName}`"></i>
        </template>
        <el-menu-item
          v-for="(item, index) in lineNames"
          :key="index"
          :index="`line-${item}`"
          @click="onState('lineName', item)"
        >
          <i :class="`iconfont icon-${item}`"></i>
        </el-menu-item>
      </el-submenu>
    </el-menu>
    <el-menu mode="horizontal">
      <el-submenu index="state" title="默认起点箭头">
        <template slot="title">
          <i :class="`iconfont icon-from-${fromArrowType}`"></i>
        </template>
        <el-menu-item
          v-for="(item, index) in arrowTypes"
          :key="index"
          :index="`fromArrow-${item}`"
          @click="onState('fromArrowType', item)"
        >
          <i :class="`iconfont icon-from-${item}`"></i>
        </el-menu-item>
      </el-submenu>
    </el-menu>
    <el-menu mode="horizontal">
      <el-submenu index="state" title="默认终点箭头">
        <template slot="title">
          <i :class="`iconfont icon-to-${toArrowType}`"></i>
        </template>
        <el-menu-item
          v-for="(item, index) in arrowTypes"
          :key="index"
          :index="`toArrow-${item}`"
          @click="onState('toArrowType', item)"
        >
          <i :class="`iconfont icon-to-${item}`"></i>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: "CanvasHeaders",
    props: {
      canvas: {
        type: Object,
        require: true
      }
    },
    data() {
      return {
        canvasData: {},
        lineNames: ['curve', 'polyline', 'line'],
        arrowTypes: [
          '',
          'triangleSolid',
          'triangle',
          'diamondSolid',
          'diamond',
          'circleSolid',
          'circle',
          'line',
          'lineUp',
          'lineDown'
        ]
      }
    },
    computed: {
      scale() {
        return Math.floor(this.canvasData.scale * 100)
      },
      lineName() {
        return this.canvasData.lineName
      },
      fromArrowType() {
        return this.canvasData.fromArrowType
      },
      toArrowType() {
        return this.canvasData.toArrowType
      }
    },
    watch:{
      canvas(){
        return this.canvasData = this.canvas.data
      }
    },
    methods: {
      onMenu(key) {
        switch (key) {
          case 'new':
            console.log('跳转')
            break;
          default:
            this.$emit('on-menu', key)
            break
        }
      },
      onState(key, value) {
        var data = {
          key: key,
          value: value
        }
        this.$emit('on-state', data)
      },
    }
  }
</script>

<style scoped lang="scss">
.headers {
  display: flex;
  background-color: #f8f8f8;
  font-size: 13px;
  height: 40px;
}
body {
  font-size: 12px;
  line-height: 2;
}
/deep/ .el-menu-item,
/deep/ .el-submenu__title {
  color: #314659 !important;
  font-size: 13px;
  padding: 0 10px;
  height: 39px !important;
  line-height: 39px !important;
  a {
    text-decoration: none;
    color: #314659;
  }
  .iconfont {
    color: #314659;
    font-size: 26px;
  }
}
span.menu-key{
  display: inline-block;
  float: right;
  font-size: 12px;
}
</style>