import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';


export const Home: React.FC = () => {
    const [input, setInput] = useState('');
    const [list, setList] = useState<string[]>([]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setList([...list, input]);
        setInput('');
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>

            <form style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }} onSubmit={handleSubmit}>
                <TextField
                    onChange={(e) => setInput(e.target.value)}
                    value={input}
                    style={{ marginTop: '20px', color: 'white' }}
                    label="Wohnung"
                    variant="outlined"
                    InputProps={{ style: { color: 'white', borderColor: 'white' } }}
                />
                <Button style={{ marginTop: '20px'}} type='submit' variant="outlined">Hinzufügen</Button>
            </form>

            <List style={{ marginTop: '40px' }}>
                        {list.map((item, index) => (
                            <ListItem key={index}>
                                <ListItemText primary={item} className='text-white' />
                            </ListItem>
                        ))}
                    </List>
        </div>




    );
};