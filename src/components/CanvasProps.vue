<template>
  <div>
    <div class="title">位置和大小</div>
    <div v-if="props.node">
      <!--位置-->
      <div class="props-items">
        <div class="flex grid">
          <div>X（px）</div>
          <div class="ml5">Y（px）</div>
        </div>
        <div class="flex grid">
          <div>
            <el-input-number
              v-model="props.node.rect.x"
              controls-position="right"
              @change="onChange"
            ></el-input-number>
          </div>
          <div class="ml5">
            <el-input-number
              v-model="props.node.rect.y"
              controls-position="right"
              @change="onChange"
            ></el-input-number>
          </div>
        </div>
      </div>
      <!--宽高-->
      <div class="props-items">
        <div class="flex grid">
          <div>宽（px）</div>
          <div class="ml5">高（px）</div>
        </div>
        <div class="flex grid">
          <div>
            <el-input-number
              v-model="props.node.rect.width"
              controls-position="right"
              @change="onChange"
            ></el-input-number>
          </div>
          <div class="ml5">
            <el-input-number
              v-model="props.node.rect.height"
              controls-position="right"
              @change="onChange"
            ></el-input-number>
          </div>
        </div>
      </div>
      <!--位置与圆角-->
      <div class="props-items">
        <div class="flex grid">
          <div title="百分比%对应的小数值">圆角（0 - 1）</div>
          <div class="ml5">旋转（°）</div>
        </div>
        <div class="flex grid">
          <div>
            <el-input-number
              v-model="props.node.borderRadius"
              controls-position="right"
              @change="onChange"
            ></el-input-number>
          </div>
          <div class="ml5">
            <el-input-number
              v-model="props.node.rotate"
              controls-position="right"
              @change="onChange"
            ></el-input-number>
          </div>
        </div>
      </div>
      <!--样式-->
      <div class="title">样式</div>
      <div class="props-items">
        <div class="flex grid">
          <div>线条样式</div>
          <div class="ml5">线条颜色</div>
        </div>
        <div class="flex grid">
          <div>
            <el-dropdown trigger="click" class="input" @command="lineStyleCLick">
              <span class="el-dropdown-link icon-item">
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1">-->
                  <g fill="none" stroke="black" stroke-width="1">
                    <path d="M0 9 l85 0" :stroke-dasharray="props.node.lineDash"></path>
                  </g>
                </svg>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item  v-for="(item, index) in lineStyle" :key="index" :command="item">
                  <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                    <g fill="none" stroke="black" stroke-width="1">
                      <path d="M0 9 l85 0" :stroke-dasharray="item"></path>
                    </g>
                  </svg>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="ml5">
            <el-color-picker
              size="small"
              v-model="props.node.strokeStyle"
              @change="onChange">
            </el-color-picker>
          </div>
        </div>
      </div>
      <div class="props-items">
        <div class="flex grid">
          <div>线条宽度（px）</div>
          <div class="ml5">背景颜色</div>
        </div>
        <div class="flex grid" style="width: 100px">
          <div>
            <el-input-number
              v-model="props.node.lineWidth"
              controls-position="right"
              @change="onChange"
            ></el-input-number>
          </div>
          <div class="ml5">
            <el-color-picker
              size="small"
              v-model="props.node.fillStyle"
              @change="onChange">
            </el-color-picker>
          </div>
        </div>
      </div>
      <div class="props-items">
        <div class="flex grid">
          <div>线条透明度（0-1）</div>
        </div>
        <div class="flex grid">
          <el-slider v-model="props.node.globalAlpha" show-stops :step="0.1" :max='1' :marks="marks" @change="onChange"></el-slider>
        </div>
      </div>
      <!--文字-->
      <div class="title">文字</div>
      <div class="props-items">
        <div class="flex grid">
          <div>大小（px）</div>
          <div class="ml5">颜色</div>
        </div>
        <div class="flex grid">
          <div>
            <el-input-number
            v-model="props.node.font.fontSize"
            controls-position="right"
            @change="onChange"
            ></el-input-number>
          </div>
          <div class="ml5">
            <el-color-picker
              size="small"
              v-model="props.node.font.color"
              @change="onChange">
            </el-color-picker>
          </div>
        </div>
      </div>
      <div class="props-items">
        <div class="flex grid">
          <div>加粗</div>
          <div class="ml5">倾斜</div>
        </div>
        <div class="flex grid">
          <div>
            <el-select v-model="props.node.font.fontWeight" placeholder="请选择是否加粗">
              <el-option label="正常" value="normal"></el-option>
              <el-option label="加粗" value="bold"></el-option>
            </el-select>
          </div>
          <div class="ml5">
            <el-select v-model="props.node.font.fontStyle" placeholder="请选择是否倾斜">
              <el-option label="正常" value="normal"></el-option>
              <el-option label="倾斜" value="oblique"></el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="props-items">
        <div class="flex grid">
          <div>水平对齐</div>
          <div class="ml5">垂直对齐</div>
        </div>
        <div class="flex grid">
          <div>
            <el-select v-model="props.node.font.textAlign" placeholder="请选择对齐方式">
              <el-option label="左对齐" value="left"></el-option>
              <el-option label="居中" value="center"></el-option>
              <el-option label="右对齐" value="right"></el-option>
            </el-select>
          </div>
          <div class="ml5">
            <el-select v-model="props.node.font.textBaseline" placeholder="请选择对齐方式">
              <el-option label="顶部对齐" value="top"></el-option>
              <el-option label="居中" value="middle"></el-option>
              <el-option label="底部对齐" value="bottom"></el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="props-items">
        <div class="flex grid">
          <div>行高</div>
          <div class="ml5">最大行数</div>
        </div>
        <div class="flex grid">
          <div>
            <el-input v-model="props.node.font.lineHeight" placeholder="请输入行高" @change="onChange"></el-input>
          </div>
          <div class="ml5">
            <el-input v-model="props.node.textMaxLine" placeholder="请输入最大行数" @change="onChange"></el-input>
          </div>
        </div>
      </div>
      <div class="props-items">
        <div class="flex grid">
          <div>水平偏移（px）</div>
          <div class="ml5">垂直偏移（px）</div>
        </div>
        <div class="flex grid">
          <div>
            <el-input-number
              v-model="props.node.textOffsetX"
              controls-position="right"
              @change="onChange"
            ></el-input-number>
          </div>
          <div class="ml5">
            <el-input-number
              v-model="props.node.textOffsetY"
              controls-position="right"
              @change="onChange"
            ></el-input-number>
          </div>
        </div>
      </div>
      <div class="props-items">
        <div class="flex grid">
          <div>内容</div>
        </div>
        <div class="flex grid">
          <div>
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="props.node.text">
            </el-input>
          </div>
        </div>
      </div>
      <div class="title">事件</div>
      <div class="props-items">
        <div class="flex grid">
          <div><el-button type="primary" @click="addClick">添加事件</el-button><el-button type="danger" icon="el-icon-delete" circle @click="delectClick" v-if="props.node.events.length>0"></el-button></div>
        </div>
        <div v-if="props.node.events.length>0">
          <div class="flex grid">
            <div>
              <el-select v-model="props.node.events[0].type" placeholder="请选择事件类型" @change="onChange">
                <el-option
                  v-for="(item,index) in clickType"
                  :key="index"
                  :label='item.label'
                  :value='item.value'>
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="flex grid">
            <div>
              <el-select v-model="props.node.events[0].action" placeholder="请选择事件行为" @change="onChange">
                <el-option
                  v-for="(item,index) in clickBehavior"
                  :key="index"
                  :label='item.label'
                  :value='item.value'>
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="flex grid">
            <div>
              <el-input v-model="props.node.events[0].value" placeholder="请输入链接地址" @change="onChange"></el-input>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "CanvasProps",
    props: {
      props: {
        type: Object,
        require: true
      }
    },
    data() {
      return {
        lineStyle: [[], [5,5], [10,10], [10,10,2,10]],
        marks: {
          0: '0',
          0.5: '0.5',
          1: '1'
        },
        clickBehavior: [{
          label: '打开链接',
          value:0
        }],
        clickType: [{
          label: '单击',
          value:0
        },{
          label: '双击',
          value:1
        }]
      }
    },
    methods: {
      lineStyleCLick(value) {
        this.props.node.lineDash = value
        this.onChange()
      },
      onChange() {
        if (this.props.node) {
          this.props.node.data = this.nodeIsJson ? JSON.parse(this.nodeData) : this.nodeData;
        }
        this.$emit('change', this.props.node);
      },
      // eventsChange() {
      //   this.events[0].type = Number(this.events[0].type)
      //   this.events[0].action = Number(this.events[0].action)
      //   this.props.node.events = this.events
      //   this.$emit('change',this.props.node)
      // },
      //添加事件
      addClick() {
        if (this.props.node.events.length === 0) {
          // this.addEvents = true
          let events = {
            type: 0,
            action: 0,
            value: '',
            params: '{}'
          }
          this.props.node.events.push(events)
        }
      },
    //  删除事件
      delectClick() {
        if (this.props.node.events.length > 0) {
          this.props.node.events = []
        }
      }
    }
  }
</script>

<style scoped>
.props-items {
  padding: 0.05rem 0.15rem;
}
.flex{
  display: flex;
}
.flex div{
  flex: 1;
}
/deep/ .el-input-number{
  width: 102px;
  line-height: 32px;
}
  /deep/ .el-input__inner{
    height: 34px;
  }
/deep/ .el-input-number .el-input-number__increase{
  line-height: 16px;
}
/deep/ .el-input-number i{
    font-size: 12px;
  }
.ml5{
  margin-left: 5px;
}
.input{
  width: 100px;
  position: relative;
  color: #595959;
  padding: 0 10px;
  outline: none;
  border: 1px solid #d9d9d9;
  line-height: calc(30px - 2px);
  min-height: 30px;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 2px;
}
.input:focus, .input:hover {
  border-color: #1890ff;
}
/deep/ .el-dropdown-menu__item svg, .grid svg {
  width: 80px;
  height: 18px;
  position: relative;
  top: 1px;
}
</style>