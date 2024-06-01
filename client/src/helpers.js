export const updateCache = (cache, query, addedPerson) => {
  const uniqueByName = (a) => {
    let seen = new Set();
    return a.filter((item) => {
      let k = item.name;
      return seen.has(k) ? false : seen.add(k);
    });
  };

  cache.updateQuery(query, ({ allPersons }) => {
    return { allPersons: uniqueByName(allPersons.concat(addedPerson)) };
  });
};
