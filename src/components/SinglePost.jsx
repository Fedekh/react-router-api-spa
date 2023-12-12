export default function SinglePost(){
    return (
        
<a href="" className="flex flex-col items-center bg-green-800 border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-green-500 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
    <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src="download.png" alt=""/>
    <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-cyan-500 dark:text-white">Noteworthy technology acquisitions 2021</h5>
        <p className="mb-3 font-normal dark:text-white-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
    </div>
</a>

    )
}