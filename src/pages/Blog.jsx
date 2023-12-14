import { useEffect, useState } from "react";
import SinglePost from "../components/SinglePost";
import Loading from "../components/Loading";
import OffCanvas from "../components/OffCanvas";
import ToastMessage from "../components/ToastMessage";
import Modal from "../components/Modal";

const apiPost = `http://localhost:1111/post`;
const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE2LCJlbWFpbCI6Im92ZXJAYS5pdCIsImlhdCI6MTcwMjU1MjE1NiwiZXhwIjo1MzAyNTUyMTU2fQ.9GtfwjfaOCrLpyeYggXVC4XGhXou6PTdpONdYvwjB80`;

export default function Blog() {
    useEffect(getAllPosts, []); //onMounted


    const [posts, setPosts] = useState([]);
    const [postShow, setPostShow] = useState(null);
    const [postEdit, setPostEdit] = useState(null);
    const [postDelete, setPostDelete] = useState(null);
    const [toastMessage, setToastMessage] = useState('')
    const [loading, setLoading] = useState(false);
    const [isOffcanvasVisible, setIsOffcanvasVisible] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [postToDelete, setPostToDelete] = useState(null);

    function resetToast() {
        if (toastMessage) {
            setTimeout(() => {
                setToastMessage('')
            }, 3000);
        }
    }

    useEffect(() => { resetToast() }, [toastMessage]);

    function openModal(post) {
        setPostToDelete(post);
        setIsModalOpen(true);
    }

    function closeModal() {
        setPostToDelete(null);
        setIsModalOpen(false);
    }

    function showPost(post) {
        setLoading(true);
        setPostShow(post);
        setLoading(false);
    }

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


    function editPost(post) {
        setPostEdit(post)
    }

    function deletePost(post) {
        fetch(`${apiPost}/${post.slug}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
            .then((resp) => {
                if (!resp.ok) {
                    throw new Error(`Errore nella richiesta: ${resp.status} ${resp.statusText}`);
                }
                setToastMessage(`${post.title}`)
                setPostDelete(post.title)
                console.log(`Post eliminato con successo: ${post.slug}`);
                getAllPosts();
            })
            .catch((error) => {
                console.error("Errore nell'eliminazione del post:", error);
            });
    }


    function chiudiOffCanvasDaPadre(e) {
        if (e.target.closest("#offcanvas")) {
            return;
        }

        if (isOffcanvasVisible) {
            setIsOffcanvasVisible(false);
        }
    }

    return (
        <>
            {loading ? <Loading /> : (
                <div className="blog" id="blog" onClick={chiudiOffCanvasDaPadre}>
                    {toastMessage && postDelete && <ToastMessage crud='delete' resourceName={postDelete} color='red' />}

                    <div className={`flex flex-wrap gap-8 my-4 ${isOffcanvasVisible ? 'opacity-30' : ''}`}>

                        {posts.map((post) => (
                            <SinglePost
                                key={post.id}
                                post={post}
                                onShow={() => { showPost(post); }}
                                onEdit={() => { editPost(post); }}
                                onDelete={() => openModal(post)}
                            />
                        ))}
                    </div>

                    <div>
                        <OffCanvas
                            text={isOffcanvasVisible ? 'Chiudi pannello' : 'Crea nuovo Post'}
                            isVisible={isOffcanvasVisible}
                            toggleOffcanvas={() => { setIsOffcanvasVisible(!isOffcanvasVisible); }}
                            updatePostList={getAllPosts}
                        />
                    </div>

                    <Modal
                        resourceName={postToDelete ? postToDelete.title : ''}
                        isOpen={isModalOpen}
                        onClose={closeModal}
                        onConfirm={() => {
                            deletePost(postToDelete);
                            closeModal();
                        }}
                    />
                </div>
            )}
        </>
    );
}

