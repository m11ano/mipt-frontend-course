import Footer from "../../widgets/Footer/Footer";
import Header from "../../widgets/Header/Header";

export default function Default({ children }) {
    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    );
}
