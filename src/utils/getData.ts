export default async function (){
    const response = await fetch('https://course-api.com/react-store-products')
    return response.json()
}