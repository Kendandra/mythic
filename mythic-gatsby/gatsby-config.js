module.exports = {
  siteMetadata: {
    title: `Mythic`,
  },
  plugins: [
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /images\/celestial\/.*\.svg/,
          omitKeys: ['inkscapeLabel', 'inkscapeDocumentUnits', 'inkscapeShowpageshadow', 'inkscapeDocumentRotation', 'inkscapeGroupmode', 'sodipodiInsensitive', 'rdfResource', 'rdfAbout', 'inkscapePageopacity', 'inkscapePageshadow', 'inkscapeWindowWidth', 'inkscapeWindowHeight', 'inkscapeZoom', 'inkscapeCx', 'inkscapeCy', 'inkscapeWindowX', 'inkscapeWindowY', 'inkscapeWindowMaximized', 'inkscapeCurrentLayer', 'sodipodiDocname', 'inkscapeVersion', 'inkscapeExportXdpi', 'inkscapeExportYdpi', 'inkscapeExportFilename', 'inkscapeExportVersion', 'xmlnsDc', 'xmlnsCc', 'xmlnsRdf', 'xmlnsSvg', 'xmlnsSodipodi', 'xmlnsInkscape']
        }
      }
    }
  ]
}