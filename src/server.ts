import app from "./app";

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server started on port ${process.env.PORT}!`);
  console.log(
    `📚 API docs are available on: http://localhost:${process.env.PORT}/api-docs`,
  );
});
