const {
  getContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
  updateStatus,
} = require("../service/contacts");

const getContactsCtrl = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;

  const data = await getContacts(_id, page, limit, favorite);
  res.status(200).json({ message: data });
};

const getContactByIDCtrl = async (req, res) => {
  const { contactId } = req.params;
  const data = await getContactById(contactId);
  if (data) {
    res.status(200).json({ message: data });
  } else {
    res.status(404).json({ message: "Not found" });
  }
};

const postAddContactCtrl = async (req, res) => {
  const { _id } = req.user;
  const data = await addContact({ ...req.body, owner: _id });
  res.status(201).json({ message: data });
};

const putChangeContactCtrl = async (req, res) => {
  const { contactId } = req.params;
  const data = await updateContact(contactId, req.body);
  if (data) {
    res.status(201).json({ message: data });
  } else {
    res.status(404).json({ message: "Not found" });
  }
};

const deleteContactCtrl = async (req, res) => {
  const { contactId } = req.params;
  const data = await removeContact(contactId);
  if (data) {
    res.status(200).json({ message: "contact deleted" });
  } else {
    res.status(404).json({ message: "Not found" });
  }
};

const patchFavoriteContactCtrl = async (req, res) => {
  const { contactId } = req.params;
  if (!contactId) {
    res.status(400).json({ message: "missing field favorite" });
  }
  const data = await updateStatus(contactId, req.body);
  if (data) {
    res.status(200).json({ message: data });
  } else {
    res.status(404).json({ message: "Not found" });
  }
};

module.exports = {
  postAddContactCtrl,
  putChangeContactCtrl,
  getContactsCtrl,
  getContactByIDCtrl,
  deleteContactCtrl,
  patchFavoriteContactCtrl,
};
