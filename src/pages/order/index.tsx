import { Blank, Button, Card, Empty, Space } from "@fruits-chain/react-native-xiaoshu";
import { Image, Text, View } from "@tarojs/components";
import { useEffect, useState } from "react";
import { getOrderListAPI, getProductionNumberAPI } from "../../services/order";
import { OrderStatus } from "../../constant/order";
import Taro, { useDidShow } from "@tarojs/taro";


export default function Index() {
  const [list, setList] = useState<Array<any>>([]);
  const [productionNumber, setProductionNumber] = useState(0);

  const getList = async () => {
    const res = await getOrderListAPI();
    if (res.code === 200) {
      setList(res.data);
    }
  }

  const getProductionNumber = async () => {
    const res = await getProductionNumberAPI();
    if (res.code === 200) {
      setProductionNumber(res.data);
    }
  }

  const openDetail = (item: any) => {
    const params = encodeURIComponent(JSON.stringify(item));
    Taro.navigateTo({
      url: `pages/order_detail/index?params=${params}`,
    })
  }

  useDidShow(() => {
    getList();
    getProductionNumber();
  })

  return (
    <Blank>
      {
        list.length === 0 ? (
          <Empty />
        ) : (
          <Space head>
            <View style={{ margin: 10 }}>
              <Text style={{ fontSize: 20, color: 'red', textAlign: 'center' }}>前方正在制作中订单数量:  {productionNumber}</Text>
            </View>
            {
              list.map((item) => {
                return <View key={item.id} onClick={() => openDetail(item)}>
                  <Card square>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <View style={{ marginBottom: 20 }}>
                        <Text>订单号: <Text style={{ color: 'red', fontSize: 30 }}>{item.orderNo}</Text></Text>
                      </View>
                      <View>
                        <Text style={{ fontSize: 20 }}>{item.dine ? '外带' : '堂食'}</Text>
                      </View>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
                      <View>
                        <Text>总金额 ￥<Text style={{ color: 'red' }}>{item.totalPrice}</Text></Text >
                      </View>
                      <View >
                        <Text style={{ fontSize: 20 }}>{OrderStatus[item.status] || item.status}</Text>
                      </View>
                    </View>

                    <View style={{ flexDirection: 'row-reverse' }}>
                      <Text style={{ fontSize: 20 }}>{item.createTime}</Text>
                    </View>
                  </Card>
                </View>
              })
            }
          </Space>
        )
      }
    </Blank >
  )
} 