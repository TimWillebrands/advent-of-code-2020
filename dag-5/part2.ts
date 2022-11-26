{
  const ROWS = 128;
  const COLUMNS = 8;

  function getSeat(pass: string) {
    const seat = [...pass].reduce((acc, val) => {
      if (val === "F") acc.rowMax -= (acc.rowMax - acc.rowMin) / 2 + 1 | 0;
      if (val === "B") acc.rowMin += (acc.rowMax - acc.rowMin) / 2 + 1 | 0;
      if (val === "R") acc.colMin += (acc.colMax - acc.colMin) / 2 + 1 | 0;
      if (val === "L") acc.colMax -= (acc.colMax - acc.colMin) / 2 + 1 | 0;

      return acc;
    }, {
      rowMin: 0,
      rowMax: ROWS - 1,
      colMin: 0,
      colMax: COLUMNS - 1,
    });

    if (seat.colMin !== seat.colMax || seat.rowMin !== seat.rowMax) {
      throw `Seat '${pass}' is invalid: '${JSON.stringify(seat)}'`;
    }

    return seat.rowMax * 8 + seat.colMax;
  }

  const inputFull = await Deno.readTextFile(Deno.args[0]);
  const input = inputFull
    .split("\n")
    .filter((line) => line !== "")
    .map((line) => getSeat(line))
    .sort((a, b) => a - b)
    .filter((seat, _, seats) => {
      const a = seats.every((s) => s !== seat - 1);
      const b = seats.every((s) => s !== seat + 1);
      return a || b;
    });
  console.log(input);
}
