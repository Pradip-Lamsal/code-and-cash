/**
 * This is a temporary utility script to make a user an admin
 * Run this in your browser console to set your current user as an admin
 */

function makeCurrentUserAdmin() {
  // Get current user from localStorage
  const userStr = localStorage.getItem("user");
  if (!userStr) {
    console.error("No user found in localStorage");
    return false;
  }

  try {
    // Parse user object
    const user = JSON.parse(userStr);

    // Set admin role
    user.role = "admin";

    // Save back to localStorage
    localStorage.setItem("user", JSON.stringify(user));

    console.log("✅ Success! User updated with admin role:", user);
    console.log("Please refresh the page to see changes");

    return true;
  } catch (error) {
    console.error("Error updating user:", error);
    return false;
  }
}

// Execute the function
makeCurrentUserAdmin();
