/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://sansarloop.com',
    generateRobotsTxt: true,
    // optional
    robotsTxtOptions: {
        policies: [
            { userAgent: '*', allow: '/' },
        ],
    },
}
