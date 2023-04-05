export const filterData = (searchText, notesData) => {
  const data = notesData.filter(
    (item) =>
      item.note.toLowerCase()?.includes(searchText?.toLowerCase()) ||
      item.title.toLowerCase()?.includes(searchText?.toLowerCase())
  );
  return data;
};
