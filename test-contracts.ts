import { type TezosToolkit } from "@taquito/taquito";
import fs from "fs";
import simpleTypesNoAnnot from "./tests/simple-types-no-annot";
import simpleTypesWithAnnotations from "./tests/simple-types-with-annotations";
import pairTypes from "./tests/pair-types";

export default async (Tezos: TezosToolkit): Promise<boolean> => {
  if (fs.existsSync("./contracts.json")) {
    try {
      let contracts = fs.readFileSync("./contracts.json", {
        encoding: "utf-8"
      });
      contracts = JSON.parse(contracts);
      if (contracts && Array.isArray(contracts) && contracts.length > 0) {
        let contractAddresses = contracts.reduce((acc, val) => {
          acc[val.name.replace(".tz", "")] = val.address;
          return acc;
        }, {});
        // testing simple params without annotations
        let contractAddress = contractAddresses["simple-types-no-annot"];
        await simpleTypesNoAnnot(Tezos, contractAddress);
        // testing simple params with annotations
        contractAddress = contractAddresses["simple-types-with-annotations"];
        await simpleTypesWithAnnotations(Tezos, contractAddress);
        // testing pair type params
        contractAddress = contractAddresses["pair-types"];
        await pairTypes(Tezos, contractAddress);

        return true;
      } else {
        throw "contracts.json is not an array or is an empty array";
      }
    } catch (error) {
      console.error(error);
      return Promise.reject(
        `Test of contract failed with error message: ${JSON.stringify(error)}`
      );
    }
  } else {
    return Promise.reject("contracts.json doesn't exist");
  }
};
