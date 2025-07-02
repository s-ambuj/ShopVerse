import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';

const Profile = () => {
  const { backendURL, token } = useContext(ShopContext);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(backendURL + '/api/user/profile', {
        headers: { token }
      });
      if (response.data.success) {
        const { name, email, phone, profileImage } = response.data.user;
        setName(name);
        setEmail(email);
        setPhone(phone || '');
        setProfileImage(profileImage || '');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching profile");
    }
  };

  const updateProfile = async () => {
    try {
      const body = { name, phone };
      const response = await axios.put(backendURL + '/api/user/profile', body, {
        headers: { token },
      });

      if (response.data.success) {
        toast.success("Profile updated successfully");
        setEditMode(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating profile");
    }
  };

  const updatePassword = async () => {
    if (newPassword.length < 8) {
      return toast.error("Password must be at least 8 characters long");
    }

    try {
      const response = await axios.put(
        backendURL + '/api/user/profile/password',
        { currentPassword, newPassword },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success("Password changed successfully");
        setShowPasswordChange(false);
        setCurrentPassword('');
        setNewPassword('');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error changing password");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-6 text-center">My Profile</h2>

      <div className="mb-4 text-center">
        {profileImage ? (
          <img
            src={profileImage}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover mx-auto mb-2 border"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-2 flex items-center justify-center text-gray-500">
            No Image
          </div>
        )}
        {editMode && (
          <div className="flex flex-col items-center">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedImage(e.target.files[0])}
              className="mt-2"
            />
            <button
              onClick={async () => {
                if (!selectedImage) return toast.error("No file selected");
                setUploading(true);

                const formData = new FormData();
                formData.append("profileImage", selectedImage);

                try {
                  const res = await axios.put(
                    backendURL + '/api/user/profile/image',
                    formData,
                    {
                      headers: {
                        token,
                        "Content-Type": "multipart/form-data",
                      },
                    }
                  );
                  if (res.data.success) {
                    toast.success("Profile image updated");
                    setProfileImage(res.data.user.profileImage || '');
                    setSelectedImage(null);
                  } else {
                    toast.error(res.data.message);
                  }
                } catch (err) {
                  console.error(err);
                  toast.error("Image upload failed");
                } finally {
                  setUploading(false);
                }
              }}
              className="bg-blue-600 text-white px-3 py-1 rounded mt-2 hover:bg-blue-700 disabled:bg-blue-300"
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Upload Image"}
            </button>
          </div>
        )}
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Name</label>
        <input
          type="text"
          className="w-full border px-3 py-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={!editMode}
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Phone</label>
        <input
          type="text"
          className="w-full border px-3 py-2 rounded"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          disabled={!editMode}
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Email</label>
        <input
          type="email"
          className="w-full border px-3 py-2 rounded bg-gray-100 cursor-not-allowed"
          value={email}
          disabled
        />
      </div>

      <div className="flex justify-between mt-4">
        {!editMode ? (
          <button
            onClick={() => setEditMode(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Edit Profile
          </button>
        ) : (
          <>
            <button
              onClick={updateProfile}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Save
            </button>
            <button
              onClick={() => {
                setEditMode(false);
                fetchProfile();
              }}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          </>
        )}

        <button
          onClick={() => setShowPasswordChange(!showPasswordChange)}
          className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
        >
          {showPasswordChange ? 'Close Password' : 'Change Password'}
        </button>
      </div>

      {showPasswordChange && (
        <div className="mt-6 border-t pt-4">
          <h3 className="text-lg font-semibold mb-3">Change Password</h3>

          <div className="mb-4">
            <label className="block font-medium mb-1">Current Password</label>
            <input
              type="password"
              className="w-full border px-3 py-2 rounded"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">New Password</label>
            <input
              type="password"
              className="w-full border px-3 py-2 rounded"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <button
            onClick={updatePassword}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Update Password
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;