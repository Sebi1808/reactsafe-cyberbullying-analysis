import { createApp } from "./app";
import { log } from "./vite";

(async () => {
  const { server } = await createApp();

  const port = Number(process.env.PORT ?? 5000);
  server.listen(
    {
      port,
      host: "0.0.0.0",
      reusePort: true,
    },
    () => {
      log(`serving on port ${port}`);
    },
  );
})();
