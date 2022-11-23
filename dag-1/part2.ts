{
  const inputFull = await Deno.readTextFile(Deno.args[0]);
  const input = inputFull
    .split("\n")
    .filter((line) => line !== "")
    .map((line) => Number(line));

  function combine(numbers: number[]): number[][] {
    if (numbers.length === 0) return [];
    const a = numbers.shift() as number;
    const pairs = numbers.map((number) => [a, number]);
    return pairs.concat(combine(numbers));
  }

  function combine3(numbers: number[]): number[][] {
    if (numbers.length === 0) return [];
    const a = numbers.shift() as number;
    const combinations = combine([...numbers]);
    const triple = combinations.map((pair) => [a, ...pair]);

    return triple.concat(combine3(numbers));
  }

  const correctSum = combine3(input)
    .find(([a, b, c]) => a + b + c === 2020);

  console.log(correctSum, correctSum?.reduce((curr, prev) => curr * prev));
}
