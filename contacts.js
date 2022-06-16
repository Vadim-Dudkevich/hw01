const fs = require('fs/promises');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.join(__dirname, 'db/contacts.json');
const update = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

// Получаем и выводим весь список контактов
const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath, 'utf-8');
  return JSON.parse(contacts);
};

// Получаем контакт по id
const getContactById = async (id) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === id);
  if (!result) {
    return null;
  }
  return result;
};

// Добавялем контакт
const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = {
    name,
    email,
    phone,
    id: uuidv4(),
  };
  contacts.push(newContact);
  update(contacts);
  return newContact;
};

// Обновляем контакт
const updateContact = async (id, name, email, phone) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === id);
  if (idx === -1) {
    return null;
  }
  contacts[idx] = { id, name, email, phone };
  update(contacts);
  return contacts[idx];
};

// Удаляем контакт
const removeContact = async (id) => {
  const contacts = await listContacts();
  const removeIdx = contacts.findIndex((item) => item.id === id);
  if (removeIdx === -1) {
    return null;
  }

  const [removeBiIdContact] = contacts.splice(removeIdx, 1);
  update(contacts);
  return removeBiIdContact;
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
};
