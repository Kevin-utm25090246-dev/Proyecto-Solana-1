import * as anchor from "@coral-xyz/anchor";
import BN from "bn.js";
import assert from "assert";
import * as web3 from "@solana/web3.js";
import type { TipJar } from "../target/types/tip_jar";
describe("tip-jar", () => {
  // Configure the client to use the local cluster
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.TipJar as anchor.Program<TipJar>;
  
  // Generamos una cuenta nueva para el cofre (Jar)
  const jarKeypair = web3.Keypair.generate();

  it("¡Inicializa el cofre con éxito!", async () => {
    const description = "Mi primer cofre de propinas";
    
    await program.methods
      .initialize(description)
      .accounts({
        jar: jarKeypair.publicKey,
        user: program.provider.publicKey,
        systemProgram: web3.SystemProgram.programId,
      })
      .signers([jarKeypair])
      .rpc();

    const jarAccount = await program.account.jar.fetch(jarKeypair.publicKey);
    console.log("Descripción del cofre:", jarAccount.description);
    assert.equal(jarAccount.description, description);
  });

  it("Envía una propina de 0.1 SOL", async () => {
    const amount = new BN(0.1 * web3.LAMPORTS_PER_SOL);

    await program.methods
      .tip(amount)
      .accounts({
        jar: jarKeypair.publicKey,
        user: program.provider.publicKey,
        systemProgram: web3.SystemProgram.programId,
      })
      .rpc();

    const jarAccount = await program.account.jar.fetch(jarKeypair.publicKey);
    console.log("Total acumulado en el cofre:", jarAccount.totalTips.toString());
    assert.ok(jarAccount.totalTips.gt(new BN(0)));
  });
});