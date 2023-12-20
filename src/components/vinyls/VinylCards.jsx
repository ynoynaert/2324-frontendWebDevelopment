import Vinyl from "./Vinyl";

const VinylCards = ({ vinyls, onDelete }) => {

  return (
    <>
      {vinyls.map((vinyl) => (
        <Vinyl key={vinyl.id} {...vinyl} onDelete={onDelete} />
      ))}
    </>
  );
};

export default VinylCards;
