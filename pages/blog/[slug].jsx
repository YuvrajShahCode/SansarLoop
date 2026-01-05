import Head from 'next/head';
import Image from 'next/image';
import { sanityClient, urlFor } from '@/lib/sanityClient';
import { PortableText } from '@portabletext/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Post = ({ post }) => {
    if (!post) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center font-sans">
                <Navbar />
                <div className="flex-grow flex items-center justify-center">
                    <p className="text-xl text-gray-500">Loading...</p>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
            <Head>
                <title>{post.title} | MyBlog</title>
                <meta name="description" content={post.description || post.title} />
                {/* Open Graph tags for better social sharing */}
                <meta property="og:title" content={post.title} />
                <meta property="og:description" content={post.description} />
                {post.mainImage && (
                    <meta property="og:image" content={urlFor(post.mainImage).width(1200).height(630).url()} />
                )}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "BlogPosting",
                            headline: post.title,
                            image: post.mainImage ? [urlFor(post.mainImage).width(1200).height(630).url()] : [],
                            datePublished: post.publishedAt,
                            author: [{
                                "@type": "Person",
                                name: post.author?.name || 'MyBlog',
                            }],
                            description: post.description,
                        })
                    }}
                />
            </Head>

            <Navbar />

            <main className="flex-grow max-w-4xl mx-auto px-4 py-12 w-full">
                <article className="bg-white p-8 rounded-lg shadow-sm">
                    <header className="mb-8">
                        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 leading-tight">{post.title}</h1>
                        <div className="flex items-center text-gray-600 text-sm mb-6 pb-6 border-b border-gray-100">
                            {post.author && (
                                <div className="flex items-center mr-6">
                                    {post.author.image && (
                                        <div className="relative w-10 h-10 mr-3">
                                            <Image
                                                src={urlFor(post.author.image).width(40).height(40).fit('crop').url()}
                                                alt={post.author.name}
                                                fill
                                                className="rounded-full object-cover"
                                            />
                                        </div>
                                    )}
                                    <span className="font-medium">{post.author.name}</span>
                                </div>
                            )}
                            {post.publishedAt && (
                                <span className="flex items-center">
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                    {new Date(post.publishedAt).toLocaleDateString()}
                                </span>
                            )}
                        </div>
                        {post.mainImage && (
                            <div className="relative w-full h-96 mb-8 rounded-xl overflow-hidden shadow-lg">
                                <Image
                                    src={urlFor(post.mainImage).url()}
                                    alt={post.title}
                                    fill
                                    className="object-cover"
                                    priority
                                    sizes="(max-width: 768px) 100vw, 900px"
                                />
                            </div>
                        )}
                    </header>

                    <div className="prose prose-indigo lg:prose-xl mx-auto">
                        <PortableText
                            value={post.body}
                            components={{
                                types: {
                                    image: ({ value }) => {
                                        if (!value?.asset?._ref) {
                                            return null
                                        }
                                        return (
                                            <div className="relative w-full h-96 my-8 rounded-lg overflow-hidden">
                                                <Image
                                                    alt={value.alt || ' '}
                                                    src={urlFor(value).width(800).fit('max').auto('format').url()}
                                                    fill
                                                    className="object-contain"
                                                    sizes="(max-width: 768px) 100vw, 800px"
                                                />
                                            </div>
                                        )
                                    }
                                }
                            }}
                        />
                    </div>
                </article>
            </main>

            <Footer />
        </div>
    );
};

export const getStaticPaths = async () => {
    try {
        const query = `*[_type == "post"]{
            slug {
                current
            }
        }`;

        const posts = await sanityClient.fetch(query);

        const paths = posts.map((post) => ({
            params: {
                slug: post.slug.current,
            },
        }));

        return {
            paths,
            fallback: 'blocking',
        };
    } catch (error) {
        console.error("Error fetching paths:", error);
        return {
            paths: [],
            fallback: 'blocking',
        }
    }
};

export const getStaticProps = async ({ params }) => {
    try {
        const query = `*[_type == "post" && slug.current == $slug][0]{
        _id,
        title,
        slug,
        author-> {
            name,
            image
        },
        mainImage,
        categories[]->{
            title
        },
        publishedAt,
        body,
        description
      }`;

        const post = await sanityClient.fetch(query, {
            slug: params.slug,
        });

        if (!post) {
            return {
                notFound: true
            }
        }

        return {
            props: {
                post,
            },
            revalidate: 60,
        };
    } catch (error) {
        console.error("Error fetching post data:", error);
        return {
            notFound: true,
        }
    }
};

export default Post;
