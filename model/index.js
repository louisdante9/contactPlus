const mongoose = require('mongoose');

const toLower = (v) => {
  return v.toLowerCase();
}
const contactSchema = mongoose.Schema({
  firstname: { type: String, set: toLower },
  lastname: { type: String, set: toLower },
  phone: { type: String, set: toLower },
  email: { type: String, set: toLower }
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports =  Contact ;
