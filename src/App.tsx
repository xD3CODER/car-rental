import React, {useEffect, useState} from 'react';
import axios from 'axios';

const App = () => {
    const [cars, setCars] = useState([]);
    useEffect(() => {
        axios.get(
            'http://localhost:3001/cars.json',
        ).then((result) => {
            console.log(result);
            setCars(result.data);
        })

    }, []);
    return (
        <div>
            <div className={'head'}>
                <h1>Car rental</h1>
            </div>

            <div class={'grid'}>
                {cars.map(({id, picturePath, brand, model, pricePerDay, pricePerKm, availability, maxDuration, maxDistance}) => (
                    <div className={'vehicle'}>
                        <img alt={id} src={picturePath}/>
                        <div className={'about'}>
                            <h3>{`${brand} ${model}`}</h3>
                            <span>{`Price per day: ${pricePerDay / 100}$`}</span>
                            <span>{`Price per km: ${pricePerKm}¢`}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default App;
