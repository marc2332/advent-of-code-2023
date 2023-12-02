const input = await Deno.readTextFile("input", "UTF-8");

const res = input.trim().split("\n")
  .map((game) => {
    let data = game.split(":");
    let sets = data[1].split(";");

    const numCubes = {
      "red": 0,
      "blue": 0,
      "green": 0,
    };

    sets.forEach((set) => {
      const cubes = set.split(",");
      cubes.forEach((cube) => {
        const [number, color] = cube.trim().split(" ");
        const maxByColor = numCubes[color];
        if (Number(number) > maxByColor) {
          numCubes[color] = Number(number);
        }
      });
    });

    return numCubes.green * numCubes.red * numCubes.blue;
  })
  .reduce((acc, n) => acc + n, 0);

console.log(res);
