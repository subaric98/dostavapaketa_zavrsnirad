import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './DeliveryList.css';

const DeliveryList = () => {
    const [dostave, setDostave] = useState(null);
  
    useEffect(() => {
        const fetchData = async () => {
            try {
            axios.get('http://localhost:8080/dostava')
            .then(response => {
                setDostave(response.data)
            })
            .catch(error => {
                if (error.response) {
                console.log('Server Error:', error.response.data);
                } else if (error.request) {
                console.log('No response received from server.');
                } else {
                console.log('Error:', error.message);
                }
            });
            
            } catch {
            console.log("ERROR")
            }
       
        }  
        fetchData();

        return () => {
        setDostave(null)
        }
    }, []);
  
    if (!dostave) {
      return <div>Loading...</div>;
    }
  
    return (
      <div>
        <Link to="/create-delivery">KREIRAJ DOSTAVU</Link>

        <div className='delivery-list__titles'>
            <p>SIFRA</p>
            <p>BROJ PAKETA</p>
            <p>DATUM DOSTAVE</p>
            <p>DOSTAVLJAC</p>
            <p>STATUS</p>
            <p>VOZILO</p>
            <p>ADRESA</p>
        </div>

        {dostave && dostave.map(dostava => (
            <div className="delivery-list" key={dostava.sifra}>
                <p>{dostava.sifra}</p>
                <p>{dostava.broj_paketa}</p>
                <p>{dostava.datum_dostave}</p>
                <p>{dostava.dostavljac}</p>
                <p>{dostava.status_paketa}</p>
                <p>{dostava.vozilo}</p>
                <p>{dostava.adresa_dostave}</p>
                <Link to={`/delivery/${dostava.sifra}`}>UREDI</Link>
            </div>
        ))}
      </div>
    );
  }
  
  export default DeliveryList;