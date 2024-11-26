import { ContactsColection } from '../db/models/contact.js';

export const getAllContcats = () => ContactsColection.find();

export const getContactById = (contactId) =>
  ContactsColection.findById(contactId);

export const postContact = (contactData) =>
  ContactsColection.create(contactData);

export const deleteContact = (contactId) =>
  ContactsColection.findByIdAndDelete(contactId);

export const patchContact = (contactId, contactData) =>
  ContactsColection.findByIdAndUpdate(contactId, contactData, { new: true });
