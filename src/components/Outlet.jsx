import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

export default function DefaultLayout() {
    return (
        <>
            <Header />

            <main className="max-w-screen-xl px-8 mx-auto">
                <Outlet />
            </main>

            <Footer />
        </>
    )
}