import './NewOrderPage.css'
import { client } from '../../libary/client'
import { useEffect, useState } from 'react'
import Banner from '../../components/Banner/Banner'
import Product from '../../components/Product/Product'
import Footer from '../../components/Footer/Footer'
import { urlFor } from '../../libary/client'
import axios from 'axios'


export default function NewOrderPage() {

    const [productsInList, setProductsInList] = useState([])

    useEffect(function() {
        async function getImage() { 
            try {
                const query = '*[_type == "product"]'
                const products = await client.fetch(query)
                console.log(products, 'this is the prodct console.log')
                setProductsInList(products)
                console.log(productsInList, 'this is for the new product')
            } catch(err) {
                console.log(err)
            }
            
        }
        getImage()
    }, [])

    return (
        <>
            
            {productsInList ? <> 
                <Banner />
                <div className="product-headers-title">
                    <h2 className='produce-header-h2-selling-products'>Best Selling Products</h2>
                    <p className='title-header-p-tag'>Speakers of many viriations</p>
                    <Product productsInList={productsInList}/>
                </div>

                {/* <div className='product-container-item'>
                    {productsInList.map((item) => (
                        <div key={item._id}>
                            <div>{item.name}</div>
                            <div>{item.price}</div>
                            <div>
                                {/* {item.image && (
                                    <img 
                                    src={urlFor(item.image).width(200).url()}
                                    alt="sdc" 
                                    />
                                )} */}
                            {/* </div>
                        </div> */}
                    {/* ))} */}
                {/* </div> */} 

                <Footer />
            </>: null}
        </>
    )
}