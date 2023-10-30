import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import axios from "axios";

import './DeliveryEdit.css';

const DeliveryEdit = () => {
    const navigate = useNavigate();
    const { deliveryId } = useParams();
    const [ delivery, setDelivery ] = useState(null);
    const { register, handleSubmit, setValue } = useForm();

    useEffect(() => {
        const fetchData = async () => {
            try {
                axios.get(`http://localhost:8080/dostava/${deliveryId}`)
                .then(response => {
                    setDelivery(response.data)
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
    }, [deliveryId]);

    useEffect(() => {
        if (delivery?.length > 0) {
            setValue('broj_paketa', delivery[0].broj_paketa)
            setValue('datum_dostave', delivery[0].datum_dostave)
            setValue('dostavljac', delivery[0].dostavljac)
            setValue('status_paketa', delivery[0].status_paketa)
            setValue('vozilo', delivery[0].vozilo)
            setValue('adresa_dostave', delivery[0].adresa_dostave)
        }
    }, [delivery, deliveryId])
    
    const updateDelivery = (data) =>  {
        const { broj_paketa, datum_dostave, dostavljac, status_paketa, vozilo, adresa_dostave } = data;
        axios.put(`http://localhost:8080/dostava/${deliveryId}`, {
            broj_paketa,
            datum_dostave,
            dostavljac,
            status_paketa,
            vozilo,
            adresa_dostave
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          })
          .finally(navigate('/'))
    }

    const deleteDelivery = () => {
        axios.delete(`http://localhost:8080/dostava/${deliveryId}`)
        .then(response => {
            console.log('Resource deleted successfully:', response.data);
        })
        .catch(error => {
            console.error('Error deleting resource:', error);
        })
        .finally(navigate('/'))
    }

    return (
        <>
            <Link to="/">VRATI ME NAZAD</Link>
            {delivery?.length > 0 && (
                <div className="delivery-short-info" key={delivery[0].sifra}>
                    <p>ŠIFRA PAKETA: {delivery[0].sifra}</p>
                    <p className="delete-delivery" onClick={deleteDelivery}>OBRISI DOSTAVU</p>
                </div>
            )}

            <form className="edit-delivery-form" onSubmit={handleSubmit(updateDelivery)}>
                <label>broj_paketa</label>
                    <input type="number" {...register('broj_paketa', {valueAsNumber: true})} />
                <label>datum_dostave:</label>
                    <input type="date" {...register('datum_dostave')} />
                <label>dostavljac:</label>
                    <input type="number" {...register('dostavljac', {valueAsNumber: true})} />
                <label>status_paketa:</label>
                    <input type="number" {...register('status_paketa', {valueAsNumber: true})} />
                <label>vozilo:</label>
                    <input type="number" {...register('vozilo', {valueAsNumber: true})} />
                <label>adresa_dostave:</label>
                    <input type="text" {...register('adresa_dostave')} />
                <button type="submit">Spremi</button>
            </form>
       </>
    );
}

export default DeliveryEdit;