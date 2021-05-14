import "./assets/styles/scss/app.scss";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Home from "./views/Home";
import storeConf from "./store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  // Récupère le store destructuré depuis l'objet storeConf et la variable persistor
  const { store, persistor } = storeConf;
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Navbar />
        <Home />
        <Footer />
      </PersistGate>
    </Provider>
  );
}

export default App;
