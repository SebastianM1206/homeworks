import React from "react";
import user from "../utils/user";

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center w-full max-w-lg">
        <img
          src={user.profileImage}
          alt="Profile"
          className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-md"
        />
        <h2 className="text-2xl font-semibold text-gray-800 mt-4">
          {user.name}
        </h2>
        <p className="text-gray-600">@{user.username}</p>
        <p className="text-center text-gray-600 mt-2">{user.bio}</p>
        <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
          Editar Perfil
        </button>
      </div>

      <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
        Mis publicaciones
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {user.posts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105"
          >
            <img
              src={post.image}
              alt="Post"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <p className="text-gray-600">{post.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
