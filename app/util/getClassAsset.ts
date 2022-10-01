export function getClassAsset(charcter: String) {
  const classes = {
    "priest": "./gameassests/priest.png",
    "knight": "./gameassests/knight.png",
    "assassian": "./gameassests/assassian.png",
    "fire-mage": "./gameassests/fire-mage.png",
    "mage": "./gameassests/mage.png",
    "ranger": "./gameassests/ranger.png"
  };
  // @ts-ignore
  return classes[charcter];
}
