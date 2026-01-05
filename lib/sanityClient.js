import { createClient } from 'next-sanity';
import createImageUrlBuilder from '@sanity/image-url';

export const config = {
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    apiVersion: '2023-05-03', // use a UTC date string
    useCdn: process.env.NODE_ENV === 'production',
};

export const sanityClient = createClient(config);

const builder = createImageUrlBuilder(sanityClient);

export const urlFor = (source) => {
    if (!source) return undefined;
    return builder.image(source);
};
