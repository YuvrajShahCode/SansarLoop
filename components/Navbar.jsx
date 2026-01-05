import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="bg-white shadow-md z-10 sticky top-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="text-2xl font-bold text-gray-800">
                            SansarLoop
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link href="/" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                            Home
                        </Link>
                        <Link href="#" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                            About
                        </Link>
                        <Link href="#" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                            Contact
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
