import React from "react";

const Profile = () => {
  return (
    <div className="p-5 font-sans">
      <h1 className="text-3xl font-bold mb-4">Profile Page</h1>
      <p className="text-lg mb-6">Welcome to your profile page!</p>
      <div>
        <h2 className="text-2xl font-semibold mb-3">User Information</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Name:</strong> John Calvo
          </li>
          <li>
            <strong>Email:</strong> john.doe@example.com
          </li>
          <li>
            <strong>Joined:</strong> January 1, 2023
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Profile;
