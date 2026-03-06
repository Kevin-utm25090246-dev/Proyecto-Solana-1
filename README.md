🍯 Solana TipJar (Cofre de Propinas)
Un contrato inteligente (Smart Contract) desarrollado en Solana utilizando el framework Anchor. Este proyecto permite a los usuarios crear "cofres" virtuales donde otros pueden enviar donaciones en SOL de forma descentralizada.

🚀 Características
Inicialización: Crea un cofre con una descripción personalizada.

Donaciones: Los usuarios pueden enviar SOL directamente al cofre.

Transparencia: El total acumulado se guarda y actualiza en la blockchain.

Seguridad: Uso de Program Derived Addresses (PDA) y validación de cuentas mediante Anchor.

🛠️ Tecnologías utilizadas
Solana Blockchain

Rust (Lenguaje del Smart Contract)

Anchor Framework (Framework de desarrollo)

TypeScript (Para tests y cliente)

Solana Playground (Entorno de desarrollo rápido)

📂 Estructura del Proyecto
src/lib.rs: Contiene la lógica del programa en Rust.

tests/tip-jar.test.ts: Pruebas automatizadas en TypeScript para verificar el flujo de fondos.

client/client.ts: Script para interactuar con el programa desde el navegador o consola.

⚙️ Instalación y Uso (Solana Playground)
Si quieres probar este proyecto rápidamente sin instalar nada localmente:

Abre Solana Playground.

Crea un nuevo proyecto de tipo Anchor (Rust).

Copia el código de src/lib.rs en el editor.

Haz clic en el botón Build (martillo) para compilar.

Haz clic en Deploy para subirlo a la Devnet.

Asegúrate de tener SOL de prueba:

Bash
solana airdrop 2
🧪 Ejecución de Tests
Para verificar que todo funciona correctamente, dirígete a la pestaña de Test en el Playground y ejecuta el archivo de pruebas:

TypeScript
// Resultado esperado en consola:
// ✔ ¡Inicializa el cofre con éxito!
// ✔ Envía una propina de 0.1 SOL
📝 Roadmap / Próximas Mejoras
[ ] Agregar función withdraw para que el dueño pueda retirar los fondos.

[ ] Implementar un Frontend en React con @solana/wallet-adapter.

[ ] Permitir múltiples cofres por usuario mediante PDAs (Seeds).

📄 Licencia
Este proyecto está bajo la licencia MIT. ¡Siéntete libre de usarlo y mejorarlo!
