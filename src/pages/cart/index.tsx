import { Text, View } from "@tarojs/components"
import React, { useEffect, useState } from "react"
import {
  Button,
  Card,
  Space,
  Checkbox,
  Row,
  Blank,
  Empty,
  NumberInput,
  Dialog,
} from '@fruits-chain/react-native-xiaoshu'
import { addToCartAPI, deleteCartAPI, getCartAPI } from "../../services/cart"
import { useDidShow } from "@tarojs/taro"
import Taro from "@tarojs/taro"

export default function Index() {
  const [selected, setSelected] = useState(false)
  const [list, setList] = useState<Array<any>>([])
  const [totalNumber, setTotalNumber] = useState(0)
  const [controlledGroup, setControlledGroup] = useState<Array<any>>([])
  const [disabled, setDisabled] = useState(true)

  const selectAll = () => {

  }

  const getCartList = async () => {
    const res = await getCartAPI()
    // Taro.showToast({ title: res.data, icon: 'success', duration: 1000 })
    if (res.code === 200) {
      setList(res.data)
    }
  }

  useDidShow(() => {
    getCartList()
  })

  const getTotalNumber = (val: Array<any>) => {
    const sum = list.reduce((prev, item) => {
      if (val.includes(item.id)) {
        return prev + item.price * item.number
      }
      return prev
    }, 0)
    sum == 0 ? setDisabled(true) : setDisabled(false)
    setTotalNumber(sum)
  }

  const onChange = (value: Array<string>) => {
    setControlledGroup(value)
    // getTotalNumber(value)
    if (value.length === list.length) setSelected(true)
    if (value.length === 0) setSelected(false)
  }

  const openDeteleDialog = (id: string) => {
    Dialog.confirm({
      title: '提示',
      message: '确定要删除吗？',
    }).then((action) => {
      if (action === 'confirm') {
        deleteCart(id)
      }
    })
  }

  const deleteCart = async (id: string) => {
    const res = await deleteCartAPI(id)
    if (res.code === 200) {
      getCartList()
      Taro.showToast({ title: res.msg || "删除成功", icon: 'success', duration: 1000 })
    }
  }

  const updateCart = async (cart: any) => {
    const res = await addToCartAPI(cart)
    if (res.code === 200) {
      getCartList()
      Taro.showToast({ title: res.msg || "修改成功", icon: 'success', duration: 1000 })
    }
  }

  function updateNumber(number: number, val: any) {
    const index = list.findIndex((item) => item.id === val.id)
    if (index !== -1) {
      const newList = [...list]
      newList[index].number = number
      setList(newList)
      // getTotalNumber(controlledGroup)
    }
  }

  return (
    <Blank style={{ paddingTop: 20 }}>
      <Space head>
        {list.length === 0 ? (
          <Empty />
        ) : (
          <Checkbox.Group
            style={{ marginTop: 100 }}
            multiple
            value={controlledGroup}
            onChange={(value) => onChange(value)}
            options={list.map((val) => {
              return {
                value: val.id,
                label: <Space head>
                  <Card
                    title={val.name}
                    extra={<Button type="primary" text="删除" danger onPress={() => openDeteleDialog(val.id)} />}
                  >
                    <Row style={{ justifyContent: 'space-between', paddingHorizontal: 16 }}>
                      <Text style={{ color: 'red', fontSize: 20, marginRight: 16 }}>￥{val.price}</Text>
                      <NumberInput type='digit'
                        style={{ color: 'red', fontSize: 20, marginRight: 16 }}
                        defaultValue={val.number}
                        value={val.number}
                        prefix={<Text>数量: </Text>}
                        onBlur={() => {
                          updateCart(val)
                        }}
                        onChange={(number) => { updateNumber(number, val) }}
                      >
                      </NumberInput>
                    </Row>
                  </Card>
                </Space> as any
              }
            })}
          >
          </Checkbox.Group>
        )}
        <View style={{ width: '100%', background: '#f7f8f8', position: 'fixed', bottom: '0', height: '60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Row style={{ width: '100%', justifyContent: 'space-between', paddingHorizontal: 16 }}>
            <Button type="primary" text={selected ? '取消全选' : '全选'} onPress={selectAll} />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ marginRight: 16 }}>合计: ￥{totalNumber}</Text>
              <Button disabled={disabled} type="primary" text="去结算" danger />
            </View>
          </Row>
        </View>
      </Space>
    </Blank >
  )
} 5  