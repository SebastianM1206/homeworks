import React, { createContext, useContext, useState } from "react";
import Cola from "../utils/consultas"; //se van a usar las funciones de ambas
import Pila from "../utils/reclamos";

const ClientsContext = createContext();

//Mock data para inicializar el contexto
const initialClients = (() => {
  const cola1 = new Cola();
  cola1.enqueue("Consulta sobre facturación");
  cola1.enqueue("Duda sobre contrato");

  const pila1 = new Pila();
  pila1.push("Reclamo por mal servicio");
  pila1.push("Reclamo por demora en respuesta");

  const cola2 = new Cola();
  cola2.enqueue("Consulta técnica sobre el producto");

  const pila2 = new Pila();
  pila2.push("Reclamo por cobro duplicado");

  return [
    {
      id: 1,
      name: "Juan Pérez",
      consultas: cola1,
      reclamos: pila1,
    },
    {
      id: 2,
      name: "María Gómez",
      consultas: cola2,
      reclamos: pila2,
    },
  ];
})();

export const ClientsProvider = ({ children }) => {
  const [clients, setClients] = useState(initialClients);

  const addClient = (id, name) => {
    const newClient = {
      id,
      name,
      consultas: new Cola(), // Aqui instancio como Cola
      reclamos: new Pila(), // Aqui instancio como Pila
    };
    setClients((prevClients) => [...prevClients, newClient]);
  };

  const addConsulta = (clientId, consulta) => {
    setClients((prevClients) =>
      prevClients.map((client) =>
        client.id === clientId
          ? {
              ...client,
              consultas: (() => {
                client.consultas.enqueue(consulta);
                return client.consultas;
              })(),
            }
          : client
      )
    );
  };

  const addReclamo = (clientId, reclamo) => {
    setClients((prevClients) =>
      prevClients.map((client) =>
        client.id === clientId
          ? {
              ...client,
              reclamos: (() => {
                client.reclamos.push(reclamo);
                return client.reclamos;
              })(),
            }
          : client
      )
    );
  };

  const processConsulta = (clientId) => {
    setClients((prevClients) =>
      prevClients.map((client) =>
        client.id === clientId
          ? {
              ...client,
              consultas: (() => {
                client.consultas.dequeue();
                return client.consultas;
              })(),
            }
          : client
      )
    );
  };

  const processReclamo = (clientId) => {
    setClients((prevClients) =>
      prevClients.map((client) =>
        client.id === clientId
          ? {
              ...client,
              reclamos: (() => {
                client.reclamos.pop();
                return client.reclamos;
              })(),
            }
          : client
      )
    );
  };

  return (
    <ClientsContext.Provider
      value={{
        clients,
        addClient,
        addConsulta,
        addReclamo,
        processConsulta,
        processReclamo,
      }}
    >
      {children}
    </ClientsContext.Provider>
  );
};

export const useClients = () => {
  return useContext(ClientsContext);
};
