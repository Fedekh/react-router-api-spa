import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import SinglePost from "../components/SinglePost";
import OffCanvas from "../components/OffCanvas";
import Button from "../components/Button";

const apiPost = "http://localhost:1111/post/";

export default function PostShow() {
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const [isOffcanvasVisible, setOffcanvasVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (slug) {
            fetch(`${apiPost}${slug}`)
                .then((resp) => {
                    if (!resp.ok) {
                        throw new Error(`Errore nella richiesta: ${resp.status} ${resp.statusText}`);
                    }
                    return resp.json();
                })
                .then((data) => setPost(data))
                .catch((error) => console.error("Errore nella richiesta:", error));
        }
    }, [slug]);


    const goBack = () => {
        navigate(-1); // Navigate back in the history
    };


    return (
        <>
            <div>
                <div>
                    {post ? <SinglePost post={post} /> : <Loading />}
                </div>
                <div>
                    <OffCanvas text={isOffcanvasVisible ? 'Chiudi pannello' : 'Crea nuovo Post'} isVisible={isOffcanvasVisible} toggleOffcanvas={() => { setOffcanvasVisible(!isOffcanvasVisible) }} />
                </div>
                <button
                    onClick={goBack}
                    className="my-6 rounded-lg bg-green-700 px-5 py-2.5 
                    text-center text-sm font-medium text-white hover:bg-green-800 focus:outline-none 
                    focus:ring-4 focus:ring-${color}-300">
                    Torna indietro
                </button>
            </div>
        </>
    );
}
