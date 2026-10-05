import type { User } from "../types/hotel";

interface LoginResponse {
  user: User;
  token: string;
}

const demoUsers = [
  {
    id: 1,
    name: "Denzil",
    email: "user@gmail.com",
    password: "123456"
  },
  {
    id: 2,
    name: "Hotel Guest",
    email: "guest@gmail.com",
    password: "123456"
  }
];

export const loginUser = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  await new Promise((resolve) =>
    setTimeout(resolve, 800)
  );

  const foundUser = demoUsers.find(
    (user) =>
      user.email === email &&
      user.password === password
  );

  if (!foundUser) {
    throw new Error(
      "Invalid email or password"
    );
  }

  const user: User = {
    id: foundUser.id,
    name: foundUser.name,
    email: foundUser.email
  };

  const token =
    `hotel-demo-token-${foundUser.id}-${Date.now()}`;

  return {
    user,
    token
  };
};