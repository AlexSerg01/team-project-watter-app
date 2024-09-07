export const getUserLogoInfo = (userData) => {
  if (!userData) return { avatar: null, userName: '', initial: '' };

  const userName = userData?.name || userData?.email || '';

  if (userData.photo) {
    return { avatar: userData.photo, userName, initial: '' };
  }
  const initial = userName?.charAt(0).toUpperCase() || '';

  return { avatar: null, userName, initial };
};