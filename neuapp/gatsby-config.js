const meta = require('./meta.json')
const autoprefixer = require('autoprefixer')

module.exports = {
    siteMetadata: meta,
    plugins: [
        `gatsby-plugin-mdx`,
        {
            resolve: `gatsby-plugin-sass`,
            options: {
              sassOptions: {
                indentedSyntax: true,
                esModule: false,
              },
            },
        },
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `blog`,
                path: `${__dirname}/blog`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `courses`,
                path: `${__dirname}/courses`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `chapters`,
                path: `${__dirname}/chapters`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `slides`,
                path: `${__dirname}/slides`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `exercises`,
                path: `${__dirname}/exercises`,
            },
        },
        {
            resolve: 'gatsby-plugin-react-svg',
            options: {
                rule: {
                    include: /static/,
                },
            },
        },
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [
                    `gatsby-remark-copy-linked-files`,
                    {
                        resolve: `gatsby-remark-prismjs`,
                        options: {
                            noInlineHighlight: true,
                        },
                    },
                    {
                        resolve: `gatsby-remark-smartypants`,
                        options: {
                            dashes: 'oldschool',
                        },
                    },
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            maxWidth: 790,
                            linkImagesToOriginal: true,
                            sizeByPixelDensity: false,
                            showCaptions: true,
                            quality: 80,
                            withWebp: { quality: 80 },
                        },
                    },
                    `gatsby-remark-unwrap-images`,
                ],
            },
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        `gatsby-plugin-sitemap`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: meta.title,
                short_name: meta.title,
                start_url: `/`,
                background_color: meta.theme,
                theme_color: meta.theme,
                display: `minimal-ui`,
                icon: `static/icon.png`,
            },
        },
        `gatsby-plugin-offline`,
      {
        resolve: `gatsby-plugin-google-gtag`,
        options: {
          // You can add multiple tracking ids and a pageview event will be fired for all of them.
          trackingIds: [
            // "GA-TRACKING_ID", // Google Analytics / GA
            "UA-190597307-1",
            // "AW-CONVERSION_ID", // Google Ads / Adwords / AW
            // "DC-FLOODIGHT_ID", // Marketing Platform advertising products (Display & Video 360, Search Ads 360, and Campaign Manager)
          ],
          // This object gets passed directly to the gtag config command
          // This config will be shared across all trackingIds
          gtagConfig: {
            optimize_id: "OPT_CONTAINER_ID",
            anonymize_ip: true,
            cookie_expires: 0,
          },
          // This object is used for configuration specific to this plugin
          pluginConfig: {
            // Puts tracking script in the head instead of the body
            head: false,
            // Setting this parameter is also optional
            respectDNT: true,
            // Avoids sending pageview hits from custom paths
            exclude: ["/preview/**", "/do-not-track/me/too/"],
          },
        },
      },
    ],
}
