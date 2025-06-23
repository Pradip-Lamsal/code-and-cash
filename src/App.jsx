import { BrowserRouter as Router } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import TaskProvider from "./Provider/provider";
import AppRoutes from "./routes";

function App() {
  return (
    <TaskProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <AppRoutes />
          </main>
          <Footer />
        </div>
      </Router>
    </TaskProvider>
  );
}

export default App;
