import "./rightbar.css"
import { Users } from '../../dummyData';
import Online from '../online/Online';
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import AddIcon from '@mui/icons-material/Add';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import RemoveCircleOutline from "@mui/icons-material/RemoveCircleOutline";

axios.defaults.baseURL = 'https://socialize-backend-nmng.onrender.com/api';

export default function Rightbar({ user }) {

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser } = useContext(AuthContext);
  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/users/friends/" + user._id);
        setFriends(friendList?.data);
      } catch (err) {
        console.log(err);
      }
    }
    getFriends();
  }, [user]);

  useEffect(() => {
    setFollowed(currentUser.following.includes(user?.id))
  }, [currentUser, user?.id]);

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put("/users/" + user._id + "/unfollow", {
          userId: currentUser._id
        });
      } else {
        await axios.put("/users/" + user._id + "/follow", {
          userId: currentUser._id
        });
      }
    } catch (err) {
      console.log(err);
    }
    setFollowed(!followed);
  }

  const HomeRightbar = () => {
    return (
      <>

        <div className="birthdayContainer">
          <img className="birthdayImg" src={PF + "gift.png"} alt="" />
          <span className="birthdayText"><b>Pola Foster</b> and <b>3 other friends</b> have a birthday today</span>
        </div>
        <img className="rightbarAd" src={PF + "ad.png"} alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    )
  }

  const ProfileRightbar = () => {
    return (
      <>

        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>

            {followed ? "unfollow" : "follow"}
            {followed ? <RemoveCircleOutline /> : <AddIcon />}
          </button>
        )}

        <h4 className="rightbarTitle">User Information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey" >City:</span>
            <span className="rightbarInfoValue" >{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey" >From:</span>
            <span className="rightbarInfoValue" >{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey" >Relationship:</span>
            <span className="rightbarInfoValue" >{user.relationship === 1 ? "Single" : user.relationship === 1 ? "Married" : "active"}</span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (

            <Link to={"/profile/" + friend.username} style={{ textDecoration: "none" }}>
              <div className="rightbarFollowing">
                <img className="rightbarFollowingImg"
                  src={friend.profilePicture ? PF + friend.profilePicture : PF + friend.profilePicture} alt="" />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))
          }
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
