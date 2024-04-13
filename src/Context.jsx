//Importamos lo nacesario para crear el contexto global
import { useState, createContext, useContext } from 'react';

//Creamos el transportador, como si fuese la caja donde vamos a mandar todo. <AppContext.Provider> Como si fuera un child
// Esto es como un componente hijo al que le voy a hacer prop drilling para que lo pase a los nietos, solo que en este caso, lo va a pasar a cualquier lugar que envuelva en si mismo.
const AppContext = createContext();

// 1. Creamos un componente (AppProvider) <AppProvider></AppProvider> que actúa como proveedor de nuestro contexto global.

// 2. Dentro definimos los estados e interfaces necesarias (funciones, valores) mediante useState, useContext etc.

// 3. En lugar de renderizar directamente un html, lo que devolvemos es el AppContextProvider que hemos creado arriba:

// <AppContext.Provider value={objetoConValores}/>

export const AppProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const openSidebar = () => {
    setIsSidebarOpen(true);
  };
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <AppContext.Provider
      value={{
        isSidebarOpen,
        isModalOpen,
        openModal,
        closeModal,
        openSidebar,
        closeSidebar,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// 5. Para acceder a esos valores desde cualquier otro lado, creamos un hook personalizado useGlobalContext que devuelve ese objeto.

export const useGlobalContext = () => {
  return useContext(AppContext);
};
//Envolveremos el padre de preferencia main para que todo mundo tenga acceso al contexto con <AppProvider>
// 7 cuando lo usemos lo llamaremos como:
// import { AppProvider } from './Context';

//Importamos para hacer uso de los datos en si
//import { useGlobalContext } from './Context';
// recuperaremos lo que necesitemos const {algo, algomas} = useGlobalContext()
