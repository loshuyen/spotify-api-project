import SpotifyPlayer from 'react-spotify-player';

const uriArray = ['spotify:artist:6noxsCszBEEK04kCehugOp', 'spotify:artist:3WYT2b8pOLsLsqSaoWYr7U'];

const playerArray = uriArray.map(element => {
  return(
    <SpotifyPlayer
        uri={element}
        size={{
          width: '20%',
          height: 300,
        }}
        view={'list'}
        theme={'black'}
      />
  );
});

const Player = () => {
  return (
  <div>{playerArray}</div>
    );
};
export default Player;
