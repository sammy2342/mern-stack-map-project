import { client, urlFor } from '../../libary/client'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './ProductDetails.css'
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai'
import Product from '../../components/Product/Product'

export default function ProductDetails({productsInList, setProductsInList}) { 

    console.log(productsInList, 'this is for the product')
    const { id } = useParams()
    console.log(id, 'this is for the id')
    const [details, setDetails] = useState([])

    useEffect( function() { 
        async function getProductDetails() { 
            try {
                const query = `*[_type == "product" && slug.current == '${id}']` 
                const product = await client.fetch(query)
                
                console.log(product, 'thisdetailspagener')
                setDetails(product)
            } catch(err) {
                console.log(err)
            }
        }
        getProductDetails()
    }, [])

    return (
        <div>
            {details.map((item) => (
                <div className='product-detail-container'>
                    
                    <div>
                        <div className='image-container'>
                            <img src={urlFor(item.image && item.image[0])} alt="" />
                        </div>
                        {/* <div className='small-images-container'>
                            {item.image?.map((product, idx) => (
                                <img 
                                    src={urlFor(product)}
                                    className=''
                                    onMouseEnter=''
                                />
                            ))}
                        </div> */}
                    </div>
                    <div className="product-detail-desc">
                        <h1>{item.name}</h1>
                        <div className="reviews">
                            <div>
                                <AiFillStar />
                                <AiFillStar />
                                <AiFillStar />
                                <AiFillStar />
                                <AiOutlineStar />
                            </div>
                            <p>
                                (20)
                            </p>
                        </div>
                        <h4>Details: </h4>
                        <p>{item.details}</p>
                        <p className="price">${item.price}</p>
                        <div className="quantity">
                            <h3>Quantity:</h3>
                            <p className="quantity-desc">
                                <span className='minus' onClick=''>
                                    <AiOutlineMinus />
                                </span>
                                <span className='num' onClick=''>
                                    0
                                </span>
                                <span className='plus' onClick=''>
                                    <AiOutlinePlus />
                                </span>
                            </p>
                        </div>
                        <div className='buttons'>
                            <button type='button' className='add-to-cart' onClick=''>
                                Add To Cart
                            </button>
                        </div>
                        <div className='buttons'>
                            <button type='button' className='buy-now' onClick=''>
                                Buy Now
                            </button>
                        </div>
                </div>
                
                </div>
            ))}

            <h2>You May also Like</h2>
                <div className='marquee'>
                    <div className='maylike-products-container track'>
                        {productsInList.map((item) => (
                            <Product key={item._id} product={item}/>
                        ))}
                    </div>
                    
                </div>
        </div>
    )
}