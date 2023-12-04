const input = await Deno.readTextFile("input", "UTF-8");

const makeNumbers = (x) =>
  x.trim().split(" ").filter(Boolean).map((n) => Number(n.trim()));

const points = {};

input.trim().split("\n")
  .forEach((line) => {
    if (line.trim().length === 0) return 0;
    const [data, nums] = line.split(":");
    const cardNumber = Number(data.split(" ").filter(Boolean)[1]);
    const [winners, numbers] = nums.split("|").map(makeNumbers);

    const repeated = numbers.filter((n) => winners.includes(n));
    const newCards = new Array(repeated.length)
      .fill(0)
      .map((_, i) => i + cardNumber + 1);

    if (points[cardNumber]) {
      points[cardNumber] += 1;
    } else {
      points[cardNumber] = 1;
    }
    for (let i = 0; i < points[cardNumber]; i++) {
      for (const newCard of newCards) {
        if (points[newCard]) {
          points[newCard] += 1;
        } else {
          points[newCard] = 1;
        }
      }
    }
  });

const res = Object.values(points).reduce((acc, x) => acc + x, 0);

console.log(res);
