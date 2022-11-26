{
  const inputFull = await Deno.readTextFile(Deno.args[0]);
  const input = inputFull
    .split("\n\n")
    .filter((line) => line !== "")
    .map((group) => group.replaceAll("\n", ""))
    .map((group) => new Set([...group]))
    .reduce((acc, group) => acc + group.size, 0);

  console.log(input);
}
