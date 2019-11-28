import axios from 'axios'

const URL = 'http://localhost:3001/persons';

async function fetchPersons() {
    const response = await axios.get(URL);
    return response.data;
}

const storePerson = async (person) => {
    return await axios.post(URL, person);
};

const deletePerson = async (id) => {
    return await axios.delete(`${URL}/${id}`);
};

const updatePerson = async (person) => {
    return await axios.put(`${URL}/${person.id}`, person);
};

export default {
    fetchPersons,
    storePerson,
    deletePerson,
    updatePerson,
}