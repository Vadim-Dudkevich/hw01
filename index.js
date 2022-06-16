const { program } = require('commander');

const contacts = require('./contacts');

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const result = await contacts.listContacts();
      console.table(result);
      break;

    case 'get':
      const contact = await contacts.getContactById(id);
      console.log(contact);
      break;

    case 'add':
      const newContact = await contacts.addContact(name, email, phone);
      console.log(newContact);
      break;

    case 'update':
      const updateById = await contacts.updateContact(id, name, email, phone);
      console.log(updateById);
      break;

    case 'remove':
      const remove = await contacts.removeContact(id);
      console.log(remove);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
      break;
  }
};

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();
invokeAction(argv);

// const arr = hideBin(process.argv);
// const { argv } = yargs(arr);
// invokeAction(argv);

// invokeAction({ action: 'list' });
// invokeAction({ action: 'get', id: '5' });
// invokeAction({
//   action: 'add',
//   name: 'Vadim Dukevich',
//   email: 'duda@mail.com',
//   phone: '(382) 556 44 645',
// });
// invokeAction({
//   action: 'update',
//   id: 'd4a8f762-153c-4213-86e7-6a153e30ce88',
//   name: 'Mango ',
//   email: 'mango@gmail.com',
//   phone: '322-22-22',
// });
// invokeAction({ action: 'remove', id: '45196efa-fbe2-4c7a-a3e2-8c533014eb41' });

// console.log(process.argv);

// const actionIndex = process.argv.indexOf('--action');
// if (actionIndex !== -1) {
//   const action = process.argv[actionIndex + 1];
//   invokeAction({ action });
// }
