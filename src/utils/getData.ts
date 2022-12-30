import { ProductProps } from "../types"

export default async function (){
    const response = await fetch('https://course-api.com/react-store-products')
    const data = (await response.json()).map((item:any):ProductProps => ({...item,maxQuantity:Math.ceil(Math.random()*17)}))
    return data
}