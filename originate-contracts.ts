import { TezosToolkit } from "@taquito/taquito";
import { InMemorySigner } from "@taquito/signer";
import config from "./config";
import fs from "fs";

export default async (): Promise<
  Array<{ contract: string; address: string }>
> => {
  if (!fs.existsSync("./contracts.json")) {
    console.log("Originating the contracts");
    // setting up the environment
    const Tezos = new TezosToolkit(config.network.ghostnet);
    const signer = new InMemorySigner(config.alice.sk);
    Tezos.setSignerProvider(signer);
    // fetching the contract file names
    const fileNames = fs.readdirSync("./test-contracts");
    // fetching the contracts code
    const files = fileNames
      .map(name => ({
        name,
        code: fs.readFileSync(`./test-contracts/${name}`, { encoding: "ascii" })
      }))
      .map(file => ({
        ...file,
        code: file.code.replaceAll("\n", "").replaceAll("  ", "")
      }));
    console.log(files);
    // originating the contracts

    return [];
  } else {
    return Promise.reject("Contracts list already exists");
  }
};
