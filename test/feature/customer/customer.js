// const chai = require('chai');

// const { assert } = chai;

// const chaiHttp = require('chai-http');
// const CustomerModel = require('../../../models/customer');

// chai.use(chaiHttp);

// const server = require('../../../server');
// const should = chai.should();

// process.env.NODE_ENV = 'test';

// let custId;

// describe('GET /customers', async () => {
//     beforeEach(async () => {
//         const customer = await CustomerModel.create({
//             name: "Tommi Testeri",
//             email: "tommi.testeri@email.com"
//         });
//         custId = customer.id;
//     });

//     afterEach(async () => {
//         await CustomerModel.destroy({where:{id:custId}});
//     });

//     it('it should GET all customers', async () => {
//         const response = await chai.request(server).get('/api/customers/').send();
//         console.log(response.body);

//         assert.equal(response.status, 200);
//         assert.isTrue(Array.isArray(response.body));

//     });

// });