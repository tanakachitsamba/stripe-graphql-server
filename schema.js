const { gql } = require('apollo-server-express')

const { SECRET_TOKEN } = process.env
const stripe = require('stripe')(SECRET_TOKEN)

// this should return an object of products
const getProducts = () => stripe.products.list({ limit: 100 }, (err, products) => products)

//  get product by ID
const getProduct = id => stripe.products.retrieve(id, (err, product) => product)

// get all skus
const getSKUs = () => stripe.skus.list({ limit: 100 }, (err, skus) => skus)

// get skus by product id?
const getSKU = id => stripe.skus.retrieve(id, (err, sku) => sku)

const typeDefs = gql`
    type Query {
        product(id: ID!): Product
        products: [Product!]!
        skus: [SKU!]!
        sku(id: ID!): SKU
    }

    type Product {
        id: ID!
        object: String
        active: Boolean
        caption: String
        created: Number
        description: String
        livemode: Boolean
        name: String
        shippable: Boolean
        type: String
        updated: Number
    }

    type SKU {
        id: ID!
    }
`

const resolvers = {
    Query: {
        products: () => getProducts(),
        product: (parent, { id }) => getProduct(id),
        sku: (parent, { id }) => getSKU(id),
        skus: () => getSKUs(),
    },
}

module.exports = { typeDefs, resolvers }
