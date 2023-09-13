import app from "./app";
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`🚀 Server started on port ${port}!`);
  console.log(
    `📚 balances on: http://localhost:${port}/historical-Balances`,
  );
});
