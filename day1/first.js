const input = await Deno.readTextFile("input", "UTF-8");

const res = input.trim().split("\n")
  .map((text) => {
    let first = null;

    for (const char of text) {
      if (!first && !Number.isNaN(Number(char))) {
        first = char;
      }
    }

    let second = null;

    for (const char of text.split("").reverse()) {
      if (!second && !Number.isNaN(Number(char))) {
        second = char;
      }
    }

    return Number(`${first}${second}`);
  })
  .reduce((acc, n) => acc + n, 0);

console.log(res);
