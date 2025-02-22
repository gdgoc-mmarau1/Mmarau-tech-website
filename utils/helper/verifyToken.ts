import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-default-secret';

export function verifyToken(token: string | undefined) {
  if (!token) return null;
  try {
    // Verify the token. If it's valid, jwt.verify returns the decoded payload.
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    // If verification fails (e.g. token expired or invalid), return null.
    return null;
  }
}
