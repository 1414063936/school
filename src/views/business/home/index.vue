<template>
  <my-panel :items="LAYOUT" class="home-page">
    <template slot="1-1">
      <my-card>
        <div slot="header" class="clearfix">
          <span><i style="font-size: 16px;" class="el-icon-loading"></i></span>
          <el-dropdown trigger="hover" style="float: right">
            <i style="font-size: 16px; cursor: pointer" class="el-icon-menu"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>旋转</el-dropdown-item>
              <el-dropdown-item>跳跃</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <v-chart style="width: 100%;height: 100%" :options="polar" :autoresize="true" theme="walden"></v-chart>
      </my-card>
    </template>
    <template slot="1-2">
      <my-card>
        <div slot="header" class="clearfix">
          <span><i style="font-size: 16px;" class="el-icon-loading"></i></span>
          <el-dropdown trigger="hover" style="float: right">
            <i style="font-size: 16px; cursor: pointer" class="el-icon-menu"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>旋转</el-dropdown-item>
              <el-dropdown-item>跳跃</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <v-chart style="width: 100%;height: 100%" :options="polar" :autoresize="true" theme="walden"></v-chart>
      </my-card>
    </template>
    <template slot="1-3">
      <my-card>
        <div slot="header" class="clearfix">
          <span><i style="font-size: 16px;" class="el-icon-loading"></i></span>
          <el-dropdown trigger="hover" style="float: right">
            <i style="font-size: 16px; cursor: pointer" class="el-icon-menu"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>旋转</el-dropdown-item>
              <el-dropdown-item>跳跃</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <v-chart style="width: 100%;height: 100%" :options="polar" :autoresize="true" theme="walden"></v-chart>
      </my-card>
    </template>
    <template slot="2-1">
      <my-card>
        <div slot="header" class="clearfix">
          <span><i style="font-size: 16px;" class="el-icon-loading"></i></span>
          <el-dropdown trigger="hover" style="float: right">
            <i style="font-size: 16px; cursor: pointer" class="el-icon-menu"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>旋转</el-dropdown-item>
              <el-dropdown-item>跳跃</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <v-chart style="width: 100%;height: 100%" :options="polar" :autoresize="true" theme="walden"></v-chart>
      </my-card>
    </template>
    <template slot="2-2">
      <my-card>
        <div slot="header" class="clearfix">
          <span><i style="font-size: 16px;" class="el-icon-loading"></i></span>
          <el-dropdown trigger="hover" style="float: right">
            <i style="font-size: 16px; cursor: pointer" class="el-icon-menu"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>旋转</el-dropdown-item>
              <el-dropdown-item>跳跃</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <v-chart style="width: 100%;height: 100%" :options="polar" :autoresize="true" theme="walden"></v-chart>
      </my-card>
    </template>
    <template slot="2-3">
      <my-card>
        <div slot="header" class="clearfix">
          <span><i style="font-size: 16px;" class="el-icon-loading"></i></span>
          <el-dropdown trigger="hover" style="float: right">
            <i style="font-size: 16px; cursor: pointer" class="el-icon-menu"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>旋转</el-dropdown-item>
              <el-dropdown-item>跳跃</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <v-chart style="width: 100%;height: 100%" :options="polar" :autoresize="true" theme="walden"></v-chart>
      </my-card>
    </template>
  </my-panel>
</template>

<script>
import ElRow from 'element-ui/lib/row'
import ElCol from 'element-ui/lib/col'
import { mapGetters } from 'vuex'

export default {
  components: {
    [ElRow.name]: ElRow,
    [ElCol.name]: ElCol
  },
  created () {
    // console.log(this.$route)
  },
  data () {
    return {
      LAYOUT: [
        {
          gutter: 12,
          style: {
            flex: 1
          },
          cols: [
            {
              span: 8,
              slot: '1-1'
            },
            {
              span: 8,
              slot: '1-2'
            },
            {
              span: 8,
              slot: '1-3'
            }
          ]
        },
        {
          gutter: 12,
          style: {
            flex: 1
          },
          cols: [
            {
              span: 8,
              slot: '2-1'
            },
            {
              span: 8,
              slot: '2-2'
            },
            {
              span: 8,
              slot: '2-3'
            }
          ]
        }
      ],
      polar: {
        title: {
          text: 'echarts',
          x: 'center',
          y: 'bottom',
          textStyle: {
            show: true,
            fontSize: 12
          }
        },
        grid: {
          top: 10,
          bottom: 25,
          left: 10,
          right: 10,
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line'
        }]
      },
      cardBodyStyle: {
        height: 'calc(100% - 35px)' // padding + icon
      }
    }
  },
  computed: {
    ...mapGetters(['system', 'apiProject'])
  },
  mounted () {

  }
}
</script>

<style scoped>

</style>

<style>
  /* 放在scoped中会失效 */
  .home-page .el-card__header {
    padding: 8px 20px;
    border-bottom: 0 solid #ebeef5!important;
  }

  .home-page .el-card__body {
    padding-top: 5px;
    padding-bottom: 5px;
  }
</style>
