// HomePage.js

import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="container text-center mx-auto px-8 mt-8">
            {/* Sezione di benvenuto */}
            <section className="">
                <h1 className="text-4xl font-bold mb-4">Benvenuto al nostro Blog!</h1>
                <p>Esplora gli articoli più recenti e interessanti.</p>
            </section>

            <section className="my-8">
                <Link to='/blog'>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        <h2 className="text-2xl font-bold mb-4">Articoli in Evidenza</h2>
                    </button>
                </Link>
            </section>
        </div>
    );
};

export default HomePage;
