const BookCard = ({ id, volumeInfo }) => {
  let {
    title,
    authors,
    publisher,
    publishedDate,
    description,
    imageLinks,
  } = volumeInfo;
  return (
    <div>
      {id}
      {title}
      {authors}
      {publisher}
      {publishedDate}
      description: {description}
      <img src={imageLinks.thumbnail} alt="book" />
    </div>
  );
};

export default BookCard;
