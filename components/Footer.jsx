import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-4">About SansarLoop</h3>
                        <p className="text-gray-400">
                            Sharing knowledge and insights on web development and design.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="text-gray-400 hover:text-white">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-400 hover:text-white">
                                    Topics
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-400 hover:text-white">
                                    Authors
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
                        <p className="text-gray-400 mb-4">Subscribe to our newsletter for the latest updates.</p>
                        <form className="flex" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="px-4 py-2 w-full rounded-l-md text-gray-900 focus:outline-none"
                            />
                            <button className="bg-indigo-600 px-4 py-2 rounded-r-md hover:bg-indigo-700">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
                <div className="mt-8 border-t border-gray-700 pt-8 text-center text-gray-400">
                    <p>&copy; {new Date().getFullYear()} SansarLoop. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
