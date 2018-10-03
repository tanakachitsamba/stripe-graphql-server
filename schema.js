const { gql } = require('apollo-server-express')

const { SECRET_TOKEN } = process.env
const stripe = require('stripe')(SECRET_TOKEN)

// this should return an object of products
const getProducts = () => stripe.products.list({ limit: 100 }, (err, products) => !err && products)

//  get product by ID
const getProduct = id => stripe.products.retrieve(id, (err, product) => !err && product)

// get all skus
const getSKUs = () => stripe.skus.list({ limit: 100 }, (err, skus) => !err && skus)

// get skus by product id?
const getSKU = id => stripe.skus.retrieve(id, (err, sku) => !err && sku)

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
        description: String
        livemode: Boolean
        name: String
        shippable: Boolean
        type: String
        created: String
        updated: String
        attributes: Attributes
    }

    type SKU {
        id: ID!
    }

    type Attributes {

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
