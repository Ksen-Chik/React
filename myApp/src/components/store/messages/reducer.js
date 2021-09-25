import { ADD_MESSAGE, DELETE_MESSAGE, CLEAR_CHAT } from "./actions";

const initialState = {
    messages: [],
};

export const messagesReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ADD_MESSAGE: {
            return {
                ...state,
                messages: [
                    ...state.messages,
                    {
                        author: payload.message.author,
                        text: payload.message.text,
                        chatId: payload.chatId,
                        id: `message-${Date.now()}`,
                    }
                ],
            };
        }
        case DELETE_MESSAGE: {
            const newChatMessages = state.messages.filter(
                ({ id }) => id !== payload.id
            );

            return {
                ...state,
                messages: {
                    ...state.messages,
                    newChatMessages,
                },
            };
        }
        case CLEAR_CHAT: {
            return {
                ...state,
                messages: state.messages.filter(m => m.chatId !== payload.chatId),
            };
        }

        default:
            return state;
    }
};
