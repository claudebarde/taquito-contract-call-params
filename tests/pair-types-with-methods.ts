import type { TezosToolkit } from "@taquito/taquito";

export default async (Tezos: TezosToolkit, contractAddress: string) => {
  const contract = await Tezos.contract.at(contractAddress);
  try {
    console.log("\n- Testing pair params with `.methods()`");
    //pair %simple_pair int nat
    const simple_pair = await contract.methods.simple_pair(2, 3).send();
    await simple_pair.confirmation();
    console.log("Tested `pair %simple_pair int nat` successfully!");
    //pair (int %one) (nat %two)
    const one_two = await contract.methods[1](2, 3).send();
    await one_two.confirmation();
    console.log("Tested `pair (int %one) (nat %two)` successfully!");
    //pair %nested_pairs (pair int nat) (pair string mutez)
    const nested_pairs = await contract.methods
      .nested_pairs(2, 3, "taquito", 50_000)
      .send();
    await nested_pairs.confirmation();
    console.log(
      "Tested `pair %nested_pairs (pair int nat) (pair string mutez)` successfully!"
    );
    //pair (pair %nested_left_pair int nat) (pair %nested_right_pair string mutez)
    const nested_pairs_no_annot = await contract.methods[3](
      2,
      3,
      "taquito",
      50_000
    ).send();
    await nested_pairs_no_annot.confirmation();
    console.log(
      "Tested `pair (pair %nested_left_pair int nat) (pair %nested_right_pair string mutez)` successfully!"
    );
  } catch (error) {
    console.error(`Error with pair params: ${JSON.stringify(error, null, 2)}`);
  }

  return null;
};
