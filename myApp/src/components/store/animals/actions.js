export const API_URL_Animals = [
    "https://aws.random.cat/meow",
    "https://random.dog/woof.json",
    "https://randomfox.ca/floof/",    
];

export const STATE_OK = "ok";
export const STATE_ERROR = "error";

export const SET = "ANIMAL::SET";

export const setAnimal = (index, animal) => ({
    type: SET,
    payload: {
        index,
        animal,
    },
});


export const getAnimalAsync = (index) => async (dispatch, getState) => {

    const apiUrl = API_URL_Animals[Math.floor(Math.random() * 4)];
    
    const response = await fetch(apiUrl);

    // Тут происходит какой-то баг, в функцию заходит лишь один раз, но из await возвращается два раза
    const result = await response.json();

    const animal = {};
    animal.url = result.file ?? result.url ?? result.image;
    animal.state = STATE_OK;

    dispatch(setAnimal(index, animal));
};