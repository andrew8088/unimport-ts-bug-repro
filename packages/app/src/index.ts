export default function todo() {
  const x = deferred<string>();

  setTimeout(() => {
    x.resolve("Hello, World!");
  }, 1000);

  return x.promise;
}
