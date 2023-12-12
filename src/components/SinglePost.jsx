import { useState, useEffect } from 'react';
import { Link, NavLink, useParams } from "react-router-dom";

export default function SinglePost(props) {
    const { post, onShow } = props;
    const { id, title, content, category, tags, slug } = post;

    return (
        <div>
            <div className="flex flex-col items-center bg-green-800 border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-green-500 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src="download.png" alt="" />
                <div className="flex flex-col justify-between p-4 leading-normal">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-cyan-500 dark:text-white">Title: {title}</h5>
                    <p className="mb-3 font-normal dark:text-white-400">Content: {content}.</p>
                    <p className="mb-3 font-normal dark:text-white-400">Categoria: {category?.title || 'Nessuna categoria'}.</p>
                    <ul>
                        {tags.length ? tags.map((tag, i) => {
                            return (
                                <li key={i}>{tag.title}</li>
                            );
                        }) : <li>Non ci sono tag</li>}

                    </ul>
                </div>

                <Link
                    to={`/posts/${slug}`}
                    key={id}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Info</Link>
            </div>

        </div>
    );
}
