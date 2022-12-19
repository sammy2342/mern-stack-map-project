import { loadStripe } from '@stripe/stripe-js'

let stripePromise

const getStripe = () => { 
    if(!stripePromise) { 
        // console.log(process.env.TEST)
        stripePromise = loadStripe('pk_test_51MFNACBIEZeIAiqxb5EeO8YSkvblEDSNpvpjbzC7I8dbpZ4Vk5OrxWz7eU4CZhCMi0HuFzFKdFZPy1htuXR2dbH400f1xTqxsM')
    }

    return stripePromise
}

export default getStripe