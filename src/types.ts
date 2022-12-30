export interface ProductProps {
    name:string,
    price:number,
    id:string,
    colors: string[],
    company:string,
    category:string,
    image:string,
    featured?:boolean,
    shipping?:boolean,
    maxQuantity:number,
}

export interface ProductState {
    products:ProductProps[],
    sortedProducts:ProductProps[]
}