import axios from 'axios';

const API_URL = 'http://localhost:8090/apartments';


const getApartments = () => axios.get(`${API_URL}/list`);

const getApartmentById = (id: any) => axios.get(`${API_URL}/${id}`);
const addApartment= (apartment: string) => axios.post(`${API_URL}/addApartment`, apartment);
const deleteApartment = (id: any) => axios.delete(`${API_URL}/delete/${id}`);

export { getApartments, addApartment, deleteApartment };