export default parseLinkHeader = (link) => {
  const links = link.split(",").reduce((acc, link) => {
    let match = link.match(/<(.*)>; rel="(\w*)"/);
    let url = match[1];
    let rel = match[2];
    acc[rel] = url;
    return acc;
  }, {});
  return links;
};
