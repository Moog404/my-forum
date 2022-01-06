import AppNav from "./components/organisms/AppNav.tsx";
import AppLayout from "./components/templates/AppLayout.tsx";

function App() {
  return (
    <div className="App">
      <div className={"flex flex-col h-screen overflow-hidden"}>
        <AppNav />
        <AppLayout />
      </div>
    </div>
  );
}

export default App;
