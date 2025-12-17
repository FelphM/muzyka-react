import { useState, useEffect } from "react";
import "../styles/forms.css";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { updateUserProfile, deleteUserProfile } from "../services/api";


export function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    stateProvince: "",
    postalCode: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      setUserData({
        username: user.username || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        city: user.city || "",
        stateProvince: user.stateProvince || "",
        postalCode: user.postalCode || "",
      });
    }
  }, [user]);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditToggle = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (isEditing) {
      try {
        console.log("Saving user data:", userData);
        const updatedUser = await updateUserProfile(userData);
        if (user) {
          const newUserData = { ...user, ...updatedUser };
          localStorage.setItem('user', JSON.stringify(newUserData));
          window.location.reload();
        }
      } catch (error) {
        console.error("Failed to update user profile:", error);
      }
    }
    setIsEditing(!isEditing);
  };

  const handleCancel = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (user) {
      setUserData({
        username: user.username || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        city: user.city || "",
        stateProvince: user.stateProvince || "",
        postalCode: user.postalCode || "",
      });
    }
    setIsEditing(false);
  };

  const handleLogout = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    logout();
    navigate("/");
  };

  const handleChangePassword = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    navigate("/change-password");
  };

  const handleDeleteAccount = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      try {
        await deleteUserProfile();
        logout();
        navigate("/");
      } catch (error) {
        console.error("Failed to delete account:", error);
      }
    }
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
                disabled={true}
              />
            </label>

            <label>
              Phone Number
              <input
                type="tel"
                name="phone"
                id="phone"
                placeholder="ej: +56 9 1234 5678"
                value={userData.phone}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </label>

            {!isEditing && (
              <>
                <button onClick={handleChangePassword} className="primaryButton">Change Password</button>
                <button onClick={handleEditToggle} className="primaryButton">Edit Info</button>
              </>
            )}

            {isEditing && (
              <>
                <button type="button" onClick={handleCancel} className="secondaryButton">
                  Cancel
                </button>
                <button type="submit" onClick={handleEditToggle} className="primaryButton">
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
                placeholder="ej: 123 Main Street"
                value={userData.address}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </label>

            <label>
              City
              <input
                type="text"
                name="city"
                id="city"
                placeholder="ej: New York"
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
                placeholder="ej: NY"
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
                placeholder="ej: 10001"
                value={userData.postalCode}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </label>

          </form>
        </section>
        
        {/* === 4. Sección Acciones de Cuenta (Log Out) === */}
        <section>
          <h2>⚙️ Account Actions</h2>
          <form onSubmit={handleLogout}>
            <button type="submit" className="secondaryButton">
              Log Out
            </button>
          </form>
          <br />
          <button onClick={handleDeleteAccount} className="secondaryButton">Delete Account</button>
        </section>
      </main>
    </>
  );
}
