import { describe, expect, test } from "vitest";
import { duper } from "../src/Duper"

describe("Duper debe ser capaz de sumar dos numeros", () => {
    test("Debería retornar la suma de dos números positivos", () => {
        const num1 = 5;
        const num2 = 10;
        const expected = 15;

        const result = duper(num1, num2);

        expect(result).toBe(expected);
    });

    test("Debería manejar números negativos", () => {
        const num1 = -5;
        const num2 = 3;
        const expected = -2;

        const result = duper(num1, num2);

        expect(result).toBe(expected);
    });

    test("Debería retornar el mismo número si uno de los argumentos es cero", () => {
        const num1 = 7;
        const num2 = 0;
        const expected = 7;

        const result = duper(num1, num2);
        
        expect(result).toBe(expected);
    });
});