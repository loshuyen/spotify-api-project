import { useState } from 'react';
import axios from 'axios';
import SpotifyPlayer from 'react-spotify-player';
import { useSelector } from 'react-redux';

const SearchNew = () => {
  const user = useSelector((state) => state.auth.user);
  const [name, setName] = useState('');
  const [artistUri, setArtistUri] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const artist = await axios.get(`/api/spotify/artist/${name}`);
    setArtistUri(artist.data);
    return artistUri;
  };

  const handleAddNewAlbum = async (e) => {
    const id = user._id;
    const uri = e.target.name;
    await axios.put(`/playlist/user/add/${id}/${uri}`);
    return;
  };

  const searchResults = () => {
    if (artistUri) {
      return (
        <div>
          <SpotifyPlayer
            uri={artistUri}
            size={{
              width: '50%',
              height: 200,
            }}
            view={'list'}
            theme={'black'}
          />
          <button name={artistUri} onClick={handleAddNewAlbum}>
            加入歌單
          </button>
        </div>
      );
    }
  };

  return (
    <div class='col s12'>
      <div class='row'>
        <div class='input-field col s5'>
          <form onSubmit={handleSubmit}>
            <i class='material-icons prefix'>search</i>
            <label>歌手</label>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </form>
        </div>
      </div>
      {searchResults()}
    </div>
  );
};

export default SearchNew;
