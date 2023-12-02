const input = await Deno.readTextFile("input", "UTF-8");

const max = {
  "red": 12,
  "green": 13,
  "blue": 14,
};

const res = input.trim().split("\n")
  .map((game) => {
    let data = game.split(":");
    let gameId = data[0].split(" ")[1];
    let sets = data[1].split(";");

    let anyWrong = sets.some((set) => {
      const cubes = set.split(",");
      return cubes.some((cube) => {
        const [number, color] = cube.trim().split(" ");
        const maxByColor = max[color];
        return Number(number) > maxByColor;
      });
    });

    return anyWrong ? 0 : Number(gameId);
  })
  .reduce((acc, n) => acc + n, 0);

console.log(res);
