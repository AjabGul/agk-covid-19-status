import React,{useEffect, useState} from 'react';
import {
    makeStyles,
    AppBar,
    Toolbar,
    Typography,
    MenuItem,
    FormControl,
    Select,
} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Header() {
  const classes = useStyles();

  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('worldwide');

  useEffect(()=>{
    const getCountriesData = async ()=> {

      const apiResponse = await fetch('https://disease.sh/v3/covid-19/countries');
      const data = await apiResponse.json();

      console.log(data)

      const countries = data.map((country)=> ({
    
        name: country.country,
        value: country.countryInfo.iso2
          
      }));  

      setCountries(countries);
      setCountry(country)
    };

    getCountriesData();

  }, []);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            AGK-COVID-19-Tracker
          </Typography>
          <FormControl >
              <Select
                className={"dropDown"}
                style={{color:"white"}}
                varient="outline"
                value= {country}
              >
                <MenuItem value="worldwide"> worldwide </MenuItem>
                {
                  countries.map((country)=>(
                    <MenuItem value={country.value}> {country.name} </MenuItem>
                  ))
                }
              </Select>
            </FormControl>
        </Toolbar>
      </AppBar>
    </div>
  );
}