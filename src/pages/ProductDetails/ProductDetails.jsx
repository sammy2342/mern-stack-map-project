import { client, urlFor } from '../../libary/client'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './ProductDetails.css'
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai'
import Product from '../../components/Product/Product'
import { useStateContext } from '../../context/StateContext'
import { Link, useNavigate} from 'react-router-dom'

export default function ProductDetails({productsInList}) { 

    // console.log(productsInList, 'this is for the product')
    const { id } = useParams()
    // console.log(id, 'this is for the id')
    const [details, setDetails] = useState([])
    const [allProduct, setAllProduct] = useState([])
    const [index, setIndex] = useState(0)
    const { decQty, incQty, qty, onAdd } = useStateContext()

    useEffect( function() { 
        async function getProductDetails() { 
            try {
                const query = `*[_type == "product" && slug.current == '${id}']` 
                const product = await client.fetch(query)
                // console.log(product, 'thisdetailspagener')
                setDetails(product)
            } catch(err) {
                console.log(err)
            }
        }
        getProductDetails()
    }, [])

    console.log(allProduct, 'this is for the all')

    useEffect ( function () { 
        async function allProducts() { 
            const query = '*[_type == "product"]'
            const products = await client.fetch(query)
            // console.log(products, 'this is for the product inside the detail page line 34')
            setAllProduct(products)
        }
        allProducts()
    }, [details])
    // console.log(allProduct, 'this is for all product')
    // console.log(details._id, 'this is for the details')
    return (

        <div>
            {allProduct.length ? <>
            {details.map((item, idx) => (
                <div className='product-detail-container' key={item._id}>
                    
                    <div>
                        <div className='image-container'>
                            <img src={urlFor(item.image && item.image[index])} alt=""  className='product-detail-image'/>
                        </div>
                        <div className='small-images-container'>
                            {item.image?.map((product, idx) => (
                                <img 
                                    src={urlFor(product)}
                                    className={idx === index ? 'small-image selected-image' : 'small-image'}
                                    onMouseEnter={() => setIndex(idx)}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="product-detail-desc">
                        <h1 className='details-h-4'>{item.name}</h1>
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
                        <h4 className='details-h-4'>Details: </h4>
                        <p className='details-h-4'>{item.details}</p>
                        <p className="price details-h-4">${item.price}</p>
                        <div className="quantity">
                            <h3>Quantity:</h3>
                            <p className="quantity-desc">
                                <span className='minus' onClick={decQty}>
                                    <AiOutlineMinus />
                                </span>
                                <span className='num' >
                                    {qty}
                                </span>
                                <span className='plus'onClick={incQty} >
                                    <AiOutlinePlus />
                                </span>
                            </p>
                        </div>
                        <div className='buttons-for-add-cart-buy-now'>
                            <div className='buttons'>
                                <button type='button' className='add-to-cart' onClick={() => onAdd(details, qty)}>
                                    Add To Cart
                                </button>
                            </div>
                            <div className='buttons'>
                                <button type='button' className='buy-now' >
                                    Buy Now
                                </button>
                            </div>
                        </div>
                </div>
                
                </div>
            ))}
            
            <h2>You May also Like</h2>
            
                <div className='marquee'>
                    <div className='maylike-products-container track'>
                        {allProduct?.map((item) => (
                            <>
                                <Link to={`/product/${item.slug.current}`}>
                                    <div className='product-card'>
                                        <img src={urlFor(item.image && item.image[0])}
                                        alt=""
                                        height={250}
                                        width={250}
                                        className="product-image"
                                        />
                                        <p className='produce-name'>{item.name}</p>
                                        <p className='product-price'>${item.price}</p>
                                    </div>  
                                </Link>
                            </>
                        ))}
                    </div> 
                    
                </div>
            </> : null}
        </div>
    )
}