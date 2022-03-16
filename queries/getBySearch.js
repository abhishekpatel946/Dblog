const getBySearch = `
{
    postSearch(
      text: "Hello"
    ) {
      id
      title
      contentHash
      published
      postContent
    }
  }
`;
export default getBySearch;
