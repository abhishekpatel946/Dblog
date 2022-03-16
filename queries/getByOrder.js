const getByOrder = `
{
    posts(
      orderBy: createdAtTimestamp
      orderDirection: desc
    ) {
      id
      title
      contentHash
      published
      postContent
    }
  }
`;

export default getByOrder;
