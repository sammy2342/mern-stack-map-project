import './NewOrderPage.css'
import { client } from '../../libary/client'
import { useEffect, useState } from 'react'
import Banner from '../../components/Banner/Banner'
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
                <h1>NewOrderPage</h1> 
                <div className="product-headers-title">
                    <h2>Best Selling Products</h2>
                    <p className='title-header-p-tag'>Speakers of many viriations</p>
                </div>

                <div className='product-container-item'>
                    {productsInList.map((item) => (
                        <div key={item._id}>
                            <div>{item.name}</div>
                            <div>{item.price}</div>
                            <div><img src={item.image.asset} alt="" /></div>
                        </div>
                    ))}
                </div>

                Footer
            </>: null}
        </>
    )
}