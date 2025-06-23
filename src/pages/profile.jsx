import { motion } from "framer-motion";
import { useState } from "react";
import { ScrollReveal, ScrollRevealGroup } from "../components/ScrollAnimation";

const Profile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [formData, setFormData] = useState({
    username: "gene.rodrig",
    firstName: "Gene",
    lastName: "Rodriguez",
    nickname: "Gene.r",
    skill: "Gene.r",
    displayName: "Gene",
    email: "gene.rodrig@gmail.com",
    whatsapp: "@gene-rod",
    website: "gene-roding.webflow.io",
    telegram: "@gene-rod",
    bio: "",
    oldPassword: "",
    newPassword: "",
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setProfileImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    // Handle password change
    console.log({
      oldPassword: formData.oldPassword,
      newPassword: formData.newPassword,
    });
  };

  return (
    <div className="min-h-screen px-4 py-12 bg-indigo-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="text-3xl font-bold text-slate-50">Profile Settings</h1>
          <p className="mt-2 text-sm text-slate-300">
            Manage your account settings and preferences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Account Management Section */}
          <ScrollReveal className="lg:col-span-1">
            <div className="p-6 space-y-6 bg-indigo-900 shadow-lg backdrop-blur-sm rounded-xl shadow-indigo-900/50">
              <h2 className="mb-6 text-xl font-semibold text-slate-50">
                Account Management
              </h2>

              {/* Profile Picture */}
              <div className="text-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative inline-block"
                >
                  <div className="w-32 h-32 mx-auto mb-4 overflow-hidden bg-indigo-800 rounded-full">
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt="Profile"
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full text-slate-400">
                        <svg
                          className="w-16 h-16"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                  <label
                    htmlFor="profile-upload"
                    className="absolute bottom-0 right-0 p-2 transition-colors bg-indigo-600 rounded-full shadow-lg cursor-pointer hover:bg-indigo-500"
                  >
                    <svg
                      className="w-4 h-4 text-slate-50"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </label>
                  <input
                    id="profile-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </motion.div>
              </div>

              {/* Password Change Form */}
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300">
                    Old Password
                  </label>
                  <input
                    type="password"
                    name="oldPassword"
                    value={formData.oldPassword}
                    onChange={handleChange}
                    className="block w-full mt-1 rounded-md shadow-sm bg-indigo-800/50 border-slate-600 focus:border-indigo-500 focus:ring-indigo-500 text-slate-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300">
                    New Password
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="block w-full mt-1 rounded-md shadow-sm bg-indigo-800/50 border-slate-600 focus:border-indigo-500 focus:ring-indigo-500 text-slate-50"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full px-4 py-2 transition-colors bg-indigo-600 rounded-md shadow-lg hover:bg-indigo-500 text-slate-50 shadow-indigo-600/20"
                >
                  Change Password
                </motion.button>
              </form>
            </div>
          </ScrollReveal>

          {/* Main Profile Form */}
          <ScrollReveal className="lg:col-span-2">
            <div className="p-6 bg-indigo-900 shadow-lg backdrop-blur-sm rounded-xl shadow-indigo-900/50">
              <form onSubmit={handleSubmit} className="space-y-6">
                <ScrollRevealGroup className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {/* Profile Information */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-slate-50">
                      Profile Information
                    </h3>
                    <div>
                      <label className="block text-sm font-medium text-slate-300">
                        Username
                      </label>
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="block w-full mt-1 rounded-md shadow-sm bg-indigo-800/50 border-slate-600 focus:border-indigo-500 focus:ring-indigo-500 text-slate-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="block w-full mt-1 rounded-md shadow-sm bg-indigo-800/50 border-slate-600 focus:border-indigo-500 focus:ring-indigo-500 text-slate-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="block w-full mt-1 rounded-md shadow-sm bg-indigo-800/50 border-slate-600 focus:border-indigo-500 focus:ring-indigo-500 text-slate-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300">
                        Nickname
                      </label>
                      <input
                        type="text"
                        name="nickname"
                        value={formData.nickname}
                        onChange={handleChange}
                        className="block w-full mt-1 rounded-md shadow-sm bg-indigo-800/50 border-slate-600 focus:border-indigo-500 focus:ring-indigo-500 text-slate-50"
                      />
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-slate-50">
                      Contact Info
                    </h3>
                    <div>
                      <label className="block text-sm font-medium text-slate-300">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="block w-full mt-1 rounded-md shadow-sm bg-indigo-800/50 border-slate-600 focus:border-indigo-500 focus:ring-indigo-500 text-slate-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300">
                        WhatsApp
                      </label>
                      <input
                        type="text"
                        name="whatsapp"
                        value={formData.whatsapp}
                        onChange={handleChange}
                        className="block w-full mt-1 rounded-md shadow-sm bg-indigo-800/50 border-slate-600 focus:border-indigo-500 focus:ring-indigo-500 text-slate-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300">
                        Website
                      </label>
                      <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        className="block w-full mt-1 rounded-md shadow-sm bg-indigo-800/50 border-slate-600 focus:border-indigo-500 focus:ring-indigo-500 text-slate-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300">
                        Telegram
                      </label>
                      <input
                        type="text"
                        name="telegram"
                        value={formData.telegram}
                        onChange={handleChange}
                        className="block w-full mt-1 rounded-md shadow-sm bg-indigo-800/50 border-slate-600 focus:border-indigo-500 focus:ring-indigo-500 text-slate-50"
                      />
                    </div>
                  </div>
                </ScrollRevealGroup>

                {/* About Section */}
                <ScrollReveal>
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-50">
                      About the User
                    </h3>
                    <div>
                      <label className="block text-sm font-medium text-slate-300">
                        Biographical Info
                      </label>
                      <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        rows={4}
                        className="block w-full mt-1 rounded-md shadow-sm bg-indigo-800/50 border-slate-600 focus:border-indigo-500 focus:ring-indigo-500 text-slate-50"
                        placeholder="Tell us about yourself..."
                      />
                    </div>
                  </div>
                </ScrollReveal>

                {/* Submit Button */}
                <ScrollReveal>
                  <div className="flex justify-end">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="px-6 py-2 transition-colors bg-indigo-600 rounded-md shadow-lg text-slate-50 hover:bg-indigo-500 shadow-indigo-600/20"
                    >
                      Save Changes
                    </motion.button>
                  </div>
                </ScrollReveal>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
};

export default Profile;
