module.exports = {
  siteUrl: process.env.SITE_URL || 'https://mayoulong.dev',
  outDir: 'out',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/social-image.png'],
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
};
