import { useEffect, useState } from "react";
const Update = () => {
  const [user] = useState(JSON.parse(localStorage.getItem("profile")).result);
  const [formData, setFormData] = useState(user);

  const handleUpdate = (e) => {
    console.log(e.target.elements);
  };
  useEffect(() => {
    console.log(formData);
  }, [formData]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <form method="post" onSubmit={handleUpdate}>
      <input
        name="fullname"
        type="text"
        id="fullname"
        defaultValue={formData["fullname"]}
        onChange={handleChange}
        placeholder="Full name"
        autoComplete="off"
        maxLength={30}
        required
      />

      <input
        type="text"
        name="username"
        id="username"
        defaultValue={formData["username"]}
        placeholder="username"
        pattern="[a-zA-Z0-9]{3,12}"
        required
      />
      <input
        name="phone"
        type="tel"
        id="phone"
        defaultValue={formData["phone"]}
        placeholder="888888888"
        pattern="[0-9]{10}"
        autoComplete="off"
        maxLength={12}
        required
      />
      <input
        type="email"
        name="email"
        id="email"
        defaultValue={formData["email"]}
        placeholder="email(optional)"
      />
      <input
        name="password"
        type="password"
        id="password1"
        defaultValue={formData["password"]}
        placeholder="Four Digit Pin"
        autoComplete="off"
        required
      />

      <h1> Enter Your Role</h1>
      <label>
        <input
          type="radio"
          name="role"
          value="Seller"
          id="Seller"
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
          checked={formData.role === "Seller" ? true : false}
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
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
          checked={formData.role === "Buyer" ? true : false}
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
          checked={formData.role === "Both" ? true : false}
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
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
            defaultValue={formData["nameOfBusiness"]}
            placeholder="Name of Business"
          />
          <input
            type="text"
            name="GSTIN"
            id="GSTIN"
            defaultValue={formData["GSTIN"]}
            placeholder="GSTIN(capital only)"
            pattern="[A-Z0-9]{8}"
          />
          <input
            type="text"
            name="location"
            id="location"
            defaultValue={formData["location"]}
            placeholder="location"
            required
          />
        </div>
      ) : (
        <div></div>
      )}
      <input type="submit" value="Submit" />
    </form>
  );
};
export default Update;
