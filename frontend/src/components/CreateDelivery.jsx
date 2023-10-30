import { Link, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import axios from "axios";

import './DeliveryEdit.css';

const CreateDelivery = () => {
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm();

    const createDelivery = (data) =>  {
        const { broj_paketa, datum_dostave, dostavljac, status_paketa, vozilo, adresa_dostave } = data;
        axios.post('http://localhost:8080/dostava', {
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

    return (
        <>
            <Link to="/">VRATI ME NAZAD</Link>
            <form className="edit-delivery-form" onSubmit={handleSubmit(createDelivery)}>
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
    )
}

export default CreateDelivery;