import * as anchor from "@coral-xyz/anchor";
import * as web3 from "@solana/web3.js";
import type { TipJar } from "../target/types/tip_jar";

// Configure the client to use the local cluster
anchor.setProvider(anchor.AnchorProvider.env());

const program = anchor.workspace.TipJar as anchor.Program<TipJar>;

// 1. Dirección de un cofre ya existente (Sustituye tras correr el test o crear uno)
const jarAddress = new web3.PublicKey("DIRECCION_DE_TU_JAR_AQUI");

async function main() {
  console.log("Revisando el estado del cofre...");

  try {
    const jarAccount = await program.account.jar.fetch(jarAddress);
    
    console.log(`--- Información del Cofre ---`);
    console.log(`Dueño: ${jarAccount.owner.toBase58()}`);
    console.log(`Descripción: ${jarAccount.description}`);
    console.log(`Total Recaudado: ${jarAccount.totalTips.toNumber() / web3.LAMPORTS_PER_SOL} SOL`);
    
  } catch (e) {
    console.error("No se encontró el cofre. ¿Ya lo inicializaste?");
  }
}

main();