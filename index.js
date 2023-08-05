const {
    listContacts,
    getContactById,
    removeContact,
    addContact
} = require('./contacts.js');
const argv = require("yargs").argv;

const invokeAction = async ({ action, id, name, email, phone }) => {
    switch (action) {
        case 'list':
            const contacts = await listContacts();
            console.table(contacts);
            break;

        case 'get':
            const getContact = await getContactById(id);
            console.log(getContact);
            break;

        case 'add':
            const newContact = await addContact(name, email, phone);
            console.log(newContact);
            break;

        case 'remove':
            const deletedContact = await removeContact(id);
            console.log(deletedContact);
            break;

        default:
            console.warn('\x1B[31m Unknown action type!');
    }
};

invokeAction(argv);