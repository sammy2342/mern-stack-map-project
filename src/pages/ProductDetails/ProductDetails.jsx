import { client, urlFor } from '../../libary/client'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function ProductDetails() { 

    const { id } = useParams()
    console.log(id, 'this is for the id')
    const [details, setDetails] = useState([])

    useEffect( function() { 
        async function getProductDetails() { 
            try {
                const query = `*[_type == "product" && slug.current == '${id}']` 
                const product = await client.fetch(query)
                
                console.log(product, 'thisdetailspagener')
            } catch(err) {
                console.log(err)
            }
        }
        getProductDetails()
    }, [])

    return (
        <div>

        </div>
    )
}