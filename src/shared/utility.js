export const updateObject = (oldObj, updatedProps) => {
  return {
    ...oldObj,
    ...updatedProps
  }
}

export const checkBounds = (currValue, maxValue, changeAmt) => {
  const newValue = currValue + changeAmt
  return newValue > maxValue ? maxValue : newValue < 0 ? 0 : newValue
}
