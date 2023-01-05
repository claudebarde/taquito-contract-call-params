import { TezosToolkit, OpKind } from "@taquito/taquito";
import { InMemorySigner } from "@taquito/signer";
import config from "./config";
import fs from "fs";

interface OriginResult {
  name: string;
  address: string;
}

export default async (): Promise<Array<OriginResult>> => {
  if (!fs.existsSync("./contracts.json")) {
    console.log("Originating the contracts");
    // setting up the environment
    const Tezos = new TezosToolkit(config.network.flextesa);
    const signer = new InMemorySigner(config.alice.sk);
    Tezos.setSignerProvider(signer);
    try {
      // fetching the contract file names
      const fileNames = fs.readdirSync("./test-contracts");
      // fetching the contracts code
      const files = fileNames.map(name => ({
        name,
        code: fs
          .readFileSync(`./test-contracts/${name}`, { encoding: "ascii" })
          .toString()
          .replace(/\n/g, "")
          .replace(/\s\s+/g, " ")
      }));
      // originating the contracts
      const initialStorage = "taquito";
      const batch = await Tezos.contract.batch(
        files.map(f => ({
          kind: OpKind.ORIGINATION,
          balance: 0,
          code: f.code,
          storage: initialStorage
        }))
      );
      const batchOp = await batch.send();
      await batchOp.confirmation();

      const originatedContractAddresses =
        batchOp.getOriginatedContractAddresses();
      if (originatedContractAddresses.length === files.length) {
        return batchOp.getOriginatedContractAddresses().map((addr, index) => ({
          name: files[index].name,
          address: addr
        }));
      } else {
        return Promise.reject(
          "Length of array for originated contract addresses doesn't match the length of contract array"
        );
      }

      // let contracts: Array<OriginResult> = batchOp.results
      //   .map((res, index) => {
      //     const arr = (res as any)?.metadata?.operation_result
      //       ?.originated_contracts;

      //     if (
      //       arr &&
      //       Array.isArray(arr) &&
      //       arr.length === 1 &&
      //       typeof arr[0] === "string" &&
      //       arr[0].slice(0, 3) === "KT1"
      //     ) {
      //       return {
      //         name: files[index].name,
      //         address: arr[0]
      //       };
      //     } else {
      //       return undefined;
      //     }
      //   })
      //   .filter((el): el is OriginResult => typeof el !== undefined);
      // console.log("Origination of contracts confirmed!");
    } catch (error) {
      return Promise.reject(JSON.stringify(error));
    }
  } else {
    return Promise.reject("Contracts list already exists");
  }
};
