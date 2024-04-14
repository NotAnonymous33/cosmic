import React, { useState, useEffect } from "react";
import axios from "axios";

function Profile() {
  const [profile, setProfile] = useState(null);

  const fetchProfile = async () => {
    //localhost:9191/students/student/id
    try {
      const response = await axios.get("/students/student/id");
      setProfile(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return profile ? (
    <div className="profile-container">
      {}
      {profile.profileImage && (
        <img
          className="profile-image"
          src={profile.profileImage}
          alt="profile"
        />
      )}
      <h2 className="profile-name">{profile.name}</h2>
      <p className="profile-email">{profile.username}</p>
      <progress value={profile.progress} max="100"></progress>
    </div>
  ) : (
    <div>Loading...</div>
  );
}

export default Profile;
