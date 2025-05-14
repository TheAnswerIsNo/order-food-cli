import { getData } from "../utils/request"

export const getDictListAPI = async () => {
    return await getData(`/dict/cli/list`)
}