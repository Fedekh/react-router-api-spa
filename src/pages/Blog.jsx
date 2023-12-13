import { useEffect, useState } from "react";
import SinglePost from "../components/SinglePost";
import Loading from "../components/Loading";
import OffCanvas from "../components/OffCanvas";

const apiPost = `http://localhost:1111/post`;

export default function Blog() {
    useEffect(getAllPosts, []); //onMounted

    const [posts, setPosts] = useState([]);
    const [postShow, setPostShow] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isOffcanvasVisible, setOffcanvasVisible] = useState(false);


    function getAllPosts() {
        setLoading(true);
        fetch(apiPost)
            .then((resp) => {
                if (!resp.ok) {
                    throw new Error(`Errore nella richiesta: ${resp.status} ${resp.statusText}`);
                }
                return resp.json();
            })
            .then((data) => {
                console.log("%cPOST TOTALI", "color: green; font-size: 16px;", data);
                setPosts(data.data);
            })
            .catch((error) => {
                console.error("Errore nella richiesta:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    function showInfo(post) {
        setLoading(true);
        setPostShow(post);
        setLoading(false);
    }


    return (
        <>
            {loading ? <Loading /> : (
                <div>
                    <div className="flex flex-col gap-2">
                        {posts.map((post) => (
                            <SinglePost
                                key={post.id}
                                post={post}
                                onShow={() => { showInfo(post); }}
                            />
                        ))}
                    </div>

                    <div>
                        <OffCanvas
                            text={isOffcanvasVisible ? 'Chiudi pannello' : 'Crea nuovo Post'}
                            isVisible={isOffcanvasVisible}
                            toggleOffcanvas={() => { setOffcanvasVisible(!isOffcanvasVisible); }}
                            updatePostList={getAllPosts}
                        />
                    </div>
                </div>
            )}
        </>
    );
}

