import { Blank, Button, Card, Empty, Row, Space } from "@fruits-chain/react-native-xiaoshu";
import { Image, Text, View } from "@tarojs/components";
import { useEffect, useState } from "react";
import { cancleOrderAPI, getOrderListAPI, payOrderAPI } from "../../services/order";
import { useRouter } from "@tarojs/taro";
import { OrderStatus } from "../../constant/order";
import Taro from "@tarojs/taro";


export default function Index() {
  const router: any = useRouter();
  const data = JSON.parse(decodeURIComponent(router.params.params))

  const cancleOrder = async () => {
    const res = await cancleOrderAPI(data.id);
    if (res.code === 200) {
      Taro.showToast({
        title: res.msg || '取消成功',
        icon: 'success',
        duration: 1000
      })
      Taro.switchTab({
        url: 'pages/goods/index'
      })
    }
  }

  const payOrder = async () => {
    const res = await payOrderAPI(data.id);
    if (res.code === 200) {
      Taro.showToast({
        title: res.msg || '付款成功',
        icon: 'success',
        duration: 1000
      })
      Taro.switchTab({
        url: 'pages/goods/index'
      })
    }
  }

  return (
    <Blank>
      <Space head>
        <Card square>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flex: 1 }}>
              <Space>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View style={{ marginBottom: 20 }}>
                    <Text>订单号: <Text style={{ color: 'red', fontSize: 30 }}>{data.orderNo}</Text></Text>
                  </View>
                  <View>
                    <Text style={{ fontSize: 20 }}>{data.dine ? '外带' : '堂食'}</Text>
                  </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
                  <View>
                    <Text>总金额 ￥<Text style={{ color: 'red' }}>{data.totalPrice}</Text></Text >
                  </View>
                  <View >
                    <Text style={{ fontSize: 20 }}>{OrderStatus[data.status] || data.status}</Text>
                  </View>
                </View>

                <View style={{ flexDirection: 'row-reverse' }}>
                  <Text style={{ fontSize: 20 }}>{data.createTime}</Text>
                </View>
                {
                  data.orderListDetailList.map((item: any) => {
                    return <Space key={item.goodsId} style={{ flexDirection: 'row', marginTop: 10 }}>
                      <View>
                        <Image src={item.photos[0]}></Image>
                      </View>
                      <View style={{ height: 100, justifyContent: 'space-around' }}>
                        <Text>{item.name}</Text>
                        <Text>数量: {item.number}</Text>
                        <Text>单价: <Text style={{ color: 'red' }}>{item.price}</Text></Text>
                      </View>
                    </Space>
                  })
                }
              </Space>
            </View>
          </View>
        </Card>
        {data.status === 0 ? (
          <View style={{ width: '100%', background: '#f7f8f8', position: 'fixed', bottom: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
            <Row style={{ width: '100%', justifyContent: 'space-between', paddingHorizontal: 16 }}>
              <Button type="primary" text="取消订单" onPress={cancleOrder} />
              <Button type="primary" color={"green"} text="付款" danger onPress={payOrder} />
            </Row>
          </View>
        ) : null}

      </Space>
    </Blank >
  )
} 