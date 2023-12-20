import Collection from "./Collection";

const CollectionCards = ({ filteredCollecties, currentUser, onDelete }) => {
  return (
    <>
      {filteredCollecties.map((collectie) => (
        <Collection
          key={collectie.id}
          {...collectie}
          userID={currentUser}
          onDelete={onDelete}
        />
      ))}
    </>
  );
};

export default CollectionCards;
