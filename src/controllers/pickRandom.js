const pickRandom = (array, quantity) => {
  console.log("pickRandom en ejecucion.");

  if (quantity <= 0) {
    return "quantity debe ser mayor a 0";
  }

  const shuffledArray = array.slice().sort(() => Math.random() - 0.5); // Mezcla el array

  const selectedElements = shuffledArray.slice(0, quantity);

  return selectedElements.join(", ");
};

module.exports = pickRandom;
