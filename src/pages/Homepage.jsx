// HomePage.js

import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import Button from '../components/Button';

const HomePage = () => {
    return (
        <div className="container text-center mx-auto px-8 mt-8">
            <section className="">
                <h1 className="text-4xl font-bold mb-4">Benvenuto al nostro Blog!</h1>
                <p>Esplora gli articoli più recenti e interessanti.</p>
            </section>

            <section className="my-8">
                <Link
                    to='/blog'>

                    <Button
                        text='Articoli in evidenza'
                        color='yellow'
                    />
                </Link>
            </section>
        </div>
    );
};

export default HomePage;
