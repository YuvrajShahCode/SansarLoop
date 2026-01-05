import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { sanityClient, urlFor } from '@/lib/sanityClient';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Home({ posts }) {
    return (
        <div className="min-h-screen flex flex-col font-sans bg-gray-50">
            <Head>
                <title>Sansar Loop</title>
                <meta name="description" content="Thoughts, stories, and ideas on web development and design." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navbar />

            {/* Main Content */}
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                        Welcome to <span className="text-indigo-600">SansarLoop</span>
                    </h1>
                    <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                        Thoughts, stories, and ideas on things that matter.
                    </p>
                </div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts && posts.length > 0 ? (
                        posts.map((post, index) => (
                            <div key={post._id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 flex flex-col">
                                {post.mainImage && (
                                    <div className="relative h-48 w-full group">
                                        <Image
                                            src={urlFor(post.mainImage).url()}
                                            alt={post.title}
                                            fill
                                            priority={index === 0}
                                            className="object-cover group-hover:opacity-90 transition-opacity"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                    </div>
                                )}
                                <div className="p-6 flex-grow flex flex-col">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-sm text-gray-500">
                                            {new Date(post.publishedAt).toLocaleDateString()}
                                        </span>
                                        <span className="text-sm font-medium text-indigo-600">
                                            {post.author?.name}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        <Link href={`/blog/${post.slug.current}`} className="hover:underline">
                                            {post.title}
                                        </Link>
                                    </h3>
                                    {post.description && (
                                        <p className="text-gray-600 mb-4 flex-grow line-clamp-3">
                                            {post.description}
                                        </p>
                                    )}
                                    <div className="mt-auto">
                                        <Link href={`/blog/${post.slug.current}`} className="inline-flex items-center text-indigo-600 hover:text-indigo-500 font-medium">
                                            Read more
                                            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-20">
                            <p className="text-gray-500 text-lg">No posts found. Check back later!</p>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}

export async function getStaticProps() {
    try {
        const posts = await sanityClient.fetch(`
      *[_type == "post"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        author-> {
          name,
          image
        },
        description,
        mainImage,
        publishedAt
      }
    `);

        return {
            props: {
                posts: posts || [],
            },
            revalidate: 60,
        };
    } catch (error) {
        console.error("Error fetching posts:", error);
        return {
            props: {
                posts: [],
            },
            revalidate: 60,
        };
    }
}
