import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';
import CreateNewList from '../CreateNewList/CreateNewList';
import { fetchAllList } from '../../utils/axios'
import TableList from '../TableList/TableList';

export interface Product {
    id:number;
    name:string;
    quantity:number;
    status:boolean;
}

export interface List {
    _id:string
    name: string;
    products: Product[];
    created_at: Date;
}
  
const Home = () => {    
    const [isExistingList, setIsExistingList] = useState(false);
    const [isCreatingList, setIsCreatingList] = useState(false);
    const [list, setList] = useState<List[] | []>();

    const openExistingList = async () => {
        setIsExistingList(true);
        setIsCreatingList(false);
        const data:List[] = await fetchAllList();
        setList(data);
    }
    const createNewList = () => {
        setIsCreatingList(true);
        setIsExistingList(false);
    }
    const buttons = [
        <Button key="1" onClick={openExistingList}>Open Existing Lists</Button>,
        <Button key="2" onClick={createNewList}>Create a New List</Button>,
      ];

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin:'auto', flexDirection: 'column' }} >
               <Box
                    sx={{
                        display: 'flex',
                        '& > *': {
                        m: 1,
                        },
                    }}
                    >
                    <ButtonGroup
                        orientation="vertical"
                        aria-label="vertical contained button group"
                        variant="contained"
                    >
                        {buttons}
                    </ButtonGroup>
                    </Box>
                    {(!isExistingList && !isCreatingList)&& 
                        <Box>
                            <Typography variant="h2" component="h2" >
                                🚀 Click Above to get started...!
                            </Typography>
                        </Box>
                     }

                    {(isExistingList)&& 
                        <Box>
                            <TableList list={list} setList={setList}/>
                        </Box>
                     }

                    {(isCreatingList)&& 
                        <Box>
                            <CreateNewList/>
                        </Box>
                     }
            </Container>
        </React.Fragment>
    );
}

export default Home;
