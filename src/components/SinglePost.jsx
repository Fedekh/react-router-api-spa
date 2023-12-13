import { useState, useEffect } from 'react';
import { Link, NavLink, useParams } from "react-router-dom";
import Button from './Button';

export default function SinglePost({ post }) {
    const { id, title, content, category, tags, slug, image } = post;

    function getUrlImg() {
        if (!image) return 'public/download.png'
    }

    return (
        <div>
            <div className="flex flex-col items-center bg-green-800 border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl">
                <img
                    className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                    src="../../public/download.png"
                    alt="" />
                <div className="flex flex-col justify-between p-4 leading-normal">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-cyan-500 ">
                        <span className="text-red-600">Title:</span> {title}
                    </h5>
                    <p className="mb-3 font-normal">
                        <span className="text-pink-400">Descrizione:</span>{content ? content : 'Non disponibile'}
                    </p>
                    <p className="mb-3 font-normal">
                        <span className="text-pink-400">Categoria:</span>{category?.title || 'Non disponibili'}
                    </p>
                    <div>
                        <span className="text-pink-400">Tags:</span>
                        <ul>
                            {tags?.length ? tags.map((tag, i) => (
                                <li key={i}>{tag.title}</li>
                            )) : <li>Non disponibili</li>}

                        </ul>
                    </div>
                </div>

                {!window.location.href.includes(`/blog/${slug}`) &&
                    <Link
                        to={`/blog/${slug}`}
                        key={id}>
                        <Button text='INFO' color='red' />
                    </Link>
                }
            </div>

        </div>
    );
}
