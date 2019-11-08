import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Slider, Row, Col } from "antd";

const App = () => {
    const [cars, setCars] = useState([]);
    const [isInit, setInit] = useState(true);
    const [distance, setDistance] = useState<number>(50);
    const [duration, setDuration] = useState<number>(1);

    /*
    * Load all cars on start
    */
    useEffect(() => {
        axios.get("http://localhost:3001/cars.json").then(result => {
            setCars(result.data);
        });
    }, []);

    /*
    * Get cars matching distance constraint
    */
    const getMatchingDistance = distance => {
        if (isInit) setInit(false);
        setDistance(distance);
        axios
            .get(
                "http://localhost:3001/cars.json?distance=" +
                distance +
                "&duration=" +
                duration
            )
            .then(result => {
                setCars(result.data);
            });
    };

    /*
    * Get cars matching duration constraint
    */
    const getMatchingDuration = (duration: number):void => {
        if (isInit) setInit(false);
        setDuration(duration);
        axios
            .get(
                "http://localhost:3001/cars.json?distance=" +
                distance +
                "&duration=" +
                duration
            )
            .then(result => {
                setCars(result.data);
            });
    };

    /*
    * Calculate total price of rent
    */
    const calculatePrice = (pricePerDay: number, pricePerKm: number): number => {
        return Number(
            ((pricePerDay / 100) * duration + (pricePerKm / 100) * distance).toFixed(2)
        );
    };

    return (
        <div>
            <div className={"head"}>
                <h1>Car rental</h1>
            </div>

            <div className={"options"}>
                <h3>Filter results</h3>
                <div className={"filter"}>
                    <span>Distance :</span>
                    <Row type="flex" justify="start" align="top">
                        <Col span={16}>
                            <Slider
                                min={50}
                                max={3000}
                                step={50}
                                onChange={n => getMatchingDistance(n)}
                            />
                        </Col>
                        <Col span={4}>
                            <div className={"count"}>{`${distance} km`}</div>
                        </Col>
                    </Row>
                </div>

                <div className={"filter"}>
                    <span>Duration :</span>
                    <Row type="flex" justify="start" align="top">
                        <Col span={16}>
                            <Slider
                                min={1}
                                max={30}
                                step={1}
                                onChange={n => getMatchingDuration(n)}
                            />
                        </Col>
                        <Col span={4}>
                            <div className={"count"}>{`${duration} ${
                                duration === 1 ? "day" : "days"
                            }`}</div>
                        </Col>
                    </Row>
                </div>
            </div>
            <div className={"grid"}>
                {cars.map(
                    ({ id, picturePath, brand, model, pricePerDay, pricePerKm }) => (
                        <div className={"vehicle"} key={id}>
                            <img alt={id} src={picturePath} />
                            <div className={"about"}>
                                <h3>{`${brand} ${model}`}</h3>
                                <span>{`Price per day: ${pricePerDay / 100}$`}</span>{" "}
                                <span>{`Price per km: ${pricePerKm}¢`}</span>
                            </div>
                            <div className={"pricing"}>
                                {!isInit && (
                                    <span>{`Total price: ${calculatePrice(pricePerDay, pricePerKm)}$`}</span>
                                )}
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default App;
