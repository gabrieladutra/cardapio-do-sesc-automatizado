// Ativa o modo mock
process.env.LOCAL_TEST = "true";

const { handler } = require("./sms.js");

(async () => {
  try {
    const response = await handler({
      origem: "teste_local",
      data: new Date().toISOString(),
    });

    console.log("\n===== RESULTADO DO TESTE =====");
    console.log(response);
  } catch (err) {
    console.error("\nERRO NO HANDLER:");
    console.error(err);
  }
})();