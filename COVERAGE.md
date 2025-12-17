# Coverage Report — Muzyka (frontend)

Fecha: 2025-12-17

Comando ejecutado:

```
npm run test:coverage
```

Resumen de ejecución
- Tests: 38 passed / 38 total
- Cobertura global (v8):
  - Statements (stmts): 62.16%
  - Branches (branch): 46.85%
  - Functions (funcs): 65.44%
  - Lines (lines): 62.27%

Cómo abrir el reporte HTML (PowerShell):

```powershell
cd 'c:\Users\Felipe\Desktop\Programacao\Muzyka\muzyka-react'
npm run test:coverage
Start-Process .\coverage\index.html
```

Interpretación rápida
- `Statements` indica el porcentaje de sentencias/expresiones ejecutadas por los tests.
- `Branches` refleja cuántos caminos condicionales (if/else, switch, ternarios) se probaron — es la métrica que más ayuda a encontrar casos no cubiertos.
- `Functions` es el porcentaje de funciones que fueron invocadas.
- `Lines` es el porcentaje de líneas físicas ejecutadas por los tests (cercano a `stmts`).

Hallazgos principales
- `src/services/api.tsx` — 19.38%: contiene muchas funciones HTTP sin tests; cubrir create/update/delete y rutas de error aumentará mucho `lines` y `branches`.
- `src/pages/Cart.tsx` — 46.42%: falta cubrir flujos (carrito vacío vs con items, checkout con/ sin usuario).
- `src/context/AuthContext.tsx` — 65.62%: ramas de login/logout y manejo de token parcialmente cubiertas.
- Archivos CSS y assets muestran 0% (esperado, no son ejecutables).

Riesgos identificados
- Funciones de la capa `services` no testeadas => cambios en manejo de errores o en headers/auth podrían romper la app sin tests que lo detecten.
- Ramas condicionales en páginas administrativas no cubiertas => posibles regresiones en lógica de permisos y UI.

Recomendaciones (priorizadas)
1. Tests de `src/services/api.tsx`: agregar tests unitarios que mockeen `fetch` para success y failure de las rutas más usadas (products, users, orders). Esto mejora `stmts`, `lines` y `branches` rápidamente.
2. Tests para `Cart.tsx` (integración con `CartContext`): cubrir flujo vacío, flujo con items y checkout sin login/login — sube `branches` en `pages` y `context`.
3. Tests para `Users.tsx` CRUD (crear/editar/borrar) y sus ramas de error.
4. Considerar agregar umbrales de cobertura en `vitest.config.ts` para evitar regresiones (ver snippet abajo).

Snippet sugerido (añadir a `vitest.config.ts` para exigir mínimos):

```ts
export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'html'],
      reportsDirectory: 'coverage',
      all: true,
      // Ajusta estos valores a tus objetivos
      statements: 80,
      branches: 60,
      functions: 80,
      lines: 80
    }
  }
});
```

Plan de trabajo sugerido (próximos pasos)
1. Priorizar tests para `src/services/api.tsx` (endpoints críticos). — aprox. 30–90 minutos.
2. Añadir tests de `Cart.tsx` y `CartContext` para cubrir UI y lógica de checkout. — aprox. 30–60 minutos.
3. Volver a ejecutar `npm run test:coverage` y ajustar tests hasta alcanzar los umbrales.

Commit recomendado
- Añade `COVERAGE.md` al repo y haz un commit descriptivo: `git add COVERAGE.md && git commit -m "Add initial coverage report and action plan"`.

Si quieres, puedo crear PR con estos cambios y/o implementar el siguiente bloque de tests (por ejemplo, más rutas en `api.tsx`).

*** Fin del reporte
