import type { TezosToolkit } from "@taquito/taquito";

export default async (Tezos: TezosToolkit, contractAddress: string) => {
  const contract = await Tezos.contract.at(contractAddress);
  try {
    console.log("Testing simple params with annotations");
    // unit
    const unit = await contract.methods.unit_param([["unit"]]).send();
    await unit.confirmation();
    console.log("Tested unit type successfully!");
    // never
    const never = await contract.methods.never_param(null).send();
    await never.confirmation();
    console.log("Tested never type successfully!");
    // bool
    const bool = await contract.methods.bool_param(true).send();
    await bool.confirmation();
    console.log("Tested bool type successfully!");
    // int
    const int = await contract.methods.int_param(3).send();
    await int.confirmation();
    console.log("Tested int type successfully!");
    // nat
    const nat = await contract.methods.nat_param(4).send();
    await nat.confirmation();
    console.log("Tested nat type successfully!");
    // string
    const string = await contract.methods.string_param("taquito").send();
    await string.confirmation();
    console.log("Tested string type successfully!");
    // mutez
    const mutez = await contract.methods.mutez_param(6_000).send();
    await mutez.confirmation();
    console.log("Tested mutez type successfully!");
    // timestamp
    const timestamp = await contract.methods
      .timestamp_param(new Date(Date.now()).toISOString())
      .send();
    await timestamp.confirmation();
    console.log("Tested timestamp type successfully!");
  } catch (error) {
    console.error(
      `Error with simple params with annotations: ${JSON.stringify(
        error,
        null,
        2
      )}`
    );
  }

  return null;
};
