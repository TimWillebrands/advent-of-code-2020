{
  type V2 = { x: number; y: number };

  const inputFull = await Deno.readTextFile(Deno.args[0]);
  const input = inputFull
    .split("\n")
    .filter((line) => line !== "")
    .map((line) =>
      [...line]
        .map((char) => char === "#" ? 1 : 0)
    );

  const width = input[0].length;

  const getPos = (pos: V2, move: V2, treeCount: number): number => {
    const newY = pos.y + move.y;

    // If we're (about to go) out of bounds on the vert axis we
    // can return our result
    if (newY >= input.length) return treeCount;

    const newX = (pos.x + move.x) % width;
    const newPos = input[newY][newX];
    return getPos({ x: newX, y: newY }, move, treeCount + newPos);
  };

  const r1 = getPos({ x: 0, y: 0 }, { x: 1, y: 1 }, 0);
  const r2 = getPos({ x: 0, y: 0 }, { x: 3, y: 1 }, 0);
  const r3 = getPos({ x: 0, y: 0 }, { x: 5, y: 1 }, 0);
  const r4 = getPos({ x: 0, y: 0 }, { x: 7, y: 1 }, 0);
  const r5 = getPos({ x: 0, y: 0 }, { x: 1, y: 2 }, 0);

  console.log(r1, r2, r3, r4, r5, r1 * r2 * r3 * r4 * r5);
}
