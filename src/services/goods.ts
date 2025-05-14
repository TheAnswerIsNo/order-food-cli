import { getData } from "../utils/request"

export const getGoodsListAPI = async () => {
    return await getData(`/goods/cli/list`)
}