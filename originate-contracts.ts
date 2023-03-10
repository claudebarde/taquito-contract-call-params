import { type TezosToolkit, OpKind } from "@taquito/taquito";
import fs from "fs";

interface OriginResult {
  name: string;
  address: string;
}

export default async (Tezos: TezosToolkit): Promise<Array<OriginResult>> => {
  if (!fs.existsSync("./contracts.json")) {
    console.log("Originating the contracts");

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
    } catch (error) {
      console.log(error);
      return Promise.reject(JSON.stringify(error));
    }
  } else {
    return Promise.reject("Contracts list already exists");
  }
};
