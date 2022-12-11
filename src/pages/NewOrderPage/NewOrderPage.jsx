import './NewOrderPage.css'
import { client } from '../../libary/client'
import { useEffect } from 'react'
import axios from 'axios'


export default function NewOrderPage() {

    useEffect(function() {
        async function getImage() { 
            try {
                const query = '*[_type == "product"]'
                const products = await client.fetch(query)
                console.log(products)
            } catch(err) {
                console.log(err)
            }
            
        }
        getImage()
    }, [])

    return (
        <>  
            <h1>NewOrderPage</h1> 
            <div className="product-headers-title">
                <h2>Best Selling Products</h2>
                <p className='title-header-p-tag'>Speakers of many viriations</p>
            </div>

            <div className='product-container-item'>
                {['Product 1', 'Product 2'].map((item) => { 
                    return item
                })}
            </div>

            Footer
        </>
    )
}