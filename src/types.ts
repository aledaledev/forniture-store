export interface ProductProps {
    description:string,
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

//product
export interface ProductState {
    selectedProduct:ProductProps | null,
    products:ProductProps[],
    sortedProducts:ProductProps[],
    filteredProducts:ProductProps[],
    companies:string[],
    categories:string[],
    prices:{
        maxPrice:number,
        minPrice:number,
    }
}

//form
export interface FilterState {
    category:string,
    company:string,
    priceRange: number, 
    featured: boolean,
    freeShipping:boolean,
}

export interface FormState{
    sort: string,
    filter: FilterState,
}

//favorites

export interface Favorite {
    img:string,
    name:string,
    id:string,
    company:string
}

export interface FavoriteState {
    favorites: Favorite[],
    openFavorite:boolean
}

//cart

export interface Cart {
    img:string,
    name:string,
    id:string,
    price:number,
    maxQuantity:number,
    quantity?:number
} 

export interface CartState {
    cartProducts: Cart[],
    totalQuantity:number,
    totalPrice:number,
    openCart:boolean
}