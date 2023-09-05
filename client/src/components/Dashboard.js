import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import SpotifyPlayer from 'react-spotify-player';
import { fetchUser } from '../slices/authSlice';


const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const playlist = user.playlist;
  const dispatch = useDispatch();

  const handleDelete = async (e) => {
    const uri = e.target.id;
    await axios.put(`/playlist/user/del/${user._id}/${uri}`);
    dispatch(fetchUser());
    return;
  };
 
  const playerArray = playlist?.map((element) => {
    return (
        <table key={element}>
        <tbody>
          <tr>
            <td>
              <SpotifyPlayer
              uri={element}
              size={{
                width: '50%',
                height: 200,
              }}
              view={'list'}
              theme={'black'}
            />
          </td>
            <td>
                <button
                id={element} 
                className="btn waves-effect waves-light"
                onClick={handleDelete}
                >Remove</button>
            </td>
          </tr>
        </tbody>
      </table>
    );
  });
  return (
    <div>
    <h3>我的歌單</h3>
      {playerArray}
    </div>
  );
};

export default Dashboard;
