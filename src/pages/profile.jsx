import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  changePassword,
  getUserProfile,
  updateUserProfile,
  uploadProfileImage,
} from "../api/authService.jsx";
import { ScrollReveal, ScrollRevealGroup } from "../components/ScrollAnimation";

/**
 * Profile Page Component
 *
 * This component handles all aspects of user profile management:
 * - Loading profile data from the backend
 * - Updating user information
 * - Changing password
 * - Uploading profile picture
 * - WhatsApp integration
 */
const Profile = () => {
  // UI state
  const [profileImage, setProfileImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Form data state with default empty values
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    workExperience: "",
    skill: "",
    email: "",
    website: "",
    phone: "",
    usesWhatsApp: false,
    bio: "",
    oldPassword: "",
    newPassword: "",
  });

  // Fetch profile data when component mounts
  useEffect(() => {
    // Function to fetch profile data from the API
    const fetchProfileData = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await getUserProfile();

        if (error) {
          setErrorMessage("Could not load profile. Please try again later.");
          return;
        }

        if (data && data.user) {
          // Update form data with user profile data
          const userData = data.user;

          setFormData({
            username: userData.username || "",
            firstName: userData.firstName || "",
            lastName: userData.lastName || "",
            workExperience: userData.workExperience || "",
            skill: userData.skill || "",
            email: userData.email || "",
            website: userData.website || "",
            phone: userData.phone || "",
            usesWhatsApp: userData.usesWhatsApp || false,
            bio: userData.bio || "",
            oldPassword: "",
            newPassword: "",
          });

          // Set profile image URL if it exists
          if (userData.profileImageUrl) {
            setProfileImage(userData.profileImageUrl);
          }
        }
      } catch (error) {
        console.error("Error loading profile:", error);
        setErrorMessage("Could not load profile. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage("Image size should be less than 5MB");
        return;
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        setErrorMessage("Please select a valid image file");
        return;
      }

      try {
        setIsSubmitting(true);
        setErrorMessage("");

        // Create FormData for file upload
        const formData = new FormData();
        formData.append("profileImage", file);

        // Upload image to server
        const result = await uploadProfileImage(formData);

        if (result.success) {
          // Update profile image with the returned URL
          setProfileImage(result.imageUrl);
          setSuccessMessage("Profile picture updated successfully!");
        } else {
          setErrorMessage(result.error || "Failed to upload profile picture");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        setErrorMessage("Failed to upload profile picture");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  /**
   * Handles form input changes
   * @param {Object} e - Event object
   */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Special handling for website field (handled separately in its own onChange)
    if (name === "website") {
      return;
    }

    // Handle checkbox inputs differently than text inputs
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
      return;
    }

    // Handle regular text inputs
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      // Generate username from first and last name if both are provided
      const generatedUsername =
        `${formData.firstName} ${formData.lastName}`.trim();

      // Prepare data for submission
      const profileData = {
        // Only update username if we have both first and last name, otherwise keep existing
        username: generatedUsername || formData.username,
        firstName: formData.firstName,
        lastName: formData.lastName,
        workExperience: formData.workExperience,
        skill: formData.skill,
        email: formData.email,
        website: formData.website.startsWith("http")
          ? formData.website
          : `https://${formData.website}`,
        phone: formData.phone,
        usesWhatsApp: formData.usesWhatsApp,
        bio: formData.bio,
      };

      // Send data to API
      const { data, error } = await updateUserProfile(profileData);

      if (error) {
        setErrorMessage(error || "Failed to update profile");
        return;
      }

      if (data) {
        setSuccessMessage("Profile updated successfully!");

        // Update form data with the returned user data to ensure consistency
        if (data.user) {
          setFormData((prev) => ({
            ...prev,
            ...data.user,
            oldPassword: "",
            newPassword: "",
          }));
        }
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);

      // Clear success message after 3 seconds
      if (successMessage) {
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      }
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      // Make sure both passwords are provided
      if (!formData.oldPassword || !formData.newPassword) {
        setErrorMessage("Both old and new passwords are required");
        setIsSubmitting(false);
        return;
      }

      // Call API to change password
      const result = await changePassword(
        formData.oldPassword,
        formData.newPassword
      );

      if (result.success) {
        setSuccessMessage("Password changed successfully!");
        // Clear password fields
        setFormData((prev) => ({
          ...prev,
          oldPassword: "",
          newPassword: "",
        }));
      } else {
        setErrorMessage(result.error || "Failed to change password");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);

      // Clear success message after 3 seconds
      if (successMessage) {
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      }
    }
  };

  // Loading state content
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-indigo-950 sm:px-6 lg:px-8">
        <div className="text-center">
          <svg
            className="w-12 h-12 mx-auto text-indigo-400 animate-spin"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p className="mt-4 text-lg font-medium text-slate-300">
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

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
                {/* Error and success messages */}
                {errorMessage && (
                  <p className="text-sm text-red-400">{errorMessage}</p>
                )}
                {successMessage && (
                  <p className="text-sm text-green-400">{successMessage}</p>
                )}
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
                      Personal Information
                    </h3>
                    <p className="mb-4 text-sm text-slate-400">
                      Your basic account information. Your display name will be
                      updated when you add both first and last names.
                    </p>{" "}
                    <div>
                      <label className="block text-sm font-medium text-slate-300">
                        Display Name
                      </label>
                      <input
                        type="text"
                        name="username"
                        value={
                          `${formData.firstName} ${formData.lastName}`.trim() ||
                          formData.username
                        }
                        disabled
                        className="block w-full mt-1 rounded-md shadow-sm opacity-75 cursor-not-allowed bg-indigo-800/50 border-slate-600 focus:border-indigo-500 focus:ring-indigo-500 text-slate-50"
                      />
                      <p className="mt-1 text-xs text-slate-400">
                        {`${formData.firstName} ${formData.lastName}`.trim()
                          ? "Display name is generated from your first and last name"
                          : "Add your first and last name to update your display name"}
                      </p>
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
                  </div>

                  {/* Professional Information */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-slate-50">
                      Professional Info
                    </h3>
                    <p className="mb-4 text-sm text-slate-400">
                      Details about your skills and experience
                    </p>
                    <div>
                      <label className="block text-sm font-medium text-slate-300">
                        Skills
                      </label>
                      <input
                        type="text"
                        name="skill"
                        value={formData.skill}
                        onChange={handleChange}
                        placeholder="React, JavaScript, Node.js, etc."
                        className="block w-full mt-1 rounded-md shadow-sm bg-indigo-800/50 border-slate-600 focus:border-indigo-500 focus:ring-indigo-500 text-slate-50"
                      />
                      <p className="mt-1 text-xs text-slate-400">
                        Separate multiple skills with commas
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300">
                        Work Experience
                      </label>
                      <select
                        name="workExperience"
                        value={formData.workExperience}
                        onChange={handleChange}
                        className="block w-full mt-1 rounded-md shadow-sm bg-indigo-800/50 border-slate-600 focus:border-indigo-500 focus:ring-indigo-500 text-slate-50"
                      >
                        <option value="< 1 year">Less than 1 year</option>
                        <option value="1-2 years">1-2 years</option>
                        <option value="3-5 years">3-5 years</option>
                        <option value="5-10 years">5-10 years</option>
                        <option value="10+ years">10+ years</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300">
                        Portfolio Website
                      </label>
                      <div className="flex items-center mt-1 rounded-md shadow-sm bg-indigo-800/50 border-slate-600 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
                        <span className="pl-3 text-slate-400">https://</span>
                        <input
                          type="text"
                          name="website"
                          value={formData.website.replace(/^https?:\/\//, "")}
                          onChange={(e) => {
                            const value = e.target.value.replace(
                              /^https?:\/\//,
                              ""
                            );
                            setFormData((prev) => ({
                              ...prev,
                              website: value,
                            }));
                          }}
                          placeholder="myportfolio.com"
                          className="block w-full py-2 pl-0 bg-transparent border-0 focus:ring-0 text-slate-50"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300">
                        Phone Number
                      </label>
                      {/* Phone input with integrated WhatsApp option */}
                      <div className="space-y-2">
                        {/* Phone input field */}
                        <div className="relative">
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+1 (123) 456-7890"
                            className="block w-full pl-4 pr-12 mt-1 rounded-md shadow-sm bg-indigo-800/50 border-slate-600 focus:border-indigo-500 focus:ring-indigo-500 text-slate-50"
                          />
                          {/* WhatsApp toggle button - positioned inside the input */}
                          <button
                            type="button"
                            onClick={() => {
                              // Toggle usesWhatsApp state
                              setFormData((prev) => ({
                                ...prev,
                                usesWhatsApp: !prev.usesWhatsApp,
                              }));
                            }}
                            className={`absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full transition-colors ${
                              formData.usesWhatsApp
                                ? "bg-green-600 text-white"
                                : "bg-slate-700 text-slate-400"
                            }`}
                            title={
                              formData.usesWhatsApp
                                ? "WhatsApp enabled"
                                : "Enable WhatsApp"
                            }
                          >
                            <svg
                              className="w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                            </svg>
                          </button>
                        </div>

                        {/* WhatsApp status and contact link */}
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-400">
                            {formData.usesWhatsApp
                              ? "WhatsApp enabled for this number"
                              : "Include country code for international contacts"}
                          </span>

                          {/* WhatsApp contact link - only shows when enabled */}
                          {formData.usesWhatsApp && (
                            <motion.a
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              href={`https://wa.me/${formData.phone.replace(
                                /[^0-9]/g,
                                ""
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-2 py-1 text-xs font-medium transition-colors bg-green-600 rounded text-green-50 hover:bg-green-700"
                            >
                              Test WhatsApp Link
                            </motion.a>
                          )}
                        </div>
                      </div>
                      <p className="mt-1 text-xs text-slate-400">
                        Include country code for international contacts
                      </p>
                    </div>
                  </div>
                </ScrollRevealGroup>

                {/* About Section */}
                <ScrollReveal>
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-50">Bio</h3>
                    <p className="mb-4 text-sm text-slate-400">
                      Tell potential collaborators about yourself
                    </p>
                    <div>
                      <label className="block text-sm font-medium text-slate-300">
                        About yourself
                      </label>
                      <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        rows={4}
                        maxLength={500}
                        className="block w-full mt-1 rounded-md shadow-sm bg-indigo-800/50 border-slate-600 focus:border-indigo-500 focus:ring-indigo-500 text-slate-50"
                        placeholder="Briefly describe your professional background and interests..."
                      />
                      <div className="flex justify-end mt-1">
                        <span className="text-xs text-slate-400">
                          {formData.bio.length}/500 characters
                        </span>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>

                {/* Submit Button */}
                <ScrollReveal>
                  <div className="flex flex-col items-end">
                    {successMessage && (
                      <p className="mb-2 text-sm text-green-400">
                        {successMessage}
                      </p>
                    )}
                    {errorMessage && (
                      <p className="mb-2 text-sm text-red-400">
                        {errorMessage}
                      </p>
                    )}
                    <motion.button
                      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                      type="submit"
                      disabled={isSubmitting}
                      className={`px-6 py-2 transition-colors rounded-md shadow-lg text-slate-50 shadow-indigo-600/20 ${
                        isSubmitting
                          ? "bg-indigo-700 cursor-not-allowed"
                          : "bg-indigo-600 hover:bg-indigo-500"
                      }`}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <svg
                            className="w-5 h-5 mr-2 animate-spin"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Saving...
                        </span>
                      ) : (
                        "Save Changes"
                      )}
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
