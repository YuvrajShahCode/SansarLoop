/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://my-blog-example.com',
    generateRobotsTxt: true,
    // optional
    robotsTxtOptions: {
        policies: [
            { userAgent: '*', allow: '/' },
        ],
    },
}
