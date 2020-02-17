
/**
 * For testing purposes known dieticians and customers to db
 */
module.exports = {
    diet1: {
        id: '9b2a7778-73aa-4841-8a31-f88f6be268bf',
        name: "tera",
        education: "Ttm",
        place: "kuopio",
        email: 'tera@email.com',
        phone: "12304595",
        imageUrl: null,
        isPending: false,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    diet2: {
        id: '947c7835-3212-4608-a1a5-b2703b0f8538',
        name: "peutti",
        education: "Ttm",
        place: "kuopio",
        email: 'peutti@email.com',
        phone: "165498132",
        imageUrl: null,
        isPending: true,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    cust1: {
        id: 'efb936eb-19d5-47fd-9ba6-56d6b1c2baa0',
        name: "pete",
        email: "pete@email.com",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    cust2: {
        id: '0a188ad7-c013-4668-955b-fcfb7bc6725f',
        name: "tommi",
        email: "tommi@email.com",
        createdAt: new Date(),
        updatedAt: new Date()
    }
};