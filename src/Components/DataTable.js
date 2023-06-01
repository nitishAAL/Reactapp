import React,{useState,useEffect} from "react";
import { Table, TableBody, TableHead, TableRow,TableCell,TableContainer,Paper,TablePagination
} from "@mui/material";
import axios from "axios"

function DataTable(){
    const [page, setPage] = useState (0)
    const [rowsPerPage, setRowPerPage]= useState(5)
    const [users, setUsers ] = useState ([]);     
    const loadUsers = async ()=>{
        const res = await axios.get("https://jsonplaceholder.typicode.com/users")
        setUsers(res.data);
    };
    useEffect(()=>{
        loadUsers()
    },[])
const onChangepage = (event, nextPage)=>{
    setPage(nextPage)

}
const onRowsPerPageChange=(event)=>{
    setRowPerPage (event.target.value)
}
    return(
        <div>
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell style={{color:"blue",fontSize:"large"}}>Name</TableCell>
                        <TableCell  style={{color:"blue",fontSize:"large"}}>E-mail</TableCell>
                        <TableCell  style={{color:"blue",fontSize:"large"}}>phone</TableCell>
                        <TableCell  style={{color:"blue",fontSize:"large"}}>company</TableCell>
                        <TableCell  style={{color:"blue",fontSize:"large"}}>website</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(users=> (
                            <TableRow>
                            <TableCell>{users.name}</TableCell>
                            <TableCell>{users.email}</TableCell>
                            <TableCell>{users.phone}</TableCell>
                            <TableCell>{users.company.name}</TableCell>
                            <TableCell>{users.website}</TableCell>
                            </TableRow>

                        ))
                    }
                </TableBody>
            </Table>
            <TablePagination 
        rowsPerPageOptions={[5,10,15,20]} 
        count = {users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onChangepage}
        onRowsPerPageChange={ onRowsPerPageChange}

        />
        </TableContainer>
        
       </div>
    )
}
export default DataTable;