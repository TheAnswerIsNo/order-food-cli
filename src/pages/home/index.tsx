import { Blank, Space, Tabs } from '@fruits-chain/react-native-xiaoshu'
import { View, Text, Image } from '@tarojs/components'


export default function Index() {

  return (
    <View>
      <Space head>
        <View >
          <View style={{ justifyContent: 'space-around', flexDirection: 'row', padding: 10 }}>
            <Image src={'https://www.bing.com/images/search?view=detailV2&ccid=nPpB9KW1&id=2169F83ADC5F72A2753097362AD37E310838AA34&thid=OIP.nPpB9KW1NHvHP8cWB6OiygHaHa&mediaurl=https%3a%2f%2fimg.ixintu.com%2fupload%2fjpg%2f20210528%2fc36821c54793d4aee5e3aa774d650f0b_87729_800_800.jpg!con&exph=800&expw=800&q=%e5%a4%96%e5%8d%96%e8%87%aa%e6%8f%90%e5%9b%be%e7%89%87&simid=608009581715876990&FORM=IRPRST&ck=EF578DF05D826370E6E84CAE66C4DDD7&selectedIndex=10&itb=0'}></Image>
            <Image src={'https://www.bing.com/images/search?view=detailV2&ccid=H7TkC%2fqo&id=3D4CA199568106BA136C034E14BC013FD219FCCA&thid=OIP.H7TkC_qofwgZX0wyUExJKwHaHa&mediaurl=https%3a%2f%2fbpic.588ku.com%2felement_water_img%2f19%2f06%2f08%2f8dd36cc520d59ecce7dacbcf3d622138.jpg&exph=651&expw=650&q=%e5%a0%82%e9%a3%9f%e5%b0%b1%e9%a4%90%e5%9b%be%e7%89%87&simid=608002245924242431&FORM=IRPRST&ck=29EDCC7CE88F087BAE06B724432C60E8&selectedIndex=231&itb=0'}></Image>
          </View>
          <View style={{ justifyContent: 'space-around', flexDirection: 'row', padding: 10, backgroundColor: 'red' }}>
            <Text style={{ textAlign: 'center', color: 'white' }}>外卖自提</Text>
            <Text style={{ textAlign: 'center', color: 'white' }}>堂食就餐</Text>
          </View>
        </View>
      </Space >
      <Tabs
        textColor='black'
        indicatorColor='black'
        activeTextColor='black'
      // tabBarStyle={{ borderTopStartRadius: 10, borderTopRightRadius: 10 }}
      >
        <Tabs.TabPane key='recommend' tab='推荐' ></Tabs.TabPane>
        <Tabs.TabPane key='offer' tab='优惠卷' ></Tabs.TabPane>
      </Tabs>
    </View>

  )

}
