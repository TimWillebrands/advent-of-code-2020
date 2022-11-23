{
  const inputFull = await Deno.readTextFile(Deno.args[0]);
  const input = inputFull
    .split("\n")
    .filter((line) => line !== "")
    .map((line) => line.split(" "))
    .map((parts) => {
      const p1 = parts[0].split("-");
      return {
        min: Number(p1[0]),
        max: Number(p1[1]),
        char: parts[1][0],
        password: parts[2],
      };
    })
    .filter((parts) => {
      const count = [...parts.password].reduce(
        (agg, val) => agg + (val === parts.char ? 1 : 0),
        0,
      );

      return count >= parts.min && count <= parts.max;
    });

  console.log(input.length);
}
