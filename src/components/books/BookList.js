import BookCard from "./BookCard";

const BookList = ({ theBooks }) => {
  return (
    <div>
      {theBooks.items.map((b) => (
        <BookCard id={b.id} volumeInfo={b.volumeInfo} />
      ))}
    </div>
  );
};

export default BookList;
