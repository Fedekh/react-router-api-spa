import { useEffect, useState } from "react";
import SinglePost from "../components/SinglePost";

const apiPost = `http://localhost:1111/post`;

export default function Blog() {

    const [posts, setPosts] = useState([]);
    const [postShow, setPostShow] = useState(null);

    function getAllPosts() {
        fetch(apiPost)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Errore nella richiesta: ${res.status} ${res.statusText}`);
                }
                return res.json();
            })
            .then((data) => {
                console.log("Dati ricevuti:", data.data);
                setPosts(data.data);
            })
            .catch((error) => console.error("Errore nella richiesta:", error));
    }

    useEffect(getAllPosts, []); //onMounted

    function handleMoreInfoClick(id) {
        setPostShow(post);
    }

    return (
        <>
            {posts.map((post, i) => {
                return (

                    <SinglePost key={i} post={post} onShow={() => { handleMoreInfoClick(post.id); }} />
                );
            })}
        </>
    );
}

