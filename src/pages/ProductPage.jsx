import React, { useEffect, useState } from 'react'
import Cards from '../components/Header/Products/Cards'
import axios from 'axios'

const ProductPage = () => {

    const [products,setProducts] = useState([])


    const getProducts = async() =>{
        try {
            const res = await axios.get('http://localhost:5000/api/admin/');
             setProducts(res.data)
        } catch (error) {
            console.log(error)
        }
    }

useEffect(()=>{
 getProducts()
},[])

console.log(products,"hello")

  return (
    <div>
        {
            products.map((product)=>{

                return <Cards key={product._id} id={product._id} pTitle={product.title} pImage={product.image[0]} pDesc={product.description} />
            })
        }
    </div>
  )
}

export default ProductPage