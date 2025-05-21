export default defineAppConfig({
  pages: [
    'pages/home/index',
    'pages/goods/index',
    'pages/cart/index',
    'pages/order/index',
    'pages/order_detail/index',
    'pages/submit/index',
    'pages/goods_detail/index',
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
      selectedIconPath: './static/home.png'
    },
    {
      pagePath: 'pages/goods/index',
      text: '商品',
      iconPath: './static/goods.png',
      selectedIconPath: './static/goods.png'
    },
    {
      pagePath: 'pages/cart/index',
      text: '购物车',
      iconPath: './static/cart.png',
      selectedIconPath: './static/cart.png'
    },
    {
      pagePath: 'pages/order/index',
      text: '订单',
      iconPath: './static/order.png',
      selectedIconPath: './static/order.png'
    },
    ]
  }
})
