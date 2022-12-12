import { useEffect, useState } from "react"
import './Footer.css'
import { client } from '../../libary/client'
import { urlFor } from '../../libary/client'
import { Link } from "react-router-dom"


export default function Footer() { 

    const [footer, setFooter] = useState([])

    useEffect( function() { 
        async function getFooter() { 
            try {
                const query = '*[_type == "banner"]'
                const footers = await client.fetch(query)
                console.log(footers)
                setFooter(footers)
                console.log(footer[0].discount, 'fooooooteerrrrrr')
            } catch(err) {
                console.log(err)
            }
        }
        getFooter()
    }, [])



    return ( 
        <>
        {footer[0] ? <>
            <div className="footer-banner-container">
                <div className="banner-desc">
                    <div className="left">
                        <p>{footer[0].discount}</p>
                        <h3>{footer[0].largeText1}</h3>
                        <h3>{footer[0].largeText2}</h3>
                        <p>{footer[0].saleTime}</p>
                    </div>
                    <div className="right">
                        <p>{footer[0].smallText}</p>
                        <h3>{footer[0].midText}</h3>
                        <h3>{footer[0].desc}</h3>
                    </div>
                    <Link herf={`/product/${footer[0].product}`}>
                        <button type="button">
                        {footer[0].buttonText}
                        </button>
                    </Link>
                    <img 
                    src={urlFor(footer[0].image)}
                    className="footer-image-banner-page"
                    />
                </div>
            </div>
        </> : null}
        </>
    )
}