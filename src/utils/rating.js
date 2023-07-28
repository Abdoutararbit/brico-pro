// utils.js

export const calculateAverageRating = (ratings) => {
  if (ratings?.length === 0) return 0;

  const totalRating = ratings?.reduce((sum, rating) => sum + rating.value, 0);
  return totalRating / ratings?.length;
};
