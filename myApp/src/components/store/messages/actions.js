export const ADD_MESSAGE = 'MESSAGES::ADD_MESSAGE';
export const DELETE_MESSAGE = "MESSAGES::DELETE_MESSAGE";
export const CLEAR_CHAT = "MESSAGES::CLEAR_CHAT";

export const addMessage = (chatId, message) => ({
  type: ADD_MESSAGE,
  payload: {
    chatId,
    message,
  },
});

export const clearChat = (chatId) => ({
  type: CLEAR_CHAT,
  payload: {
    chatId
  },
});

export const deleteMessage = (chatId, id) => ({
  type: DELETE_MESSAGE,
  payload: {
    chatId,
    id,
  },
});