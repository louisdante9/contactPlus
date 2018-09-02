import mongoose from 'mongoose';
import assert from 'assert';
import info from 'console-info';
import warn from 'console-warn';
import Contact from './model';

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/contactdb', { useNewUrlParser: true });
const db = mongoose.connection;


export const addContact = (contactInfo) => {
  Contact.findOne({phone: contactInfo.phone}, (err, userFound)=> {
    assert.equal(null, err);
    if (userFound) {
      warn('user found');
      return;
    }
    Contact.create(contactInfo, (err) => {
      assert.equal(null, err);
      info('Contact add successfully');
      db.close();
    })
  })
}
export const getContact = (name) => {
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
export const updateContact = (phone, contact) => {
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
export const deleteContact = (phone) => {
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
export const getContactList = (limit) => {
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
