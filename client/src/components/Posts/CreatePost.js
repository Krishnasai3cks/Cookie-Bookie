import FileBase64 from "react-file-base64";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createPostAction } from "../../actions/postsAction.js";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
const initialState = {
  title: "",
  description: "",
  image: "",
  message: "",
  fullname: "",
  creator: "",
  minAskingPrice: 0,
  highestBid: 0,
  biddingEnd: new Date(),
  location: "",
  typeOfCookie: "",
  egglessOrEgg: "",
};
const CreatePost = () => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("profile")).result
  );
  const history = useHistory();
  const dispatch = useDispatch();
  const [data, setData] = useState(initialState);
  const uploadImage = (files) => {
    setData({ ...data, image: files[0].base64 });
  };
  useEffect(() => {
    if (data) setData(data);
  }, [data]);
  const sendCreatePost = (event) => {
    event.preventDefault();
    const temp = data;

    const target = event.target.elements;
    const responseKeys = Object.keys(target);
    Object.keys(initialState).forEach((key) => {
      if (responseKeys.includes(key)) {
        temp[key] = target[key].value;
      }
    });
    temp["highestBid"] = temp.minAskingPrice;
    temp["fullname"] = user.fullname;
    temp["username"] = user.username;
    temp["creator"] = user._id;
    setData(temp);
    dispatch(createPostAction(data, history));
  };
  const updateState = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };
  return (
    <form onSubmit={sendCreatePost} method="post">
      <input
        type="text"
        name="title"
        placeholder="title"
        onChange={updateState}
        required
      />
      <input
        type="text"
        name="description"
        placeholder="description"
        required
      />

      <FileBase64 multiple={true} onDone={uploadImage} />
      <input
        type="text"
        name="message"
        placeholder="message"
        onChange={updateState}
        required
      />

      <input
        type="number"
        name="minAskingPrice"
        placeholder="Minimum Asking Price(MAP)"
        onChange={updateState}
        required
      />

      <input type="date" name="biddingEnd" onChange={updateState} required />
      <input
        type="text"
        name="location"
        min={new Date()}
        onChange={updateState}
        placeholder="location"
        required
      />
      <input
        type="text"
        name="typeOfCookie"
        onChange={updateState}
        placeholder="cookie"
        required
      />

      <label htmlFor="egg">
        Egg
        <input
          type="radio"
          name="egglessOrEgg"
          id="egg"
          onChange={(e) => setData({ ...data, egglessOrEgg: e.target.value })}
          value="egg"
        />
      </label>
      <label htmlFor="eggless">
        Eggless
        <input
          type="radio"
          name="egglessOrEgg"
          id="eggless"
          onChange={(e) => setData({ ...data, egglessOrEgg: e.target.value })}
          value="eggless"
        />
      </label>

      <input type="submit" value="Create" />
    </form>
  );
};
export default CreatePost;

{
  /* 
<!-- title, description, image, message, name, creator, minimumAskingPrice, highestBid, biddingEnd, location, typeOfCookie, egglessOrEgg, bakedTime, likes --> */
}
