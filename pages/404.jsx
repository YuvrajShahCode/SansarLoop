import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Custom404() {
    return (
        <div className="min-h-screen flex flex-col font-sans">
            <Navbar />
            <main className="flex-grow flex flex-col items-center justify-center bg-gray-50 text-center px-4">
                <h1 className="text-9xl font-extrabold text-indigo-600">404</h1>
                <h2 className="text-4xl font-bold text-gray-900 mt-4">Page Not Found</h2>
                <p className="text-gray-600 mt-4 max-w-md">
                    Oops! The page you are looking for does not exist. It might have been moved or deleted.
                </p>
                <Link href="/" className="mt-8 px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors">
                    Go back home
                </Link>
            </main>
            <Footer />
        </div>
    );
}
