<template>
  <div :class="modeClass">
    <div v-if="!short" class="top-menu">
      <route-item :short="short" :data="home" />
      <route-item
        v-for="(route) in routes"
        :key="route.path"
        :short="short"
        :data="route"
        @click="go(route)"
      />
    </div>
    <div v-else class="mobile-menu">
      <div class="top-menu">
        <route-item ref="route" top :short="short" :data="home" />
        <h-drawer ref="drawer" custom-class="router-drawer" :size="size" direction="ttb">
          <div slot="reference" class="router-more">
            更多
            <sup>new</sup>
          </div>
          <route-item :short="short" :data="home" />
          <route-item
            v-for="(route) in routes"
            :key="route.path"
            :short="short"
            :data="route"
            @click.native="go(route)"
          />
        </h-drawer>
      </div>
    </div>
  </div>
</template>
<script>
import './styl.styl'
import RouteItem from './RoutItem'
import { mapState } from 'vuex'
import HDrawer from '@/components/base/Popping'


export default {
  components: {
    RouteItem,
    HDrawer
  },
  data() {
    return {
      size: '50%',
      currentRoute: 'home',
      home: {
        name: 'home',
        path: '/',
        text: 'Arknights Data',
        decs: '首页 干员图鉴',
      },
      routes: [
        {
          name: 'enemydata',
          path: '/enemydata',
          text: '关卡数据',
          decs: '敌人数据 行动路线 地图掉落',
        },
        {
          name: 'building',
          path: '/building',
          text: '基建技能',
          decs: '各种分类查询',
        },
        {
          name: 'items',
          path: '/items',
          text: '材料图鉴',
          decs: '掉率查询 合成配方',
        },
        {
          name: 'skins',
          path: '/skins',
          text: '时装',
          decs: '皮肤',
        },
        {
          name: 'customtheme',
          path: '/customtheme',
          text: '家具图鉴',
          decs: '家具套装 散件',
        },

        {
          name: 'enemydata',
          path: '/computer',
          text: '经验计算',
          decs: '干员养成消耗计算',
        },
        {
          name: 'info',
          path: '/info',
          text: '关于',
          decs: 'Q&A 捐款 更新内容 反馈',
        },
      ],
    }
  },
  computed: {
    ...mapState(['short']),
    modeClass() {
      return this.short ? 'link-mode-short' : ''
    }
  },
  mounted() {
    const height = this.$refs.route && this.$refs.route.$el ? this.$refs.route.$el.clientHeight : 42
    if (this.short)
      this.size = (height * (this.routes.length + 3) / window.innerHeight * 100) + '%'
  },
  methods: {
    go() {
      console.log('go')
      this.$refs.drawer.drawer = false
    }
  }
}
</script>
<style lang="stylus" scoped></style>
