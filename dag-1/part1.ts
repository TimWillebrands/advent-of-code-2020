const inputFull = await Deno.readTextFile(Deno.args[0]);
const input = inputFull
  .split("\n")
  .filter((line) => line !== "")
  .map((line) => Number(line));

for (let i = 0; i < input.length; ++i) {
  const a = input[i];
  for (let j = i; j < input.length; ++j) {
    const b = input[j];

    if (a + b === 2020) {
      console.log(a, b, a * b);
      Deno.exit();
    }
  }
}
