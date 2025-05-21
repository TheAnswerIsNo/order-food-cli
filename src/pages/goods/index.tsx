import { useEffect, useState } from 'react'
import { Image, Text, View } from '@tarojs/components'
import { Blank, Button, Card, Empty, Space, Switch, Tabs, Toast } from '@fruits-chain/react-native-xiaoshu'
import { addToCartAPI } from '../../services/cart';
import Taro, { useDidShow } from '@tarojs/taro';
import { getDictListAPI } from '../../services/dict';
import { getGoodsListAPI } from '../../services/goods';


export default function Index() {
  const [list, setList] = useState<Array<any>>([]);
  const [dictLists, setDictLists] = useState<Array<any>>([])
  const [dine, setDine] = useState('0')
  const [tabKey, setTabKey] = useState('0')

  const addCart = async (goods: any) => {
    const data = {
      goodsId: goods.id,
      name: goods.name,
      price: goods.price,
      number: 1
    }
    const res = await addToCartAPI(data)
    if (res.code === 200) {
      Taro.showToast({ title: res.msg || "添加成功", icon: 'success', duration: 1000 })
    }
  }

  const getGoodsList = async (activeKey: string) => {
    const res = await getGoodsListAPI(activeKey)
    if (res.code === 200) {
      setList(res.data);
    } else {
      Taro.showToast({ title: res.msg + '', icon: 'error' })
    }
  }

  const getDictList = async () => {
    const res = await getDictListAPI()
    if (res.code === 200) {
      setDictLists(res.data)
      setTabKey(res.data[0].id)
    }
  }

  useDidShow(async () => {
    const { data } = await Taro.getStorage({ key: 'dine' })
    setDine(data)
  })

  useEffect(() => {
    getDictList()
    getGoodsList(tabKey)
  }, [])

  const openDetail = (goods: any) => {
    const params = encodeURIComponent(JSON.stringify(goods));
    Taro.navigateTo({
      url: `pages/goods_detail/index?params=${params}`
    })
  }

  return (
    <Blank top>
      <Space head>
        <Switch value={dine} inactiveValue='0' activeValue="1" activeChildren="堂食" inactiveChildren="外带"
          onChange={async (value) => {
            await Taro.setStorage({ key: 'dine', data: value })
            setDine(value)
          }} />
        {dictLists.length === 0 ? (
          <Empty />
        ) : (
          <Tabs activeKey={tabKey} onChange={(activeKey) => {
            setTabKey(activeKey)
            getGoodsList(activeKey)
          }}>
            {dictLists.map((val) => {
              return <Tabs.TabPane key={val.id} tab={val.label}>
                {
                  list.length === 0 ? (
                    <Empty />
                  ) : (
                    <Space head>
                      {
                        list.map((item) => {
                          return <View onClick={() => openDetail(item)} key={item.id}>
                            <Card square>
                              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Image style={{ borderRadius: 20 }} src={item.photos[0]}></Image>
                                <View >
                                  <View style={{ flex: 1 }}>
                                    <Text style={{ fontSize: 20 }}>{item.name}</Text>
                                    <Text >￥<Text style={{ color: 'red', fontSize: 30 }}>{item.price}</Text></Text >
                                  </View>
                                  <Button style={{ width: 50, marginTop: 20 }} textStyle={{ fontSize: 25 }} text='+' danger
                                    onPress={() => addCart(item)}>
                                  </Button>
                                </View>
                              </View>
                            </Card>
                          </View>
                        })
                      }
                    </Space>
                  )
                }
              </Tabs.TabPane>
            })}
          </Tabs>
        )}
      </Space>
    </Blank >
  )

}
