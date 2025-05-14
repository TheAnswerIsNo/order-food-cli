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
  const [checkList, setCheckList] = useState<Map<string, string>>(new Map<string, string>([]));

  const selectAll = () => {
    if (controlledGroup.length === list.length) {
      setSelected(false)
      setCheckList(new Map<string, string>([]));
      setControlledGroup([])
      getTotalNumber([])
      return
    }
    let idList: Array<string> = []
    const checkedList = new Map<string, string>()
    list.map((item) => {
      idList.push(item.id)
      checkedList.set(item.id, item.id)
    })
    setControlledGroup(idList)
    setCheckList(checkedList);
    setSelected(true)
    getTotalNumber(idList)
  }

  const getCartList = async () => {
    const res = await getCartAPI()
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

  const onChange = (id: string) => {
    let temp = []
    const newCheckList = new Map(checkList);

    const index = controlledGroup.findIndex(item => item === id)
    if (index !== -1) {
      temp = controlledGroup.filter(item => item !== id)
      setControlledGroup(temp)
      newCheckList.delete(id);
      setCheckList(newCheckList);
    } else {
      temp = [...controlledGroup, id]
      setControlledGroup(temp)
      newCheckList.set(id, id);
      setCheckList(newCheckList);
    }
    getTotalNumber(temp)
    if (temp.length === list.length) setSelected(true)
    else setSelected(false)
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
      getTotalNumber(controlledGroup)
    }
  }

  return (
    <>
      <Blank style={{ paddingTop: 20 }}>
        <Space head >
          {list.length === 0 ? (
            <Empty />
          ) : (
            <View style={{ height: '100%' }}>
              <View style={{ flex: 1, padding: 10 }}>
                {
                  list.map((val, index) => {
                    return <View key={index} style={{ flexDirection: 'row', marginTop: 10 }} onClick={() => { onChange(val.id) }}>
                      <Checkbox
                        value={checkList.get(val.id)}
                        inactiveValue={false}
                        activeValue={val.id}
                      >
                      </Checkbox>
                      <Card
                        title={val.name}
                        style={{ marginLeft: 10, flex: 1 }}
                        extra={<Button type="primary" text="删除" danger onPress={() => openDeteleDialog(val.id)} />}
                      >
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', width: 150 }}>
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
                        </View>
                      </Card>
                    </View>
                  })
                }
              </View>

              <View style={{ width: '100%', background: '#f7f8f8', position: 'fixed', bottom: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
                <Row style={{ width: '100%', justifyContent: 'space-between', paddingHorizontal: 16 }}>
                  <Button type="primary" text={selected ? '取消全选' : '全选'} onPress={selectAll} />
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ marginRight: 16 }}>合计: ￥{totalNumber}</Text>
                    <Button disabled={disabled} type="primary" text="去结算" danger />
                  </View>
                </Row>
              </View>
            </View >
          )
          }

        </Space >

      </Blank >

    </>
  )
} 