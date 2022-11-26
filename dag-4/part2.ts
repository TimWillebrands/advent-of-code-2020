{
  const isHex = /^#[0-9A-F]{6}$/i;
  const fields = {
    "byr": (v: string) => Number(v) >= 1920 && Number(v) <= 2002,
    "iyr": (v: string) => Number(v) >= 2010 && Number(v) <= 2020,
    "eyr": (v: string) => Number(v) >= 2020 && Number(v) <= 2030,
    "hgt": (v: string) => {
      const val = Number(v.slice(0, -2));
      return (v.includes("cm") && val >= 150 && val <= 193) ||
        (v.includes("in") && val >= 59 && val <= 76);
    },
    "hcl": (v: string) => isHex.test(v),
    "ecl": (v: string) =>
      ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(v),
    "pid": (v: string) => v.length === 9,
    "cid": (v: string) => true,
  };

  type Key = keyof typeof fields;

  const len = Object.keys(fields).length;
  const inputFull = await Deno.readTextFile(Deno.args[0]);
  const input = inputFull
    .split("\n\n")
    .filter((line) => line !== "")
    .map((line) =>
      line.split(" ")
        .flatMap((partial) => partial.split("\n"))
        .filter((kvp) => kvp !== "")
        .map((kvp) => kvp.split(":"))
        .map((kvp) => ({ k: kvp[0] as Key, v: kvp[1] }))
    )
    .filter((keys) =>
      keys.length === len ||
      (
        keys.length === len - 1 &&
        keys.findIndex((kvp) => kvp.k === "cid") < 0
      )
    )
    .filter((keys) => keys.every((kvp) => fields[kvp.k](kvp.v)));

  console.log(input.length);
}
