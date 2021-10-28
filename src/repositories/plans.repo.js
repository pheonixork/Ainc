const {Plans} = require('models');

const PlansRepo = {
  getPlans,
};

async function getPlans() {
  let list = await Plans.find();

  return list;
}

export default PlansRepo;