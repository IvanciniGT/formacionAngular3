# Listado de usuarios

| Seleccionar todos | Deseleccionar seleccionados | Borrar seleccionados |
                                                    |
                                                    v
                                                    Confirmable

Seleccionar todos: Está activo en estado normal y si no están ya todos seleccionados
Deseleccionar todos: Está activo si alguno está seleccionado
Borrar seleccionados: Está activo si alguno está seleccionado

Listado con los seleccionados

---

Quién puede marcar a un usuario como seleccionado: Qué componente web?
- El propio componente usuario puede marcarse como seleccionado:
  - Se seleccione -> evento -> lista de usuarios    (2)
  - Él cambia su representación gráfica
    - BOTONES EDITAR, BORRAR: Se desactivan??
- El listado también puede marcar los usuarios como seleccionados
  - Debe avisar a los hijos (usuarios) para que cambien su estilo (1)

---

# Componente usuario:

Cambiar API
- Input nuevos
  - seleccionado <- boolean : Para que desde fuera me digan si estoy seleccionado (1)
  - seleccionable <- boolean : Para que desde fuera me digan si me pueden seleccionar (1)
- Output nuevos
  - onSeleccionado <- boolean : Para yo aviar a otros (mis padres) de que me han seleccionado (2)
  - onDeseleccionado <- boolean : Para yo aviar a otros (mis padres) de que me han seleccionado (2)

- ESTADOS: NORMAL --> SELECCIONADO - SELECCIONADO --> NORMAL