export const increaseQuantity = (
  quantity: number,
  setQuantity: React.Dispatch<React.SetStateAction<number>>
) => {
  setQuantity((prev) => (prev += 1));
};
export const decreaseQuantity = (
  quantity: number,
  setQuantity: React.Dispatch<React.SetStateAction<number>>
) => {
  quantity === 1 ? setQuantity(1) : setQuantity((prev) => (prev -= 1));
};
