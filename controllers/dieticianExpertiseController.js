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
                resolve(404);
            } catch (e) {
                reject(e);
            }
        });
    },

    addArr: ({dieticianId, expertisesArr}) => {
        return new Promise(async (resolve, reject) => {
            try {
                const dietician = await Dietician.findByPk(dieticianId);
                if (dietician) {
                    expertisesArr.forEach(ex => {
                        const expertise = await Expertise.findByPk(ex);
                        if (expertise) {
                            dietician.addExpertise(expertise);
                        }
                    });
                }

            } catch (e) {
                reject(e);
            }
        });
    }
}