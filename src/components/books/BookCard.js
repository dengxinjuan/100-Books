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
      <button>
        <a href={`/books/${id}`}>View</a>
      </button>
    </div>
  );
};

export default BookCard;
