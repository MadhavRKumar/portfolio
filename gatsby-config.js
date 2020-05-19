module.exports = {
  siteMetadata: {
    title: `Madhav Kumar`,
    description: `Madhav Kumar is a web developer and generative artist. When developing websites, he prefers to work with Javascript libraries and frameworks like React, Express, and Node.js. He dabbles in generative art using a variety of tools and methods.`,
    author: `Madhav Kumar`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`, 
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `art`,
        path: `${__dirname}/src/art/`,
      },
    },
	{
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data/`,
      },
    },
    `gatsby-transformer-sharp`,
	`gatsby-transformer-json`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
