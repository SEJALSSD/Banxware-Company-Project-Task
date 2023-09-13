import app from "./app";
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`🚀 Server started on port ${port}!`);
  console.log(
    `📚 Can access work on: http://localhost:${port}/historical-Balances`,
  );
});
//http://localhost:3000/historical-balances?from=2022-01-03&to=2022-01-05&sort=desc use this for seeing results