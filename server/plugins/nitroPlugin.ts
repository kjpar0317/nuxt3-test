import type { NitroApp } from "nitropack/types";

export default defineNitroPlugin((nitro: NitroApp) => {
  //   nitro.hooks.hook("request", (event) => {
  //     console.log("on request", event.path);
  //   });
  //   nitro.hooks.hook("beforeResponse", (event, { body }) => {
  //     console.log("on response", event.path, { body });
  //   });
  //   nitro.hooks.hook("afterResponse", (event, { body }: any) => {
  //     console.log("on after response", event.path, { body });
  //   });
  //   nitro.hooks.hook("render:response", (response, { event }) => {
  //     // Inspect or Modify the renderer response here
  //     console.log(response);
  //   });
  nitro.hooks.hookOnce("close", async () => {
    // Will run when nitro is closed
    console.log("Closing nitro server...");
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log("Task is done!");
  });
});
