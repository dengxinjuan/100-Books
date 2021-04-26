import BookCard from "./BookCard";

const BookList = ({ theBooks }) => {
  return (
    <div>
      {theBooks.items.map((b) => (
        <BookCard id={b.id} volumeInfo={b.volumeInfo} key={b.id} />
      ))}
    </div>
  );
};

export default BookList;
