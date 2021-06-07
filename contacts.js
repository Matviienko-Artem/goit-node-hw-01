import fs from "fs/promises";
import { nanoid } from "nanoid";
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

  return contacts;
}

export async function getContactById(contactId) {
  const file = await fs.readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(file);
  const contact = contacts.find((user) => user.id === contactId);

  return [contact];
}

export async function removeContact(contactId) {
  const file = await fs.readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(file);

  const filter = contacts.filter((contact) => contact.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(filter));
}

export async function addContact(name, email, phone) {
  const newContact = { id: nanoid(5), name, email, phone };
  const file = await fs.readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(file);

  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));

  return [newContact];
}
