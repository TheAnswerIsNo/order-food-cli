import { ActionSheet, Dialog, Tabs } from '@fruits-chain/react-native-xiaoshu'
import { View, Text, Image } from '@tarojs/components'
import Taro, { useDidShow } from '@tarojs/taro'
import { useEffect, useState } from 'react';
import { getRecommendGoods } from '../../services/goods';
import { addToCartAPI } from '../../services/cart';


export default function Index() {

  const [list, setList] = useState<Array<any>>([]);

  const chooseGoods = async (dine: number) => {
    await Taro.setStorage({ key: 'dine', data: dine })
    Taro.reLaunch({
      url: `pages/goods/index`
    })
  }

  // 获取推荐商品列表
  const getGoodsList = async () => {
    const res = await getRecommendGoods()
    if (res.code === 200) {
      setList(res.data)
    }
  }

  useDidShow(() => {
    getGoodsList()
  })

  const openDetail = (goods: any) => {
    const params = encodeURIComponent(JSON.stringify(goods));
    Taro.navigateTo({
      url: `pages/goods_detail/index?params=${params}`
    })
  }

  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <View style={{ flex: 1, alignItems: 'center' }} onClick={async () => await chooseGoods(0)}>
          <Image style={{ borderRadius: 20 }} src={require('../../static/self-pickup.png')} />
          <View style={{ padding: 10, backgroundColor: 'red', width: '100%' }}>
            <Text style={{ textAlign: 'center', color: 'white' }} >外卖自提</Text>
          </View>
        </View>
        <View style={{ flex: 1, alignItems: 'center' }} onClick={async () => await chooseGoods(1)}>
          <Image style={{ borderRadius: 20 }} src={require('../../static/dine.png')} />
          <View style={{ padding: 10, backgroundColor: 'red', width: '100%' }}>
            <Text style={{ textAlign: 'center', color: 'white' }} >堂食就餐</Text>
          </View>
        </View>
      </View>
      <Tabs
        textColor='black'
        indicatorColor='black'
        activeTextColor='black'
      >
        <Tabs.TabPane key='recommend' tab='推荐' >
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', padding: 10 }}>
            {
              list.map((val) => {
                return <View key={val.id} style={{ width: '50%', padding: 10 }} onClick={() => openDetail(val)}>
                  <Image style={{ width: '100%', height: 200 }} src={val.photos[0]}></Image>
                  <Text style={{ textAlign: 'center', fontSize: 20 }}>{val.name}</Text>
                </View>
              })
            }
          </View>
        </Tabs.TabPane>
      </Tabs>
    </View >

  )

}
