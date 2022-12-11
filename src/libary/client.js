import saintyClient from '@sanity/client'
import imageUrl from '@sanity/image-url'

export const client = saintyClient({ 
    projectId: '9cixj163', 
    dataset: 'production',
    apiVersion: '2022-12-10',
    useCdn: true, 
    token: process.env.TOKEN_SANITY
})

// passing in the client
const builder = imageUrl(client)

export const urlFor = (source) => builder.image(source)