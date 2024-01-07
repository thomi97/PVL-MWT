import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import {getApartments, addApartment, deleteApartment} from "../ApartmentService";


export const Home: React.FC = () => {

    const [list, setList] = useState<string[]>([]);
    const [apartment, setApartment] = useState('');


    useEffect(() => {
        getApartments().then(response => setList(response.data));
    }, []);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addApartment(apartment).then(() => {
            setList([...list, apartment]);
        });

    };

    const handleDelete = (apartmentId: any) => {
        deleteApartment(apartmentId).then(() => {
            setList(list.filter(apartment => apartment !== apartmentId));
        });
    };

    return (
        <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
            <h1 className='text-white font-bold text-2xl'>Apartments to rent</h1>
            <form style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: '20px'
            }} onSubmit={handleSubmit}>
                <TextField

                    onChange={(e) => setApartment(e.target.value)}
                    value={apartment}
                    style={{marginTop: '20px', color: 'white !important'}}
                    label="Apartment"
                    variant="outlined"
                    InputProps={{style: {color: 'white', borderColor: 'white'}}}
                />
                <Button style={{marginTop: '20px'}} type='submit' variant="outlined">Add</Button>
            </form>

            <List style={{marginTop: '40px'}}>
                {list.map((item, index) => (
                    <ListItem key={index}>
                        <ListItemText style={{}} primary={item.replace('=','')} className='text-white text-center'/>
                        <Button style={{marginLeft: '20px'}} onClick={() => handleDelete(item) } variant="outlined">Delete</Button>
                    </ListItem>
                ))}
            </List>
        </div>


    );
};