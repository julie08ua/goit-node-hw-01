const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, 'db','contacts.json');

const listContacts = async () => {
    try {
        const contacts = await fs.readFile(contactsPath);
        return JSON.parse(contacts);
    } catch (error) {
        console.log(error.message);
    }
};

const getContactById = async (contactId) => {
    try {
        const contacts = await listContacts();
        const findContact = contacts.find(contact => contact.id === contactId);
        
        if (!findContact) {
            return null;
        }

        return findContact;
    } catch (error) {
        console.log(error.message);
    }
};

const removeContact = async (contactId) => {
    try {
        const contacts = await listContacts();
        const findIndex = contacts.findIndex(contact => contact.id === contactId);
        
        if (findIndex=== -1) {
            return null;
        }

        const deletedContact = contacts.splice(findIndex, 1)[0];
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
        return deletedContact;
    } catch (error) {
        console.log(error.message);
    }
};

const addContact = async(name, email, phone) => {
    try {
        const contacts = await listContacts();
        const newContact = {
            id: nanoid(),
            name,
            email,
            phone,
        };
        contacts.push(newContact);
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

        return newContact;
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
};