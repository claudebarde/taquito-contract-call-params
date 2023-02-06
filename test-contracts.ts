import { type TezosToolkit } from "@taquito/taquito";
import fs from "fs";
import simpleTypesNoAnnot from "./tests/simple-types-no-annot";
import simpleTypesWithAnnotations from "./tests/simple-types-with-annotations";
import pairTypesWithMethods from "./tests/pair-types-with-methods";
import pairTypesWithMethodsObject from "./tests/pair-types-with-methodsObject";
import unionTypes from "./tests/option-types";
import listTypes from "./tests/list-types";
import complexOrParam from "./tests/complex-or-params";

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
        // await simpleTypesNoAnnot(Tezos, contractAddress);
        // testing simple params with annotations
        contractAddress = contractAddresses["simple-types-with-annotations"];
        // await simpleTypesWithAnnotations(Tezos, contractAddress);
        // testing pair type params
        contractAddress = contractAddresses["pair-types"];
        // await pairTypesWithMethods(Tezos, contractAddress);
        // await pairTypesWithMethodsObject(Tezos, contractAddress);
        // testing union types
        contractAddress = contractAddresses["option-types"];
        // await unionTypes(Tezos, contractAddress);
        contractAddress = contractAddresses["list-types"];
        // await listTypes(Tezos, contractAddress);
        contractAddress = contractAddresses["complex-or-params"];
        await complexOrParam(Tezos, contractAddress);

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
