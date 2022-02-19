import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import  Checkbox from '@mui/material/Checkbox';
import { List, Product } from '../Home/Home';
import formatDate from '../../utils/formatDate';
import Box from '@mui/material/Box';
import { TextField, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add'
import { updateList } from '../../utils/axios';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export type TableListProps = {
  list?:List[]
  setList: (l:List[]) => void;
};

const TableList: React.FC<TableListProps> = ({ list, setList }) => {
  const [productName, setProductName] = React.useState('');
  const [quantity, setQuantity] = React.useState(0);
  const [currentList, setCurrentList ] = React.useState('');

  const handleInputField = (value:string, type:string, listId:string ) => {
    switch (type) {
      case 'name':
        setProductName(value);
        setCurrentList(listId);
        break;
      case 'quantity':
        setQuantity(parseInt(value));
        setCurrentList(listId);
        break;
      default:
        break;
    }

  }
const handleAddProduct = async () => {
  if(quantity ==0) {
    return;
  }
  let updatedProducts:Product[] = [];
  const localList = list || [];
  localList?.forEach(a => {
     if(a._id == currentList){
         updatedProducts = a.products
         updatedProducts.push({id:a.products.length+1, name:productName,quantity:quantity, status:false });
     }
   })
  await updateList({products:updatedProducts}, currentList);
   setList(localList);
   setProductName('');
   setCurrentList('');
   setQuantity(0);
}

const updateStatusOfProduct = async (listId:string, productId:number, status:boolean) => {
  let updatedProducts:Product[] = [];
   const localList = list || [];
    localList?.forEach(a => {
      if(a._id == listId){
          a.products.map((p:Product) => {
              if(p.id == productId){
                p.status = !status;
              }
          });
        updatedProducts = a.products;
      }
    });
    setList(localList);
    await updateList({products:updatedProducts}, listId);
}

  return (
        <React.Fragment>
          {list && list.map(a => 
              <Accordion key={a._id} sx={{width:['75vw',null, null, '50vw']}}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Box sx={{width:[250,400,null, 600] , display:'flex', justifyContent:'space-between'}}>
                    <Typography >{a.name}</Typography>
                    <Typography >{formatDate(new Date(a.created_at))}</Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                <TableContainer>
                    <Table aria-label="customized table">
                        <TableHead>
                        <TableRow>
                            <StyledTableCell align="left">Name</StyledTableCell>
                            <StyledTableCell align="left">Quantity</StyledTableCell>
                            <StyledTableCell align="left">Done</StyledTableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {a.products.map(row => (
                            <StyledTableRow key={row.id}>
                              <StyledTableCell align="left" component="th" scope="row" >
                                  {row.name}
                              </StyledTableCell>
                              <StyledTableCell align="left">
                                {row.quantity}
                              </StyledTableCell>
                              <StyledTableCell align="left" >
                                <Checkbox size="small" checked={row.status} value={row.status} onChange={() => updateStatusOfProduct(a._id,row.id, row.status)} />
                              </StyledTableCell>
                            </StyledTableRow>
                        ))}
                          <StyledTableRow >
                            <StyledTableCell align="left" component="th" scope="row" >
                              <TextField id="input-list-name" label="name" size='small' variant="outlined" value={productName} onChange={(e) => handleInputField(e.target.value,'name', a._id)} />
                            </StyledTableCell>
                            <StyledTableCell align="left">
                              <TextField id="input-list-name" label="quantity" size='small' variant="outlined" type="number" value={quantity}  onChange={(e) => handleInputField(e.target.value,'quantity', a._id)}/>
                            </StyledTableCell>
                            <StyledTableCell align="left">
                            <IconButton aria-label="add" size="small" onClick={handleAddProduct}>
                              <AddIcon  />
                            </IconButton> 
                            </StyledTableCell>
                          </StyledTableRow>
                        </TableBody>
                    </Table>
                    </TableContainer>
                </AccordionDetails>
            </Accordion>
          )}
        </React.Fragment>
    );
}

export default TableList;
