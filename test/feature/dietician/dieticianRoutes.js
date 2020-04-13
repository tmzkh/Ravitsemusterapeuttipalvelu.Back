const chai = require('chai');

const { assert } = chai;

const chaiHttp = require('chai-http');
const DieticianModel = require('../../../models/dietician');

chai.use(chaiHttp);

const server = require('../../../server');
const should = chai.should();

process.env.NODE_ENV = 'test';

let dietId;

describe('GET /dieticians', async () => {
    beforeEach(async () => {
        const dietician = await DieticianModel.create({
            name: "Tommi Testeri",
            education: "TTM",
            place: "Kuopio",
            phone: "0401234567",
            imageUrl: "https://localhost.com/kuva.jpg",
            isPending: false,
            email: "tommi.testeri@email.com"
        });
        dietId = dietician.id;
    });

    afterEach(async () => {
        await DieticianModel.destroy({where:{id:dietId}});
    });

    it('it should GET all dieticians', async () => {
        const response = await chai.request(server).get('/api/dieticians/').send();
        console.log(response.body);

        assert.equal(response.status, 200);
        assert.isTrue(Array.isArray(response.body));

    });

});