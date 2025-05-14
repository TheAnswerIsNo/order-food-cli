import { useState } from 'react'
import { Image, Text, View } from '@tarojs/components'
import { Blank, Button, Card, Space, Tabs, Toast } from '@fruits-chain/react-native-xiaoshu'
import { addToCartAPI } from '../../services/cart';
import Taro, { useDidShow } from '@tarojs/taro';
import { getDictListAPI } from '../../services/dict';
import { getGoodsListAPI } from '../../services/goods';


export default function Index() {

  const [list, setList] = useState<Map<string, any[]>>(new Map<string, any[]>([
    ['1', [{ id: '1', name: '汉堡', price: 20, photos: [] }, { id: '2', name: '鸡腿', price: 20, photos: [] }]],
    ['2', [{ id: '2', name: '汉堡', price: 30, photos: [] }]],
    ['3', [{ id: '3', name: '汉堡', price: 50, photos: [] }]],
    ['4', [{ id: '4', name: '汉堡', price: 70, photos: [] }]]
  ]));
  const [dictLists, setDictLists] = useState<Array<any>>([{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' },])
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
    if (res.code !== 200) {
      //todo 报错
    }
  }

  const getGoodsList = async () => {
    const res = await getGoodsListAPI()
    if (res.code === 200) {
      // 返回的res.data是一个map map中key是dictId, value是一个数组, 数组中是商品信息
      const newList = new Map<string, any[]>();
      res.data.forEach((val: any[], key: string) => {
        newList.set(key, val);
      });
      setList(newList);
    }
  }

  const getDictList = async () => {
    const res = await getDictListAPI()
    if (res.code === 200) {
      setDictLists(res.data)
    }
  }

  useDidShow(() => {
    // getDictList()
    // getGoodsList()
  })

  return (
    <Blank top>
      <Space head>
        <Tabs>
          {dictLists.map((val) => {
            return <Tabs.TabPane key={val.id} tab={`第${val.id}个`}>
              <Space head>
                {list.get(val.id)?.map(item => (
                  <Card square>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Image style={{ borderRadius: 20 }} src={'https://tse3.mm.bing.net/th/id/OIP.BTnQOgzj11V54KJ6VR31sgHaE7?cb=iwp2&rs=1&pid=ImgDetMain'}></Image>
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
                ))}
              </Space>
            </Tabs.TabPane>
          })}
        </Tabs>
      </Space>
    </Blank>
  )

}
