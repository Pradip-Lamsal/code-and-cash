/**
 * Authentication API Service
 * Simple service for login, signup, and profile management
 */

import { STORAGE_KEYS } from "../constants/appConstants.js";

// Backend API URL - matches your backend configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

/**
 * Login API
 * @param {Object} credentials - {email, password}
 * @returns {Promise} - Login response
 */
export const loginAPI = async (credentials) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok || data.status !== "success") {
      throw new Error(data.message || "Login failed");
    }

    // Store token and user data in localStorage (matching your backend response format)
    if (data.token) {
      localStorage.setItem(STORAGE_KEYS.TOKEN, data.token);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data.data.user));
    }

    return { success: true, data: data.data, token: data.token };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * Signup API
 * @param {Object} userData - {name, email, password}
 * @returns {Promise} - Signup response
 */
export const signupAPI = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok || data.status !== "success") {
      throw new Error(data.message || "Signup failed");
    }

    // Store token and user data in localStorage (matching your backend response format)
    if (data.token) {
      localStorage.setItem(STORAGE_KEYS.TOKEN, data.token);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data.data.user));
    }

    return { success: true, data: data.data, token: data.token };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * Profile API
 * @returns {Promise} - Profile data response
 */
export const profileAPI = async () => {
  try {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);

    if (!token) {
      throw new Error("No token found");
    }

    const response = await fetch(`${API_BASE_URL}/api/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok || data.status !== "success") {
      throw new Error(data.message || "Failed to fetch profile");
    }

    return { success: true, data: data.data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * Update Profile API
 * @param {Object} profileData - Profile data to update
 * @returns {Promise} - Update response
 */
export const updateUserProfile = async (profileData) => {
  try {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);

    if (!token) {
      throw new Error("No token found");
    }

    const response = await fetch(`${API_BASE_URL}/api/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(profileData),
    });

    const data = await response.json();

    if (!response.ok || data.status !== "success") {
      throw new Error(data.message || "Failed to update profile");
    }

    // Update user data in localStorage
    if (data.data && data.data.user) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data.data.user));
    }

    return { success: true, data: data.data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * Change Password API
 * @param {string} oldPassword - Current password
 * @param {string} newPassword - New password
 * @returns {Promise} - Change password response
 */
export const changePassword = async (oldPassword, newPassword) => {
  try {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);

    if (!token) {
      throw new Error("No token found");
    }

    const response = await fetch(`${API_BASE_URL}/api/profile/password`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ oldPassword, newPassword }),
    });

    const data = await response.json();

    if (!response.ok || data.status !== "success") {
      throw new Error(data.message || "Failed to change password");
    }

    return { success: true, data: data.data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * Upload Profile Image API
 * @param {FormData} formData - Form data with image file
 * @returns {Promise} - Upload response
 */
export const uploadProfileImage = async (formData) => {
  try {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);

    if (!token) {
      throw new Error("No token found");
    }

    const response = await fetch(`${API_BASE_URL}/api/profile/image`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        // Don't set Content-Type for FormData, let browser set it
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok || data.status !== "success") {
      throw new Error(data.message || "Failed to upload image");
    }

    return {
      success: true,
      data: data.data,
      imageUrl: data.data.profileImageUrl,
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * Helper function to get current user from localStorage
 */
export const getCurrentUser = () => {
  const user = localStorage.getItem(STORAGE_KEYS.USER);
  return user ? JSON.parse(user) : null;
};

/**
 * Helper function to check if user is logged in
 */
export const isLoggedIn = () => {
  return !!localStorage.getItem(STORAGE_KEYS.TOKEN);
};

/**
 * Helper function to logout user
 */
export const logout = () => {
  localStorage.removeItem(STORAGE_KEYS.TOKEN);
  localStorage.removeItem(STORAGE_KEYS.USER);
};

/**
 * Get User Profile API (alias for profileAPI for compatibility)
 * @returns {Promise} - Profile data response
 */
export const getUserProfile = profileAPI;

/**
 * Backward compatibility exports for old function names
 */
export const loginUser = loginAPI;
export const registerUser = signupAPI;
export const signupUser = signupAPI;
