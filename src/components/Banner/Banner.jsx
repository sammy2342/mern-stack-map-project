import { client } from '../../libary/client'
import { useEffect, useState } from "react"
import { urlFor } from '../../libary/client'

export default function Banner() { 

    const [bannerInList, setBannerInList] = useState([])

    useEffect( function() { 
        async function getBanner() { 
            try {
                const query = '*[_type == "banner"]'
                const banners = await client.fetch(query)
                console.log(banners)
                setBannerInList(banners)
                console.log(bannerInList, 'this is for the new banner')
            } catch(err) {
                console.log(err)
            }
        }
        getBanner()
    }, [])

    return ( 
        <>
        something
        {bannerInList ? <>  
            <div className='banner-container-item'>
                {bannerInList.map((item) => (
                    <div key={item._id}>
                        <div>{item.buttonText}</div>
                        <div>{item.desc}</div>
                        {/* <div><img src={item.image.asset} alt="" /></div> */}
                        <div>{item.largeText1}</div>
                        <div><img src={urlFor(item.image)} alt="" /></div>
                    </div>
                ))}
            </div>
        </> : null}
    </>
    )
}