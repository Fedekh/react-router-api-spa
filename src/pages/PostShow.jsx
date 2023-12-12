import { useEffect, useState } from "react";
import SinglePost from "../components/SinglePost";
import { useParams } from "react-router-dom";

const apiPost = `http://localhost:1111/post`;

export default function PostShow() {
    const { slug } = useParamsarams();
    const [post, setPost] = useState([]);

    function getPost() {
        fetch(apiPost + slug)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Errore nella richiesta: ${res.status} ${res.statusText}`);
                }
                return res.json();
            })
            .then((data) => {
                console.log("Dati ricevuti:", data.data);
                setPost(data.data);
            })
            .catch((error) => console.error("Errore nella richiesta:", error));
    }

    useEffect(getPost, []); //onMounted


    return (
        <>
            <SinglePost post={post} />
        </>
    );
}

