type LoginResponse = { successful: boolean; user: any };

export default () => (userID: string): Promise<LoginResponse> => {

  return new Promise((resolve, reject) => {
    console.log(userID);
    setTimeout(() => {
      if (userID === "valid") {
        return resolve({ successful: true, user: {
          name: "Test Testerson"
        } });
      }
      return reject({ successful: false });
    }, 500);
  });
};
