import bcrypt from "bcryptjs";

/**
 * Salts and hashes a password using bcrypt.
 *
 * @param {string} password - The plain text password to hash.
 * @param {number} saltRounds - The number of salt rounds to use (default is 10).
 * @returns {Promise<string>} A promise that resolves with the hashed password.
 * @throws {Error} If there's an error during the hashing process.
 */
export async function saltAndHashPassword(
  password: string,
  saltRounds: number = 10,
): Promise<string> {
  try {
    // Generate a salt and hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw new Error("Failed to hash password");
  }
}

export async function validatePassword(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  try {
    const isMatching = await bcrypt.compare(password, hashedPassword);
    return isMatching;
  } catch (error) {
    console.error("Error validating password:", error);
    throw new Error("Failed to validate password");
  }
}
