export function getClassAsset(character: String) {
  const classes = {
    "priest": "./gameassests/priest.png",
    "knight": "./gameassests/knight.png",
    "assassin": "./gameassests/assassin.png",
    "fire-mage": "./gameassests/fire-mage.png",
    "mage": "./gameassests/mage.png",
    "ranger": "./gameassests/ranger.png"
  };
  // @ts-ignore
  return classes[character];
}
