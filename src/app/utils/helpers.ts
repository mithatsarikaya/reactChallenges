export function delaySomeTime(amountOfTime: number) {
  return new Promise((f) => setTimeout(f, amountOfTime));
}
