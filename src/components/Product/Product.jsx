import { Link } from 'react-router-dom'
import { urlFor } from '../../libary/client'
import './Product.css'


export default function Product({ productsInList }) {

    console.log(productsInList, 'this is in the product commpent')
    return ( 
        <div className='products-container'>
            {productsInList.map((item) => (
                <div>
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
                </div>
            ))}
        </div>
    )
}