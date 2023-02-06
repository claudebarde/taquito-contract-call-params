import type { TezosToolkit } from "@taquito/taquito";

export default async (Tezos: TezosToolkit, contractAddress: string) => {
  const contract = await Tezos.contract.at(contractAddress);
  try {
    console.log("\n- Testing complex or params");
    const simple_param = await contract.methods[2](45).send();
    await simple_param.confirmation();
    console.log("Tested `Right int` successfully!");

    const second_param = await contract.methods[0]("taquito").send();
    await second_param.confirmation();
    console.log("Tested `Left (Left string)` successfully!");

    const third_param = await contract.methods[1](5, "2", 7).send();
    await third_param.confirmation();
    console.log("Tested `Left (Right (Pair 5 (Left 7)))` successfully!");

    const fourth_param = await contract.methods[1](5, "3", "tezos").send();
    await fourth_param.confirmation();
    console.log('Tested `Left (Right (Pair 5 (Right "tezos")))` successfully!');
  } catch (error) {
    console.error(error);
    console.error(
      `Error with complex or params: ${JSON.stringify(error, null, 2)}`
    );
  }

  return null;
};
