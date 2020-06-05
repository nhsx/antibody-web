type LoginResponse = { successful: boolean; token: any };

export default () => (userID: string): Promise<LoginResponse> => {

  return new Promise((resolve, reject) => {  
    setTimeout(() => {
      if (userID.startsWith("valid")) {
        // Sign in with valid123 or valid345 etc to create a new user for a fresh flow. Default to valid0.
        const id = userID.split("valid")[1] || "0";
        return resolve({ successful: true, token: `TEMP_ALLOW_${id}` });
      }
      return reject({ successful: false });
    }, 500);
  });
};
