process.env.NODE_ENV = 'test'

const chai = require('chai');

const { assert } = chai;

const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const server = require('../../../server');
const should = chai.should();


const DieticianModel = require('../../../models/dietician');
const ExpertiseModel = require('../../../models/expertise');
const UserModel = require('../../../models/user');
const LoginModel = require('../../../models/login');
const LoginController = require('../../../controllers/loginController');


const knownEntities = require('../../../seeders/helpers/knownEntities');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);
const pwd = 'salasana';
const hashedPwd = bcrypt.hashSync(pwd, salt);

process.env.NODE_ENV = 'test';

let dietician1;
let dietician2;
let dietician3;
let expertises;
let user1;
let login1;
let login2;

describe('GET /dieticians', async () => {
    before(async () => {
        // create dietician#1
        dietician1 = await DieticianModel.create({
            name: "Tommi Testeri",
            education: "TTM",
            place: "Kuopio",
            phone: "0401234567",
            imageUrl: "https://localhost.com/kuva.jpg",
            isPending: false,
            email: "tommi.testeri@email.com"
        });

        // fetch expertises
        expertises = await ExpertiseModel.findAll();

        // create user for dietician#1
        user1 = await UserModel.create({
            username: dietician1.email,
            password: hashedPwd,
            roleId: 2,
            dieticianId: dietician1.id,
        });

        // create login for dietician#1
        login1 = await LoginController.create(user1.id);

        // login for admin
        login2 = await LoginController.create(knownEntities.user1.id);

        await dietician1.addExpertise(expertises[0]);
        await dietician1.addExpertise(expertises[1]);
        await dietician1.addExpertise(expertises[5]);

        // create dietician#2
        dietician2 = await DieticianModel.create({
            name: "Tauno Testeri",
            education: "TTM",
            place: "Kuopio",
            phone: "0401234567",
            imageUrl: "https://localhost.com/kuva.jpg",
            isPending: false,
            email: "tauno.testeri@email.com"
        });

        await dietician2.addExpertise(expertises[2]);
        await dietician2.addExpertise(expertises[4]);
        await dietician2.addExpertise(expertises[6]);

        dietician3 = await DieticianModel.create({
            name: "Turo Testeri",
            education: "TTM",
            place: "Kuopio",
            phone: "0401234567",
            imageUrl: "https://localhost.com/kuva.jpg",
            isPending: true,
            email: "turo.testeri@email.com"
        });

        await dietician3.addExpertise(expertises[2]);
    });

    after(async () => {
        await dietician1.removeExpertise(expertises[0]);
        await dietician1.removeExpertise(expertises[1]);
        await dietician1.removeExpertise(expertises[5]);
        await LoginModel.destroy({where:{id:login1.id}});
        await UserModel.destroy({where:{id:user1.id}});
        await DieticianModel.destroy({where:{id:dietician1.id}});

        await dietician2.removeExpertise(expertises[2]);
        await dietician2.removeExpertise(expertises[4]);
        await dietician2.removeExpertise(expertises[6]);
        await DieticianModel.destroy({where:{id:dietician2.id}});

        await dietician3.removeExpertise(expertises[2]);
        await DieticianModel.destroy({where:{id:dietician3.id}});

        await LoginModel.destroy({where:{id:login2.id}});
    });

    it('it should GET all dieticians', async () => {
        const res = await chai.request(server)
            .get('/api/dieticians/')
            .set('content-type', 'application/json')
            .query({
                'expertises': '[]'
            }).send();

        assert.equal(res.status, 200);
        assert.isArray(res.body);
        assert.equal(res.body.length, 2);
    });

    it('it should GET dietician by id', async () => {
        const res = await chai.request(server)
            .get('/api/dieticians/' + dietician1.id)
            .set('content-type', 'application/json')
            .send();

        assert.equal(res.status, 200);
        assert.isObject(res.body);
        assert.equal(res.body.name, dietician1.name);
    });

    it('it should filter result by expertises', async () => {
        const res = await chai.request(server)
            .get('/api/dieticians/')
            .set('content-type', 'application/json')
            .query({
                'expertises': '[1]'
            }).send();

        assert.equal(res.status, 200);
        assert.isArray(res.body);
        assert.equal(res.body.length, 1);
        assert.equal(res.body[0].name, dietician1.name);
    });

    it('it should return pending dieticians for admin', async () => {

        const res = await chai.request(server)
            .get('/api/dieticians/')
            .set({'content-type': 'application/json', 'accesstoken': login2.accessToken})
            .query({
                'expertises': '[]',
                'isPending': 'true'
            }).send();

        assert.equal(res.status, 200);
        assert.isArray(res.body);
        assert.equal(res.body.length, 1);
        assert.equal(res.body[0].name, dietician3.name)

    });

    it('admin should be able to modify isPending value for dietician', async () => {

        const res = await chai.request(server)
            .get('/api/dieticians/' + dietician3.id)
            .set({'content-type': 'application/json', 'accesstoken': login2.accessToken})
            .send();

        assert.equal(res.status, 200);
        assert.isObject(res.body);
        assert.equal(res.body.isPending, true);

        const res2 = await chai.request(server)
            .put('/api/dieticians/' + dietician3.id)
            .set({'content-type': 'application/json', 'accesstoken': login2.accessToken})
            .send({isPending: false});

        console.log('res2', res2.body);

        assert.equal(res2.status, 200);
        assert.equal(res2.body.name, dietician3.name);
        assert.equal(res2.body.isPending, false);

        const res3 = await chai.request(server)
            .put('/api/dieticians/' + dietician3.id)
            .set({'content-type': 'application/json', 'accesstoken': login2.accessToken})
            .send({isPending: true});

        assert.equal(res3.status, 200);
        assert.equal(res3.body.name, dietician3.name);
        assert.equal(res3.body.isPending, true);

    });

});