import { ContactsColection } from "../db/models/contact.js";
import { SORT_ORDER } from "../constants/constants.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";

export const getAllContcats = async ({
  userId,
  page = 1,
  perPage = 10,
  sortBy = "name",
  sortOrder = SORT_ORDER.ASC,
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;
  const contactsQuery = ContactsColection.find({ userId });

  if (filter.contactType) {
    contactsQuery.where("contactType").equals(filter.contactType);
  }

  if (filter.isFavourite) {
    contactsQuery.where("isFavourite").equals(filter.isFavourite);
  }

  const [contactsCount, contacts] = await Promise.all([
    ContactsColection.find().merge(contactsQuery).countDocuments(),
    contactsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);
  const paginationData = calculatePaginationData(contactsCount, perPage, page);
  return { data: contacts, ...paginationData };
};

export const getContactById = (contactId, userId) =>
  ContactsColection.findOne({ _id: contactId, userId });

export const postContact = (contactData) =>
  ContactsColection.create(contactData);

export const patchContact = (contactId, userId, contactData) =>
  ContactsColection.findOneAndUpdate({ _id: contactId, userId }, contactData, {
    new: true,
  });

export const deleteContact = (contactId, userId) =>
  ContactsColection.findOneAndDelete({ _id: contactId, userId });
