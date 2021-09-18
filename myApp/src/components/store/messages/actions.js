export const ADD_MESSAGE = 'MESSAGES::ADD_MESSAGE';
export const DELETE_MESSAGE = "MESSAGES::DELETE_MESSAGE";

export const addMessage = (chatId, message) => ({
  type: ADD_MESSAGE,
  payload: {
    chatId,
    message,
  },
});

export const deleteMessage = (chatId, id) => ({
    type: DELETE_MESSAGE,
    payload: {
      chatId,
      id,
    },
  });