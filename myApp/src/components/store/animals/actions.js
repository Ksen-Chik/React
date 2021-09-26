export const API_URL_Animals = [
    "https://aws.random.cat/meow",
    "https://random.dog/woof.json",
    "https://randomfox.ca/floof/",
];

export const STATE_OK = "ok";
export const STATE_ERROR = "error";
export const STATE_LOADING = "loading";

export const SET = "ANIMAL::SET";
export const ADD = "ANIMAL::ADD";

export const setAnimal = (index, animal) => ({
    type: SET,
    payload: {
        index,
        animal,
    },
});

export const addAnimals = (count) => ({
    type: ADD,
    payload: {
        count
    }
});

export const getAnimalAsync = (index) => async (dispatch, getState) => {

    let animal = {};
    animal.state = STATE_LOADING;

    dispatch(setAnimal(index, animal));

    // Тут рандом на большее число чем элементов в массиве для симуляции ошибок API.
    // Если выпадет большее число, то запрос уйдет на несуществующий url
    const apiUrl = API_URL_Animals[Math.floor(Math.random() * ((API_URL_Animals).length) + 2)];

    animal = {}
    try {
        // Вопрос: Тут происходит какой-то баг, в функцию заходит лишь один раз, но из await возвращается два раза. Как такое может быть?
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`${response.status}`);
        }

        const result = await response.json();
        animal.url = result.file ?? result.url ?? result.image;
        animal.state = STATE_OK;
    }
    catch (error) {
        animal.state = STATE_ERROR;
        animal.error = error.message;
        animal.url = null;
    }

    dispatch(setAnimal(index, animal));
};