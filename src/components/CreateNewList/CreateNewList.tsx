import React, {useState}  from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add'
import Fab from '@mui/material/Fab';
import {createList} from '../../utils/axios';

const CreateNewList = () => {
    const [newListName, setNewListName] = useState('');
    const [isDisable, setIsDisable] =useState(false);

    const handleCreateNewList = async () => {
        if(newListName){
            setIsDisable(true);
            await createList({ name:newListName });  
            setNewListName('');
        }
    }   
    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin:'auto' }} >
                 <TextField id="input-list-name" label="New List Name" size='small' variant="outlined" value={newListName} onChange={(e:any)=>setNewListName(e.target.value)}/>
                 <Fab color="primary" size='small' onClick={handleCreateNewList} disabled={isDisable}>
                    <AddIcon/>     
                </Fab>
            </Container>
        </React.Fragment>
    );
}

export default CreateNewList;
