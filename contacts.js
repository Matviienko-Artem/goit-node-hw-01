import fs from "fs/promises";
//=========================================
import { fileURLToPath } from "url";
import { dirname, join } from "path";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);
//=========================================

const contactsPath = join(__dirname, "/db", "contacts.json");

export async function listContacts() {
  const file = await fs.readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(file);
  console.table(contacts);
}

export async function getContactById(contactId) {
  console.log(Number(contactId));
  const file = await fs.readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(file);

  const contact = contacts.find((user) => {
    console.log(user.id);
    user.id === Number(contactId);
    console.log(contactId);
  });
  console.log(contact);

  console.table([contact]);
}

// async function removeContact(contactId) {
//   const file = await fs.readFile(contactsPath, "utf-8");
// const content = JSON.parse(file);
// await fs.unlink(contactsPath, callback);
// }

export async function addContact(name, email, phone) {
  const newContact = { name, email, phone };
  const file = await fs.readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(file);
  console.log("Дoбавили новый контакт:", newContact);
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
}
