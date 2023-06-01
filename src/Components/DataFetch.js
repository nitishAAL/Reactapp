import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableHead, TableRow } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import { Link } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel';
import Countries from "../Countries.json"
import TablePagination from '@mui/material/TablePagination';
import TableContainer from '@mui/material/TableContainer';
function DataFetch() {
  const [data, setData] = useState([]);
         
  const [country, setCountry] = useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChange = (event) => {
    console.log(event)
    setCountry(event.target.value);
  };

  useEffect(() => {
    console.log("use effect called num");
    axios
      .get("http://universities.hipolabs.com/search", {
        params: { country: country}
      })
      .then((res) => {
        console.log(res);
        setData(res.data);
      });
    }, [country]);

  const [order, setOrder] = useState("ASC");
  const sorting = (col) => {
    if (order === "ASC") {
      const sorted = [...data].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setData(sorted);
      console.log("DSC")
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...data].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setData(sorted);
      setOrder("ASC");
    }
  };


  const[searchTerm,setSearchTerm]= useState("");

  return (
    <div>
   
    <FormControl sx={{ m:0, minWidth:200,marginTop:10}} size="small">
    <InputLabel id="demo-select-small">country</InputLabel>
    <Select  
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={country}
    label="country"
    onChange={handleChange}
  >
  {Countries.map(el=>{
    return  <MenuItem value={el} key={el}>{el}</MenuItem>
  
  })}
       
    </Select> 
    </FormControl>
    <input
              type="text"
              placeholder="seaarch"
              className="form-control"
              inputProps={{ "aria-label": "search" }}
              style={{ marginLeft: 1000, padding:15}}
              onChange={event=>{setSearchTerm(event.target.value)}} />
    <TableContainer sx={{ maxHeight: 400 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell   onClick={() => sorting("country")} key="country"
              style={{ cursor:"pointer",
                background: "rgb(224 224 224)",
                fontWeight: 800,
                fontSize: "1.3rem",
                color: "#2737aa",
              }}
            > Country   
            </TableCell>

            <TableCell onClick={() => sorting("name")} key="name"
              style={{
                background: "rgb(224 224 224)",
                fontWeight: 800,
                fontSize: "1.3rem",
                color: "#2737aa",
                
              }}
              
            >Name 
            </TableCell>
            <TableCell onClick={() => sorting("state-province")} key="state"
              style={{
                background: "rgb(224 224 224)",
                fontWeight: 800,
                fontSize: "1.3rem",
                color: "#2737aa",
              }}
              
            > State-province
        
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
       
          {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((el,ind) => (
            <TableRow key={ind}>
              <TableCell key={el.country}>{el.country}</TableCell>
              <TableCell key={el.name}>
                <Link target="_blank" href={el.web_pages[0]}>
                  {el.name}
                </Link>
              </TableCell>
              <TableCell key={el["state-province"] ?? "N.A"}>{el["state-province"] ?? "N.A"}</TableCell>
            </TableRow>
          ))}
          
          </TableBody>
          </Table>
          </TableContainer>
          <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          fixedHader
        />
      {/* <h1>Number up: {num}</h1>
    <h1>Number Down: {num1}</h1>*/} 
    
      <div></div>
    </div>
  );
}

export default DataFetch;
