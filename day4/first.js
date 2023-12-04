const input = await Deno.readTextFile("input", "UTF-8");

const makeNumbers = (x) =>
  x.trim().split(" ").filter(Boolean).map((n) => Number(n.trim()));

const res = input.trim().split("\n")
  .map((line) => {
    if (line.trim().length === 0) return 0;
    const [_, nums] = line.split(":");
    const [winners, numbers] = nums.split("|").map(makeNumbers);

    const repeated = numbers.filter((n) => winners.includes(n));
    const points = repeated.length > 0
      ? new Array(repeated.length - 1).fill(0).reduce((acc) => acc * 2, 1)
      : 0;

    return points;
  })
  .reduce((acc, x) => acc + x, 0);

console.log(res);
