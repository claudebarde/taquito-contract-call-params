import type { TezosToolkit } from "@taquito/taquito";

export default async (Tezos: TezosToolkit, contractAddress: string) => {
  const contract = await Tezos.contract.at(contractAddress);
  try {
    console.log("\n- Testing union params");
    //option %nat_param nat
    const simple_option_some = await contract.methods.nat_param(4).send();
    await simple_option_some.confirmation();
    console.log("Tested `option %nat_param nat` with Some successfully!");
    const simple_option_none = await contract.methods.nat_param(null).send();
    await simple_option_none.confirmation();
    console.log("Tested `option %nat_param nat` with None successfully!");
    //option %string_param string
    const simple_option_string = await contract.methods
      .string_param("taquito")
      .send();
    await simple_option_string.confirmation();
    console.log("Tested `option %string_param string` with Some successfully!");
    //option %list_nat_param (list nat)
    const simple_option_list = await contract.methods
      .list_nat_param([3, 4, 5, 6])
      .send();
    await simple_option_list.confirmation();
    console.log(
      "Tested `option %list_nat_param (list nat)` with Some successfully!"
    );
    //option %pair_param (pair string nat)
    const simple_option_pair = await contract.methods
      .pair_param("taquito", 5)
      .send();
    await simple_option_pair.confirmation();
    console.log(
      "Tested `option %pair_param (pair string nat)` with Some successfully!"
    );
    //option %or_param (or string nat)
    const simple_option_or = await contract.methods
      .or_param(0, "taquito")
      .send();
    // tried:
    // "taquito"
    // { left: "taquito" }
    // { Left: "taquito" }
    // { 0: "taquito" }
    // { "0": "taquito" }
    // { 1: "taquito" }
    // { 2: "taquito" }
    // { 3: "taquito" }
    // { 4: "taquito" }
    // { 5: "taquito" }
    // { 6: "taquito" }
    // { 7: "taquito" }
    // { 8: "taquito" }
    // { 9: "taquito" }
    // { 10: "taquito" }
    // "left", "taquito"
    // "Left", "taquito"
    // ["Left", "taquito"]
    // ["left", "taquito"]
    // ["0", "taquito"]
    //  [0, "taquito"]
    // [["0", "taquito"]]
    await simple_option_or.confirmation();
    console.log(
      "Tested `option %or_param (or string nat)` with Some successfully!"
    );
  } catch (error) {
    console.error(error);
    console.error(
      `Error with option params: ${JSON.stringify(error, null, 2)}`
    );
  }

  return null;
};
