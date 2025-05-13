import { Text, View } from "@tarojs/components"
import React, { useState } from "react"
import {
  Button,
  Card,
  Space,
  Checkbox,
  Row,
  Blank,
} from '@fruits-chain/react-native-xiaoshu'

export default function Index() {
  const [selected, setSelected] = useState(false)
  const [list, setList] = React.useState([{ id: '', name: '', photos: [] }])

  const selectAll = () => {

  }

  return (
    <Blank>
      <Space head>
        {list.map(val => {
          return (
            <Checkbox
              style={{ width: '150%' }}
              value={val.id}
              renderIcon={val.photos[0]}
            >
              <Card
                title={val.name}
                extra={<Button type="primary" text="删除" danger />}
              />
            </Checkbox>
          )
        })}
        <View style={{ width: '100%', background: '#f7f8f8', position: 'fixed', bottom: '0', height: '60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Row style={{ width: '100%', justifyContent: 'space-between', paddingHorizontal: 16 }}>
            <Button type="primary" text={selected ? '取消全选' : '全选'} onPress={selectAll} />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ marginRight: 16 }}>合计: ￥{0}</Text>
              <Button type="primary" text="去结算" danger />
            </View>
          </Row>
        </View>
      </Space>
    </Blank>
  )
}