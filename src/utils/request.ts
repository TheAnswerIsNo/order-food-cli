import Taro, { Chain } from "@tarojs/taro"

// 定义 responseDataType 类
export class ResponseDataType {
  constructor(
    public code?: number,
    public msg?: string,
    public data?: any
  ) { }
}

function getHost(url: string) {
  const host = "http://10.103.78.17:8080" + url
  return host;
}

export const getData = async (url: string, params?: object): Promise<ResponseDataType> => {
  const host = getHost(url)
  const result = await Taro.request({
    method: 'GET',
    url: host,
    data: params,
    fail: function (res) {
      Taro.showToast({ title: res.errMsg, icon: 'error' })
    }
  })
  return new ResponseDataType(
    result.data.code || 0,
    result.data.message || '',
    result.data.data || null
  );
}

export const postData = async (url: string, data?: object): Promise<ResponseDataType> => {
  const host = getHost(url)
  const result = await Taro.request({
    method: 'POST',
    url: host,
    data: data,
    header: {
      'content-type': 'application/json',
    },
    success: function (res) {
      if (url.indexOf('/login/wechat') !== -1) {
        // 从响应头中获取 token
        const token = res.header['authorization'];
        Taro.setStorageSync('token', token);
      }
    },
    fail: function (res) {
      Taro.showToast({ title: res.errMsg, icon: 'error' })
    }
  })
  return new ResponseDataType(
    result.data.code || 0,
    result.data.message || '',
    result.data.data || null
  );
}

export const postFormData = async (url: string, data?: object): Promise<ResponseDataType> => {
  const host = getHost(url)
  const result = await Taro.request({
    method: 'POST',
    url: host,
    data: data,
    header: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    fail: function (res) {
      Taro.showToast({ title: res.errMsg, icon: 'error' })
    }
  })
  return new ResponseDataType(
    result.data.code || 0,
    result.data.message || '',
    result.data.data || null
  );
}
