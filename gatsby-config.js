module.exports = {
  siteMetadata: {
    title: `Arliss.me`,
    description: `Arliss.me`,
  },
  plugins: [
    `gatsby-plugin-material-ui`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-s3`,
      options: {
        bucketName: 'arliss.me',
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Arliss.me`,
        short_name: `Arliss.me`,
        start_url: `/`,
        background_color: `#A9173C`,
        theme_color: `#A9173C`,
        display: `minimal-ui`,
        icon: `src/images/baseball_icon.png`,
      },
    },
  ],
}
