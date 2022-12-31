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

//product
export interface ProductState {
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
