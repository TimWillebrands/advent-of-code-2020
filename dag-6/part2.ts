{
  const inputFull = await Deno.readTextFile(Deno.args[0]);
  const input = inputFull
    .split("\n\n")
    .filter((line) => line !== "")
    .map((group) => ({
      answers: [...group.replaceAll("\n", "")]
        .sort((a, b) => a.localeCompare(b))
        .reduce((acc, answer) => {
          if (!(answer in acc)) acc[answer] = 0;
          acc[answer]++;
          return acc;
        }, {} as Record<string, number>),
      count: group.split("\n").filter((person) => person !== "").length,
      group: group,
    }))
    .map((group) =>
      Object.keys(group.answers)
        .map((answer) => group.answers[answer])
        .filter((answer) => answer === group.count)
    )
    .reduce((acc, val) => acc + val.length, 0);

  console.log(input);
}
