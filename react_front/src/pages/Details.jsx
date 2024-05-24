
import { useParams } from "react-router-dom";
import { useCowContext } from "../contexts/cowsContexts";
import { useState } from "react";


const Details = (props) =>{
    const {cows, loading} = useCowContext();
    const {id} = useParams();
    const cow = cows.find(cow => cow.id === parseInt(id));
    return(
    <div> 
        {
            cow ? (
                <div>
                    <div>{cow.id}</div>
                    <div>{cow.name}</div>
                    <div>{cow.color}</div>
                    <div>{cow.weight}</div>
                    <div>{cow.type}</div>
                </div>
            ) :(
                <div>
                    <h2>Cow not found!</h2>
                </div>
            )}
    </div>);
}
export default Details;