import { useState } from "react";
import { registerUser } from "../../actions/userActions";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
const initialState = {
  fullname: "",
  username: "",
  phone: "",
  email: "",
  password: "",
  role: "",
  nameOfBusiness: "",
  GSTIN: "",
  location: "",
};
const Register = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [formData, setFormData] = useState(initialState);
  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData, history));
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <form method="post" onSubmit={handleRegister}>
      <input
        name="fullname"
        type="text"
        id="fullname"
        placeholder="Full name"
        autoComplete="off"
        onChange={handleChange}
        maxLength={30}
        required
      />

      <input
        type="text"
        name="username"
        id="username"
        placeholder="username"
        pattern="[a-zA-Z0-9]{3,12}"
        required
        onChange={handleChange}
      />
      <input
        name="phone"
        type="tel"
        id="phone"
        placeholder="888888888"
        pattern="[0-9]{10}"
        autoComplete="off"
        maxLength={12}
        required
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        id="email"
        placeholder="email(optional)"
        onChange={handleChange}
        required
      />
      <input
        name="password"
        type="password"
        id="password1"
        placeholder="Four Digit Pin"
        autoComplete="off"
        required
        onChange={handleChange}
      />

      <h1> Enter Your Role</h1>
      <label>
        <input
          type="radio"
          name="role"
          value="Seller"
          id="Seller"
          onChange={handleChange}
          required
        />
        Seller
      </label>
      <label>
        <input
          type="radio"
          name="role"
          value="Buyer"
          id="Buyer"
          onChange={handleChange}
          required
        />{" "}
        Buyer
      </label>
      <label>
        <input
          type="radio"
          name="role"
          value="Both"
          id="Both"
          onChange={handleChange}
          required
        />{" "}
        Both
      </label>
      {formData.role !== "" && formData.role !== "Buyer" ? (
        <div id="sellerSpecial">
          <h1>Additional info(only for sellers)</h1>
          <input
            type="text"
            name="nameOfBusiness"
            id="nameOfBusiness"
            placeholder="Name of Business"
            onChange={handleChange}
          />
          <input
            type="text"
            name="GSTIN"
            id="GSTIN"
            placeholder="GSTIN Number"
            pattern="[A-Z0-9]{8}"
            onChange={handleChange}
          />
          <input
            type="text"
            name="location"
            id="location"
            placeholder="location"
            required
            onChange={handleChange}
          />
        </div>
      ) : (
        <div></div>
      )}
      <input type="submit" value="Submit" />
    </form>
  );
};
export default Register;
