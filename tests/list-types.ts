import type { TezosToolkit } from "@taquito/taquito";

export default async (Tezos: TezosToolkit, contractAddress: string) => {
  const contract = await Tezos.contract.at(contractAddress);
  try {
    console.log("\n- Testing list params");
    const simple_list = await contract.methods.simple_list([4, 5, 6, 7]).send();
    await simple_list.confirmation();
    console.log("Tested `list %simple_list nat` successfully!");

    const list_of_pairs = await contract.methods
      .pair_list([
        { 0: 3, 1: "taquito" },
        { 0: 5, 1: "tezos" }
      ])
      .send();
    await list_of_pairs.confirmation();
    console.log("Tested `list %pair_list (pair int string)` successfully!");

    const list_of_lists = await contract.methods
      .list_list([
        [4, 5, 6, 7],
        [8, 9, 10, 11],
        [12, 13, 14, 15]
      ])
      .send();
    await list_of_lists.confirmation();
    console.log("Tested `list %list_list (list nat)` successfully!");

    const list_of_unions_left = await contract.methods
      .or_list([{ 0: { 0: 6, 1: 7 } }])
      .send();
    // tried
    // [ [0, { 0: 6, 1: 7 } ], [1, "taquito"] ]
    // [ { 0: 0, 1: { 0: 6, 1: 7 } }, { 0: 1, 1: "taquito" } ]
    // [0, { 0: 6, 1: 7 }, 1, "taquito"]
    await list_of_unions_left.confirmation();
    console.log(
      "Tested `list %or_list (or (pair int nat) string)` for Left successfully!"
    );

    const list_of_unions_right = await contract.methods
      .or_list([{ 1: "taquito" }])
      .send();
    await list_of_unions_right.confirmation();
    console.log(
      "Tested `list %or_list (or (pair int nat) string)` for Right successfully!"
    );

    const list_of_unions_mix = await contract.methods
      .or_list([
        { 1: "taquito" },
        { 0: { 0: 6, 1: 7 } },
        { 1: "tezos" },
        { 0: { 0: 26, 1: 37 } }
      ])
      .send();
    await list_of_unions_mix.confirmation();
    console.log(
      "Tested `list %or_list (or (pair int nat) string)` for Left and Right successfully!"
    );
  } catch (error) {
    console.error(error);
    console.error(`Error with list params: ${JSON.stringify(error, null, 2)}`);
  }

  return null;
};
