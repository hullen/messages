import express from 'express';

const routes = express();

export const dataMock = [
  { id: 1, datetime: 1613541483, subject: 'First subject', detail: 'My first message', read: true },
  { id: 2, datetime: 1613624163, subject: 'Second subject', detail: 'My second message', read: false },
  { id: 3, datetime: 1613706057, subject: 'Third subject', detail: 'My third message', read: false },
];

// lista todos
routes.get('/', (_, res) => {
  const reversedData = [...dataMock];
  res.status(200).send(reversedData.reverse());
});

// lista detalhes de uma mensagem
routes.get('/:idMessage', (req, res) => {
  const findByMessageId = +req.params.idMessage;
  const detailMessageMock = dataMock.find(value => value.id === findByMessageId);
  if (detailMessageMock && detailMessageMock.id) {
    res.status(200).send(detailMessageMock);
  } else {
    res.sendStatus(404);
  }
});

// adiciona uma mensagem
routes.post('/', (req, res) => {
  const { subject, detail } = req.body;

  if (!subject || subject === '') {
    res.sendStatus(400);
    return;
  }
  const lastDataPos = dataMock.length - 1;
  const nextId = dataMock[lastDataPos].id + 1;
  dataMock.push({ id: nextId, datetime: Math.floor(Date.now() / 1000), subject, detail, read: false });
  res.status(200).send(dataMock);
});

routes.delete('/:idMessage', (req, res) => {
  const messageId = +req.params.idMessage;
  const indexDeletedMessage = dataMock.findIndex(value => value.id === messageId);
  if (indexDeletedMessage > -1) {
    dataMock.splice(indexDeletedMessage, 1);
    res.status(200).send(dataMock);
  } else {
    res.sendStatus(404);
  }
});

routes.put('/:idMessage/read', (req, res) => {
  const messageId = +req.params.idMessage;
  const indexMessage = dataMock.findIndex(value => value.id === messageId);
  if (indexMessage > -1) {
    dataMock[indexMessage] = { ...dataMock[indexMessage], read: true };
    res.status(200).send(dataMock[indexMessage]);
  } else {
    res.sendStatus(404);
  }
});

routes.put('/:idMessage/unread', (req, res) => {
  const messageId = +req.params.idMessage;
  const indexMessage = dataMock.findIndex(value => value.id === messageId);
  if (indexMessage > -1) {
    dataMock[indexMessage] = { ...dataMock[indexMessage], read: false };
    res.status(200).send(dataMock[indexMessage]);
  } else {
    res.sendStatus(404);
  }
});

export default routes;
