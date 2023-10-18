# Comunicaciones entre componentes:

Los componentes WEB que cree, deben ser componente totalmente independientes (DESACOPLADOS):
CUALQUIER COMUNICACION ENTRE COMPONENTES DEBO HACERLA SIEMPRE (BAJO PENA DE MUERTE) mediante:
- Atributos HTML (padre-hijo)
- Eventos (hijo/padres)

No accedemos a propiedades NUNCA de los componentes desde otros !!!! = CAGARLA: ACOPLO COMPONENTES
Para eso he definido un API en mi componente! Input / Output