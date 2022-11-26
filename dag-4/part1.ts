{
  const fields = [
    "byr",
    "iyr",
    "eyr",
    "hgt",
    "hcl",
    "ecl",
    "pid",
    "cid",
  ];

  const inputFull = await Deno.readTextFile(Deno.args[0]);
  const input = inputFull
    .split("\n\n")
    .filter((line) => line !== "")
    .map((line) =>
      line.split(" ")
        .flatMap((partial) => partial.split("\n"))
        .filter((kvp) => kvp !== "")
        .map((kvp) => kvp.split(":"))
        .map((kvp) => ({ k: kvp[0], v: kvp[1] }))
    ).filter((keys) =>
      keys.length === fields.length ||
      (
        keys.length === fields.length - 1 &&
        keys.findIndex((kvp) => kvp.k === "cid") < 0
      )
    );

  console.log(input.length);
}
