import { useEffect, useState } from "react";

const initialState = {
    title: "",
    image: "",
    content: "",
    published: true,
    category: null,
    tags: []
}
const apiTags = 'http://localhost:1111/tag/'
const apiPost ='http://localhost:1111/post'

export default function OffCanvas({ isVisible, toggleOffcanvas, text }) {
    useEffect(getAllTags, []); //onMounted

    const [formData, setFormData] = useState(initialState)
    const [tags, setTags] = useState([])


    function getAllTags() {
        fetch(apiTags)
            .then((resp) => {
                if (!resp.ok) {
                    throw new Error(`Errore nella richiesta: ${resp.status} ${resp.statusText}`);
                }
                return resp.json();
            })
            .then((data) => {
                console.log("%cDati totali ricevuti", "color: red; font-size: 16px;", data);
                setTags(data.data);
            })
            .catch((error) => {
                console.error("Errore nella richiesta:", error);
            })
    }

    function handleChange(e, key) {
        const value = e.target.value;

        if (key === 'tags') {
            let currentTags = [...formData.tags];

            if (e.target.checked) {
                currentTags.push(value);
            } else {
                currentTags = currentTags.filter(tag => tag !== value);
            }

            setFormData(prev => ({
                ...prev,
                tags: currentTags,
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [key]: value,
            }));
        }
    }


    async function handleFormSubmit(e) {
        e.preventDefault();
        try {
            const response = await fetch(apiPost, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`Errore nella richiesta: ${response.status} ${response.statusText} `);
            }

            const responseData = await response.json();
            console.log('Dati ricevuti:', responseData);

            return responseData;
        } catch (error) {
            console.error('Errore nella richiesta:', error);
        }
    }


    return (
        <>
            <button
                className="fixed z-10 lg:bottom-12 lg:right-6 md-right-16 md:bottom-6 sm:bottom-1 right-1 rounded-lg my-5 bg-red-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={toggleOffcanvas}>{text}
            </button>

            <div className={`fixed z-10 top-0 right-0 w-2/4 h-full bg-indigo-900 rounded-xl transition-transform ease-in-out transform ${isVisible ? 'translate-x-0' : 'translate-x-full'}`}>
                <button className="fixed top-3 right-4 cursor-pointer" onClick={toggleOffcanvas}>
                    <i className="fa-solid fa-x"></i>
                </button>
                <div className="container mx-auto w-full py-10">
                    <h1 className="text-center text-4xl font-bold">Create a New Post</h1>

                    {/* Form Body */}
                    <form onSubmit={(e) => { handleFormSubmit(e) }}
                        className="mx-auto mt-11 w-2/5 rounded-md border-2 border-gray-500 bg-green-800 p-5"
                    >
                        {/* Title */}
                        <div className="mb-5">
                            <label
                                htmlFor="text"
                                className="mb-2 block text-sm font-medium dark:text-gray-900 text-white"
                            >
                                Title
                            </label>
                            <input
                                onChange={(e) => handleChange(e, "title")}
                                value={formData.title}
                                type="text"
                                id="title"
                                name="title"
                                className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                placeholder="Insert the title of your post"
                                required
                            />
                        </div>

                        {/* Content */}
                        <div className="mb-5">
                            <label
                                htmlFor="message"
                                className="mb-2 block text-sm font-medium  dark:text-gray-900 text-white"
                            >
                                Content
                            </label>
                            <textarea
                                onChange={(e) => handleChange(e, "content")}
                                value={formData.content}
                                id="content"
                                rows="4"
                                name="content"
                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                placeholder="Insert a caption..."
                            ></textarea>
                        </div>

                        {/* Image */}
                        <div className="mb-5">
                            <label
                                htmlFor="image"
                                className="mb-2 block text-sm font-medium  dark:text-gray-900 text-white"
                            >
                                Image (URL)
                            </label>
                            <input
                                onChange={(e) => handleChange(e, "image")}
                                value={formData.image}
                                type="file"
                                id="image"
                                name="image"
                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                placeholder="Insert the URL of the image"
                            />
                        </div>

                        {/* Categories */}
                        <div className="mb-5">
                            <label
                                htmlFor="categories"
                                className="mb-2 block text-sm font-medium  dark:text-gray-900 text-white"
                            >
                                Category
                            </label>
                            <select
                                id="categories"
                                name="categoryId"
                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                            >
                                <option value="">Select a category</option>
                            </select>
                        </div>

                        {/* Tags */}
                        <div className="mb-5">
                            <label
                                htmlFor="tags"
                                className="mb-2 block text-sm font-medium dark:text-gray-900 text-white"
                            >
                                Tags
                            </label>
                            {tags?.map((tag, i) => (
                                <div key={tag.id} className="flex items-center">
                                    <input
                                        id={`tag-${i}`}
                                        type="checkbox"
                                        name="tags"
                                        className="mr-2"
                                        value={tag.id}
                                        onChange={(e) => handleChange(e, "tags")}
                                    />
                                    <label htmlFor={`tag-${i}`} className="text-sm">
                                        {tag.title}
                                    </label>
                                </div>
                            ))}
                        </div>


                        {/* Published */}
                        <div className="mb-5">
                            <label
                                htmlFor="published"
                                className="mb-2 text-sm font-medium text-white"
                            >
                                Published
                            </label>
                            <input
                                onChange={(e) => handleChange(e, 'published')}
                                type="checkbox"
                                id="published"
                                name="published"
                                className="form-checkbox ml-2"
                            />

                        </div>

                        <div className="buttons">

                            <button
                                type="submit"
                                className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Save
                            </button>

                            <button
                                className="fixed z-10 lg:bottom-12 lg:right-6 md-right-16 md:bottom-6 sm:bottom-1 right-1 rounded-lg my-5 bg-red-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                onClick={toggleOffcanvas}>{text}
                            </button>

                            <button
                                type="reset"
                                className="focus:outline-none mx-4 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                                Reset
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}