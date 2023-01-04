import originate from "./originate-contracts";
import test from "./test-contracts";

const args = process.argv.slice(2);
if (Array.isArray(args) && args.length > 0) {
  switch (args[0]) {
    case "originate":
      originate();
      break;
    case "test":
      test();
      break;
  }
} else {
  console.log(`Argument must be passed to run the file: "originate" or "test"`);
}
