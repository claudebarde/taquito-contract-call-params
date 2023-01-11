import type { TezosToolkit } from "@taquito/taquito";

export default async (Tezos: TezosToolkit, contractAddress: string) => {
  const contract = await Tezos.contract.at(contractAddress);
  try {
    console.log("Testing simple params without annotations");
    // unit
    const unit = await contract.methods[0]([["unit"]]).send();
    await unit.confirmation();
    console.log("Tested unit type successfully!");
    // never
    const never = await contract.methods[1](null).send();
    await never.confirmation();
    console.log("Tested never type successfully!");
    // bool
    const bool = await contract.methods[2](true).send();
    await bool.confirmation();
    console.log("Tested bool type successfully!");
    // int
    const int = await contract.methods[3](3).send();
    await int.confirmation();
    console.log("Tested int type successfully!");
    // nat
    const nat = await contract.methods[4](4).send();
    await nat.confirmation();
    console.log("Tested nat type successfully!");
    // string
    const string = await contract.methods[5]("taquito").send();
    await string.confirmation();
    console.log("Tested string type successfully!");
    // mutez
    const mutez = await contract.methods[6](6_000).send();
    await mutez.confirmation();
    console.log("Tested mutez type successfully!");
    // timestamp
    const timestamp = await contract.methods[7](
      new Date(Date.now()).toISOString()
    ).send();
    await timestamp.confirmation();
    console.log("Tested timestamp type successfully!");
  } catch (error) {
    console.error(
      `Error with simple params without annotations: ${JSON.stringify(
        error,
        null,
        2
      )}`
    );
  }

  return null;
};
