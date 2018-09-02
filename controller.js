const mongoose = require('mongoose');
const assert = require('assert');
const info = require('console-info');
const warn = require('console-warn');
const Contact = require('./model');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/contactdb', { useNewUrlParser: true });
const db = mongoose.connection;


 const addContact = (contactInfo) => {
  Contact.findOne({phone: contactInfo.phone}, (err, userFound)=> {
    assert.equal(null, err);
    if (userFound) {
      warn('User already with entered phone number');
      return;
    }
    Contact.create(contactInfo, (err) => {
      assert.equal(null, err);
      info('Contact add successfully');
      db.close();
    })
  })
}
 const getContact = (name) => {
  const search = new RegExp(name, 'i');
  Contact.find({$or: [{firstname: search }, {lastname: search }]})
  .exec((err, contact) => {
    assert.equal(null, err)
    info(contact);
    info(`${contact.length} matches`);
    db.close();
  })
}
/**
 * @function  [getContactList]
 * @returns {Sting} status
 */
 const updateContact = (phone, contact) => {
  Contact.findOne({phone}, (err, userFound)=> {
    assert.equal(null, err);
    if(userFound) {
      Contact.update({ phone }, contact)
      .exec((err, status) => {
        assert.equal(null, err);
        info('Updated successfully');
        db.close();
      });
      return;
    }
    return warn('User records not found!');
  })
};

/**
 * @function  [deleteContact]
 * @returns {String} status
 */
 const deleteContact = (phone) => {
  Contact.findOne({phone}, (err, userFound)=> {
    assert.equal(null, err);
    if(userFound) {
      Contact.remove({ phone })
      .exec((err, status) => {
        assert.equal(null, err);
        info('Deleted successfully');
        db.close();
      })
      return;
    }
    return warn('User records not found!');
  })
 
}

/**
 * @function  [getContactList]
 * @returns [contactlist] contacts
 */
 const getContactList = (limit) => {
  Contact.find()
  .limit(parseInt(limit) || 10)
  .exec((err, payload) => {
    assert.equal(null, err);
    const contacts = payload.map(contact => ({ 
      firstname: contact.firstname, 
      lastname: contact.lastname, 
      phone: contact.phone, 
      email: contact.email }))
    info(contacts);
    info(`${contacts.length} matches`);
    db.close();
  })
}

module.exports = {
  addContact, 
  getContact, 
  updateContact, 
  deleteContact, 
  getContactList
}
