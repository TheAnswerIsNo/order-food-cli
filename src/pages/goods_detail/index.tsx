import { Image, Text, View } from '@tarojs/components'
import { Blank, Button, Dialog, Empty, Space, } from '@fruits-chain/react-native-xiaoshu'
import { addToCartAPI } from '../../services/cart';
import { useRouter } from '@tarojs/taro';
import Taro from '@tarojs/taro';


export default function Index() {
  const router: any = useRouter()
  const data = JSON.parse(decodeURIComponent(router.params.params))

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
      Taro.navigateBack()
    }
  }

  return (
    <Blank top>
      <Space style={{ flexDirection: 'row', marginTop: 10 }}>
        <View>
          <Image src={data.photos[0]} style={{ height: 250 }}></Image>
        </View>
        <View style={{ flexDirection: 'column', justifyContent: 'space-between', height: 250 }}>
          <View style={{ height: 100, marginLeft: 20 }}>
            <Text style={{ margin: 10 }}>{data.name}</Text>
            <Text style={{ margin: 10 }}>单价: <Text style={{ color: 'red' }}>{data.price}</Text></Text>
            <Text style={{ margin: 10 }}>描述: {data.description}</Text>
          </View>
          <View style={{ marginLeft: 10 }}>
            <Button type="primary" danger text="加入购物车" onPress={() => {
              addCart(data)
            }}>
            </Button>
          </View>
        </View>
      </Space>
    </Blank >
  )

}
