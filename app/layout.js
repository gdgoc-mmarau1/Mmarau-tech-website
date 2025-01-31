import './globals.css'
import Nav from '../components/Nav'
import Footer from "@/components/Footer";
import About_us from '../components/About_us'
import Provider from '../components/Provider'

export const metadata = {
    title: 'GDGoC',
    description: 'The techie meet-Up',
}

const RootLayout = ({ children }) =>{
    return (
        <html lang='en' className='overflow-x-hidden'>
            <body>
               
                    <main className="app">
                        <Nav />
                        <About_us />
                        {children}
                    </main>
                    <footer>
                        <Footer />
                    </footer>
                
            </body>
        </html>
            
    )
}

export default RootLayout;