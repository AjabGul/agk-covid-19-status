import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import numeral from "numeral";
// import { prettyPrintStat} from 'util';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
      height: theme.spacing(16),
    },
  },
}));

export default function GlobalData() {
  const classes = useStyles();

  const [globalData, setGlobalData] = useState()

  useEffect(() => {
      try {
          const FetchGlobalData = async ()=> {
            const response = await fetch('https://disease.sh/v3/covid-19/all');
            const data = await response.json();
            console.log(data)
            setGlobalData(data);
          }
          FetchGlobalData();
      } catch (error) {
          console.log('error', error)
      }
      
  }, [])

  return (
    <div className={classes.root}>
      <Paper variant="outlined" >
          <div style={{color:'blue', fontWeight: 'bold'}}>
            <h2>{numeral(globalData && globalData.cases).format('0,0')}</h2>
            Global Data
          </div>
      </Paper>
      <Paper variant="outlined" >
          <div style={{color:'orange', fontWeight: 'bold'}}>
            <h2>{numeral(globalData && globalData.active).format('0,0')}</h2>
            Active Cases
          </div>
      </Paper>
      <Paper variant="outlined" >
          <div style={{color: 'green', fontWeight: 'bold'}}>
            <h2>{numeral(globalData && globalData.recovered).format('0,0')}</h2> 
            Recovered
          </div>
      </Paper>
      <Paper variant="outlined" >
          <div style={{color: 'red', fontWeight: 'bold'}}>
            <h2>{numeral(globalData && globalData.deaths).format('0,0')}</h2>
            Deaths
          </div>
      </Paper>
    </div>
  );
}
