import "./share.css";
import { PermMedia, Label, Room, EmojiEmotions } from "@material-ui/icons";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "./../../contexts/AuthContext";
import { PostContext } from "./../../contexts/PostContext";
import axios from "axios";

const Share = () => {
  // Context
  const {
    state: { user },
  } = useContext(AuthContext);
  const { uploadPost, uploadImage } = useContext(PostContext);

  // State
  const [file, setFile] = useState(null);

  const desc = useRef();

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (file) {
      const data = new FormData();
      const fileName = `post/${Date.now()}${file.name}`;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      uploadImage(data);
    }
    uploadPost(newPost);
    window.location.reload();
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : `${PF}/person/noAvatar.png`
            }
            alt=""
            className="shareImg"
          />
          <input
            type="text"
            placeholder={`What's on your mind, ${user.username}?`}
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />
        <form className="shareBottom" onSubmit={handleSubmit}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
};

export default Share;
