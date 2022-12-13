import { client } from '../../libary/client'
import { useEffect, useState } from "react"
import { urlFor } from '../../libary/client'
import './Banner.css'

export default function Banner() { 

    const [bannerInList, setBannerInList] = useState([])

    useEffect( function() { 
        async function getBanner() { 
            try {
                const query = '*[_type == "banner"]'
                const banners = await client.fetch(query)
                // console.log(banners)
                setBannerInList(banners)
                // console.log(bannerInList, 'this is for the new banner')
            } catch(err) {
                console.log(err)
            }
        }
        getBanner()
    }, [])

    return ( 
        <>
        {bannerInList ? <>  
            <div className='banner-container-item'>
                {bannerInList.map((item) => (
                    <div key={item._id}>
                        <div className='button-text-hidder'>{item.buttonText}</div>
                        <div className='small-text-banner-text'>{item.smallText}</div>
                        <div className='mid-text-banner-text'>{item.midText}</div>
                        {/* <div><img src={item.image.asset} alt="" /></div> */}
                        <div className='large-text-1-banner'>{item.largeText1}</div>
                        <div><img src={urlFor(item.image)} alt="" className='image-banner-page'/></div>
                        <div className='button-text-banner'>{item.buttonText}</div>
                        <div className='description-banner-item-text'><h5>Description</h5></div>
                        <div className='description-banner-item-api'>{item.desc}</div>
                    </div>
                ))}
            </div>
        </> : null}
    </>
    )
}