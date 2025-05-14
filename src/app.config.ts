export default defineAppConfig({
  pages: [
    'pages/home/index',
    'pages/goods/index',
    'pages/cart/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '点餐系统',
    navigationBarTextStyle: 'black',
    enablePullDownRefresh: true
  },
  tabBar: {
    list: [{
      pagePath: 'pages/home/index',
      text: '首页',
      iconPath: './static/home.png',
    },
    {
      pagePath: 'pages/goods/index',
      text: '商品',
      iconPath: './static/goods.png',
    },
    {
      pagePath: 'pages/cart/index',
      text: '购物车',
      iconPath: './static/cart.png',
    }
    ]
  }
})
