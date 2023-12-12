import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Post() {
    const { id } = useParams();
    useEffect(() => {
        // fetch dati usando l'id
    }, []);
    return (
        <div>
            <h1>ID post: {id}</h1>
        </div>
    )
}

