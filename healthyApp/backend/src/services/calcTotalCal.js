function calcTotalCal(weight, age, height){
    return totalCal = Math.round((13.75*weight) + (5*height) - (6.76*age) + 66.5)
}

module.exports = {calcTotalCal}