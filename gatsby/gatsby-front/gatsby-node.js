// gatsby-node.js
exports.onCreatePage = async ({ page, actions }) => {
  const { createPage, deletePage } = actions;

  if (page.path === "/persons/") {
    const oldPage = { ...page };
    page.matchPath = "/persons/*"; // Gatsby servirá /persons/12345678 etc.
    deletePage(oldPage);
    createPage(page);
  }
};
