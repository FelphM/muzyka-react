import { useState, useEffect } from "react";
import "../styles/forms.css";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


export function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    phone: "+56 9 1234 5678",
    address: "123 Kennedy Avenue",
    city: "Santiago",
    stateProvince: "Metropolitan Region",
    postalCode: "7500000",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      setUserData(prev => ({ ...prev, username: user.username, email: user.email }));
    }
  }, [user]);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditToggle = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (isEditing) {
      console.log("Saving user data:", userData);
    }
    setIsEditing(!isEditing);
  };

  const handleCancel = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Reset to the user data from context
    if (user) setUserData(prev => ({ ...prev, username: user.username, email: user.email }));
    setIsEditing(false);
  };

  const handleLogout = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    logout();
    navigate("/");
  };

  const handleChangePassword = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("Navigating to the Change Password page...");
  };

  return (
    <>
      <main className="centerContent">
        <section>
          <h2>👤 Profile Information</h2>
          <form>
            <label>
              Username
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Alice"
                value={userData.username}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </label>

            <label>
              Email
              <input
                type="email"
                name="email"
                id="email"
                placeholder="alice@gmail.com"
                value={userData.email}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </label>

            <label>
              Phone Number
              <input
                type="tel"
                name="phone"
                id="phone"
                placeholder="+56 9 1234 5678"
                value={userData.phone}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </label>

            {!isEditing && (
              <>
                <button onClick={handleChangePassword}>Change Password</button>
                <button onClick={handleEditToggle}>Edit Info</button>
              </>
            )}

            {isEditing && (
              <>
                <button type="button" onClick={handleCancel}>
                  Cancel
                </button>
                <button type="submit" onClick={handleEditToggle}>
                  Save Changes
                </button>
              </>
            )}
          </form>
        </section>
        <section>
          <h2>🚚 Shipping Information</h2>
          <form>
            <label>
              Address
              <input
                type="text"
                name="address"
                id="address"
                placeholder="123 Main Street"
                value={userData.address}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </label>

            {/* New Fields */}
            <label>
              City
              <input
                type="text"
                name="city"
                id="city"
                placeholder="New York"
                value={userData.city}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </label>

            <label>
              State / Province
              <input
                type="text"
                name="stateProvince"
                id="stateProvince"
                placeholder="NY"
                value={userData.stateProvince}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </label>

            <label>
              Postal Code
              <input
                type="text"
                name="postalCode"
                id="postalCode"
                placeholder="10001"
                value={userData.postalCode}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </label>

            {/* Reuse Edit/Save/Cancel logic here if needed, or rely on the main section's controls */}
          </form>
        </section>
        
        {/* === 4. Account Actions Section (Log Out) === */}
        <section>
          <h2>⚙️ Account Actions</h2>
          <form onSubmit={handleLogout}>
            <button type="submit" className="logoutButton">
              Log Out
            </button>
          </form>
          <br />
          <button className="deleteAccountButton">Delete Account</button>
        </section>
      </main>
    </>
  );
}
