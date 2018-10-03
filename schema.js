const { gql } = require('apollo-server-express')

const { SECRET_TOKEN } = process.env
const stripe = require('stripe')(SECRET_TOKEN)

// this should return an object of products
const getProducts = () => stripe.products.list({ limit: 100 }, (err, products) => products)

//  get product by ID
const getProduct = id => stripe.products.retrieve(id, (err, product) => product)

const typeDefs = gql`
    type Query {
        product(id: ID!): Product
        products: [Product!]!
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
`

const resolvers = {
    Query: {
        products: () => getProducts(),
        product: (parent, { id }) => getProduct(id),
    },
}

module.exports = { typeDefs, resolvers }
