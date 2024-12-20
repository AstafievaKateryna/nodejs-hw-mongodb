import createHttpError from 'http-errors';
import {
  deleteContact,
  getAllContcats,
  getContactById,
  patchContact,
  postContact,
} from '../services/contacts.js';

export const getContactsController = async (_req, res) => {
  const contacts = await getAllContcats();

  res.send({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;

  const contact = await getContactById(contactId);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.send({
    status: 200,
    message: `Successfully found contact with id: ${contactId}`,
    data: contact,
  });
};

export const createContactController = async (req, res) => {
  const contact = await postContact(req.body);

  res.status(201).send({
    status: 201,
    message: `Successfully created a contact!`,
    data: contact,
  });
};

export const deleteContactController = async (req, res) => {
  const { contactId } = req.params;

  const contact = await deleteContact(contactId);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.sendStatus(204);
};

export const updateContactController = async (req, res) => {
  const { contactId } = req.params;

  const contact = await patchContact(contactId, req.body);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.send({
    status: 200,
    message: 'Successfully patched a contact!',
    data: contact,
  });
};
