import { embedGenerator } from "../shared.js";
let mathValues = Object.getOwnPropertyNames(Math);
export const onCalled = (client, message) => {
    const start = Date.now();
    let equation = message.content.slice(5);
    for (let i = mathValues.length - 1; i > -1; i--) {
        equation = equation.replaceAll(mathValues[i], "Math." + mathValues[i]);
    }
    let result;
    try {
        eval("result = " + equation);
        embedGenerator.sendNormalEmbed(message, "Result: " + result, `Solved equation from ${message.member?.displayName} in ${Math.ceil(Date.now() - start)}ms`);
    }
    catch (err) {
        embedGenerator.sendNormalEmbed(message, "Could not solve!", `Failed to solve equation from ${message.member?.displayName} in ${Math.ceil(Date.now() - start)}ms`, ["Reason: ", err.message]);
    }
};
export const description = "Solves a given equation, has access to almost all math functions, however syntax must be perfect";
