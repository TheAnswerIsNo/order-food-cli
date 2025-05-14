import { getData, postData } from "../utils/request"

//加入购物车
export const addToCartAPI = async (data: any) => {
    return await postData(`/cart/save`, data)
}

//获取购物车列表
export const getCartAPI = async () => {
    return await getData(`/cart/list`)
}

//购物车移除商品
export const deleteCartAPI = async (id: string) => {
    return await postData(`/cart/delete?cartId=${id}`)
}