import { Link } from "react-router-dom";

export default function SinglePost({ post, onShow, onDelete, onEdit }) {
    const { id, title, content, category, tags, slug, image } = post;

    function getUrlImg() {
        if (!image) return 'public/download.png'
    }

    return (
        <div class="max-w-xs rounded overflow-hidden shadow-lg bg-gray-700 text-white card-container">

            <img class="w-full" src="../../public/download.png" alt="" />
            <div class="p-4">
                <h5 class="font-bold text-xl mb-2"><span class="text-red-600">Title:</span> {title}</h5>
                <p class="text-gray-300 text-base my-4">
                    <span class="text-pink-400">Descrizione:</span>{content ? content : 'Non disponibile'}
                </p>
                <p class="text-gray-300 text-base">
                    <span class="text-pink-400">Categoria:</span>{category?.title || 'Non disponibili'}
                </p>
            </div>
            <div class="p-4">
                <p class="text-pink-400 mb-3">Tags:</p>
                <div className='flex gap-3 flex-wrap' style={{ flexShrink: 0 }}>
                    {tags?.length ? tags.map((tag, i) => (
                        <span key={i} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mb-2">{tag.title}</span>
                    )) : <span key={0} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mb-2">Non disponibili</span>}
                </div>
            </div>

            <div className='cta flex gap-3 justify-center flex-wrap'>
                {!window.location.href.includes(`/blog/${slug}`) &&
                    <div className="my-6 rounded-lg bg-blue-700 px-5 py-2.5 
                    text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none 
                    focus:ring-4 focus:ring-${color}-300">
                        <Link to={`/blog/${slug}`} onClick={onShow}>
                            Info
                        </Link>
                    </div>
                }
                <button
                    onClick={onEdit}
                    className="my-6 rounded-lg bg-yellow-500 px-5 py-2.5 
                    text-center text-sm font-medium text-white hover:bg-yellow-800 focus:outline-none 
                    focus:ring-4 focus:ring-${color}-300">
                    Edit
                </button>
                <button
                    onClick={onDelete}
                    className="my-6 rounded-lg bg-red-700 px-5 py-2.5 
                    text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none 
                    focus:ring-4 focus:ring-${color}-300">
                    Cancella
                </button>
            </div>
        </div>

    );
}
