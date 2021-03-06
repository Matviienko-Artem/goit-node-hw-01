import { Command } from "commander/esm.mjs";
import {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} from "./contacts.js";

const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const list = await listContacts();
      console.log("Выводим список контактов:");
      console.table(list);
      break;

    case "get":
      const get = await getContactById(id);
      console.log("Нашли контакт:");
      console.table(get);
      break;

    case "add":
      const add = await addContact(name, email, phone);
      console.log("Дoбавили новый контакт:");
      console.table(add);
      break;

    case "remove":
      await removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
