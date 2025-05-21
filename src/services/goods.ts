import { getData } from "../utils/request"

/**
 * 获取商品列表
 * @param dictId 分类id
 * @returns 
 */
export const getGoodsListAPI = async (dictId: string) => {
    return await getData(`/goods/cli/list/${dictId}`)
}

/**
 * 获取商品列表
 * @param dictId 分类id
 * @returns 
 */
export const getRecommendGoods = async () => {
    return await getData(`/goods/cli/list/recommend`)
}