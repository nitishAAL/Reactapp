import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Line } from "react-chartjs-2";
import MenuItem from '@mui/material/MenuItem';
import axios from "axios";
import { Chart as chartjs,  Tooltip, LineElement, CategoryScale, LinearScale, PointElement, Filler } from "chart.js";
import { useEffect, useState } from "react";
import { Grid, InputLabel, Typography } from '@mui/material'; 
chartjs.register(
  Tooltip,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler
);
function Chart() {
  const [table, setTable] = useState("");
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: "blue",
        borderColor: "blue",
      },
    ],
  });
//event handler
  const handleChange = (event) => {
    setTable(event.target.value);
  };
      
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:8000/chart-data");
      const { x, y } = res.data;
      const selectedSensor = table;
      let modifiedData = [];
        //condition
      if (selectedSensor === "temperature") {
        modifiedData = y.map((item) => item.temperature);
      } else if (selectedSensor === "humidity") {
        modifiedData = y.map((item) => item.humidity);
      }

      setData({
        labels: x,
        datasets: [
          {
            data: modifiedData,
            backgroundColor: "blue",
            borderColor: "yellow",
          },
        ],
      });
    };
    
     //set time
    fetchData();

    const intervalId = setInterval(fetchData, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [table]);

  return (
  
      <Grid>
        <Typography style={{marginLeft:550, marginTop:30,fontSize:40,color:"blue"}}>IOT Aligend Automation</Typography>
        <FormControl
          sx={{ minWidth:200, marginTop:10, marginLeft:150, }}
          size="small"
        >
          <InputLabel id="small">select</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={table}
            label="Table"
            onChange={handleChange}
          >
            <MenuItem value="temperature">Temperature</MenuItem>
            <MenuItem value="humidity">Humidity</MenuItem>
          </Select>
        </FormControl>
        
        <div style={{ width: "900px", height: "900px", marginLeft:200, marginTop:0 }}>
          <Line data={data}></Line>
        </div>
      </Grid>
   
  );
}

export default Chart;