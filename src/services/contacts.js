import { ContactsCollection } from "../db/models/contact.js";

export const getAllContcats = () => ContactsCollection.find();

export const getContactById = (contactId) =>
  ContactsCollection.findById(contactId);

export const postContact = (contactData) =>
  ContactsCollection.create(contactData);

export const deleteContact = (contactId) =>
  ContactsCollection.findByIdAndDelete(contactId);

export const patchContact = (contactId, contactData) =>
  ContactsCollection.findByIdAndUpdate(contactId, contactData, { new: true });
