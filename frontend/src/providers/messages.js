import api from './api';

export function fetchAllMessages() {
  return api.get('/messages');
}

export function getMessage(id) {
  return api.get(`/messages/${id}`);
}

export function setMessageRead(id) {
  return api.put(`/messages/${id}/read`);
}

export function setMessageUnread(id) {
  return api.put(`/messages/${id}/unread`);
}

export function addMessage(data) {
  return api.post('/messages', data);
}
