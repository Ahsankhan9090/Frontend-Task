import logo from "./logo.svg";
import "./App.css";
import AutoCompleteUI from "./components/AutoComplete/AutocompleteInput";
import Header from "./components/Header/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <AutoCompleteUI />
    </div>
  );
}

export default App;
