
/**
 * For testing purposes known dieticians and customers to db
 */
module.exports = {
    diet1: {
        id: '9b2a7778-73aa-4841-8a31-f88f6be268bf',
        name: "Tera",
        education: "Ttm",
        place: "Turku",
        email: 'tera@email.com',
        phone: "12304595",
        imageUrl: null,
        isPending: false,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    diet2: {
        id: '947c7835-3212-4608-a1a5-b2703b0f8538',
        name: "Peutti",
        education: "Ttm",
        place: "Oulu",
        email: 'peutti@email.com',
        phone: "165498132",
        imageUrl: null,
        isPending: true,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    diet3: {
        id: '8825cbfe-bd30-449a-9465-c5f27f813b52',
        name: "Mauno Koivisto",
        education: "Ttm",
        place: "Helsinki",
        email: 'mauno@email.com',
        phone: "323423444",
        imageUrl: null,
        isPending: false,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    diet4: {
        id: '6d20eeba-df5c-46e1-9ab0-4f940b19c4fa',
        name: "Tarja Halonen",
        education: "Ttm",
        place: "Rovaniemi",
        email: 'tarja@email.com',
        phone: "633424444",
        imageUrl: null,
        isPending: true,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    cust1: {
        id: 'efb936eb-19d5-47fd-9ba6-56d6b1c2baa0',
        name: "Pete",
        email: "pete@email.com",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    cust2: {
        id: '0a188ad7-c013-4668-955b-fcfb7bc6725f',
        name: "Tommi",
        email: "tommi@email.com",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    cust3: {
        id: '9baf2ead-76d3-4084-93d6-7a390a521477',
        name: "Arttu",
        email: "arttu@email.com",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    cust4: {
        id: 'f1ff4bb2-9d2b-473e-a550-131708fb4087',
        name: "Tero",
        email: "tero@email.com",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    user1: {
        id: 'e9e85d25-718a-4c12-b7f4-8f7157e86832',
        username: 'admin@email.com',
        password: 'salasana',
        roleId: 1,
        dieticianId: null,
    },
    user2: {
        id: 'c441f5db-b670-4a95-83ac-05287bb4bc86',
        username: 'tera@email.com',
        password: 'salasana',
        roleId: 2,
        dieticianId: '9b2a7778-73aa-4841-8a31-f88f6be268bf',
    }
};