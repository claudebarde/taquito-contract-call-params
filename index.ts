import { TezosToolkit } from "@taquito/taquito";
import { InMemorySigner } from "@taquito/signer";
import config from "./config";
import fs from "fs";
import originate from "./originate-contracts";
import test from "./test-contracts";

const args = process.argv.slice(2);
if (Array.isArray(args) && args.length > 0) {
  // setting up the environment
  const Tezos = new TezosToolkit(config.network.flextesa);
  const signer = new InMemorySigner(config.alice.sk);
  Tezos.setSignerProvider(signer);

  switch (args[0]) {
    case "originate":
      originate(Tezos)
        .then(contracts => {
          if (Array.isArray(contracts) && contracts.length > 0) {
            fs.writeFileSync("./contracts.json", JSON.stringify(contracts));
          }
        })
        .catch(err => console.log(err));
      break;
    case "test":
      test(Tezos);
      break;
  }
} else {
  console.log(`Argument must be passed to run the file: "originate" or "test"`);
}
