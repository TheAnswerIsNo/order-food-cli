import { getData, postData } from "../utils/request"

/**
 * 获取订单列表
 * @returns 
 */
export const getOrderListAPI = async () => {
    return await getData(`/order/cli/list`)
}

/**
 * 获取制作者订单数量
 * @returns 
 */
export const getProductionNumberAPI = async () => {
    return await getData(`/order/cli/productionNumber`)
}

/**
 * 提交订单
 * @returns 
 */
export const submitAPI = async (data: any) => {
    return await postData(`/order/cli/submit`, data)
}

/**
 * 取消订单
 * @returns 
 */
export const cancleOrderAPI = async (orderId: string) => {
    return await getData(`/order/cli/cancel/${orderId}`)
}

/**
 * 付款
 * @returns 
 */
export const payOrderAPI = async (orderId: string) => {
    return await getData(`/order/cli/pay/${orderId}`)
}