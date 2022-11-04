const { Contact } = require("../models/contactsModel");

const getContacts = async (res) => {
  try {
    const data = await Contact.find({});
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contact = await Contact.findById(contactId);
    return contact;
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (body) => {
  try {
    const data = await Contact.create(body);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    await Contact.findByIdAndUpdate(contactId, body);
    const data = await Contact.findById(contactId);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await Contact.findByIdAndRemove(contactId);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

const updateStatus = async (contactId, body) => {
  try {
    await Contact.findByIdAndUpdate(contactId, body);
    const data = await Contact.findById(contactId);
    return data;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
  updateStatus,
};
