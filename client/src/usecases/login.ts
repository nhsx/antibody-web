type LoginResponse = { successful: boolean };

export default () => (userID: string): LoginResponse => {
  if (userID === "valid") {
    return { successful: true };
  }

  return { successful: false };
};
