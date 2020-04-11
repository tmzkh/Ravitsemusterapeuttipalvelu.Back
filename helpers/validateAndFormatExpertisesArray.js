module.exports = (expertisesArr) => {
    try {
        let expertises = [];
        for (let index = 0; index < expertisesArr.length; index++) {
            const expertise = expertisesArr[index];
            if (Number.isInteger(expertise)) {
                expertises.push(expertise);
            } else {
                return { error: "Invalid expertises array" };
            }
        }
        return { expertises };
    } catch {
        return { error: "Invalid expertises array" };
    }
}