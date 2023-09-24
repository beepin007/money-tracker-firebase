export const useGetUserInfo = () => {
  const { name, profilePhoto, UserID, isAuth } = JSON.parse(
    localStorage.getItem("auth")
  );

  return { name, profilePhoto, UserID, isAuth };
};
