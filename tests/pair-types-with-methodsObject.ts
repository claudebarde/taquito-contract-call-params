import type { TezosToolkit } from "@taquito/taquito";

export default async (Tezos: TezosToolkit, contractAddress: string) => {
  try {
    const contract = await Tezos.contract.at(contractAddress);
    console.log("\n- Testing pair params with `.methodsObject()`");
    //pair %simple_pair int nat
    const simple_pair = await contract.methodsObject
      .simple_pair({ 0: 2, 1: 3 })
      .send();
    await simple_pair.confirmation();
    console.log("Tested `pair %simple_pair int nat` successfully!");
    //pair (int %one) (nat %two)
    const one_two = await contract.methodsObject[1]({ one: 2, two: 3 }).send();
    await one_two.confirmation();
    console.log("Tested `pair (int %one) (nat %two)` successfully!");
    //pair %nested_pairs (pair int nat) (pair string mutez)
    const nested_pairs = await contract.methodsObject
      .nested_pairs({ 0: 2, 1: 3, 2: "taquito", 3: 50_000 })
      .send();
    await nested_pairs.confirmation();
    console.log(
      "Tested `pair %nested_pairs (pair int nat) (pair string mutez)` successfully!"
    );
    // TODO: debug the parameter for this contract call
    //pair (pair %nested_left_pair int nat) (pair %nested_right_pair string mutez)
    const nested_pairs_no_annot = await contract.methodsObject["3"]({
      0: 2,
      1: 3,
      2: "taquito",
      3: 50_000
    }).send();
    // tried:
    // { 0: 2, 1: 3, 2: "taquito", 3: 50_000 }
    // { 3: 2, 4: 3, 5: "taquito", 6: 50_000 }
    // { 4: 2, 5: 3, 6: "taquito", 7: 50_000 }
    // { nested_left_pair: { 0: 2, 1: 3 }, nested_right_pair: { 2: "taquito", 3: 50_000 } }
    await nested_pairs_no_annot.confirmation();
    console.log(
      "Tested `pair (pair %nested_left_pair int nat) (pair %nested_right_pair string mutez)` successfully!"
    );
  } catch (error) {
    console.error(error);
    // console.error(`Error with pair params: ${JSON.stringify(error, null, 2)}`);
  }

  return null;
};
