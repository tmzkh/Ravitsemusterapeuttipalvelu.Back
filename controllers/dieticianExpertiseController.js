const Dietician = require('../models/dietician');
const Expertise = require('../models/expertise');
const DieticianExpertise = require('../models/dieticianexpertise');

module.exports = {
    clearAll: (dieticianId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const result = 
                    await DieticianExpertise.destroy({
                        where: { dieticianId: dieticianId }
                    });
                if (result > 0){
                    return resolve(200);
                }
                return resolve(404);
            } catch (e) {
                console.log('dieticianExpertiseController clearAll catch', e);
                return reject(e);
            }
        });
    },

    addArr: ({dieticianId, expertisesArr}) => {
        return new Promise(async (resolve, reject) => {
            try {
                const dietician = await Dietician.findByPk(dieticianId);
                if (dietician) {
                    for (let i = 0; i < expertisesArr.length; i++) {
                        const expertise = await Expertise.findByPk(expertisesArr[i]);
                        if (expertise) {
                            await dietician.addExpertise(expertise);
                        }
                    }
                }
                return resolve(200);
            } catch (e) {
                console.log('dieticianExpertiseController add arr catch', e);
                return reject(e);
            }
        });
    }
}