function flipCard(cardNumber) {
  const container =
    document.getElementsByClassName("container")[cardNumber - 1];
  container.classList.toggle("flipped");
}
