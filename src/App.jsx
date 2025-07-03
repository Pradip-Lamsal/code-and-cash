import { BrowserRouter as Router } from "react-router-dom";
import Footer from "./components/common/Footer.jsx";
import Header from "./components/common/Header.jsx";
import TaskProvider from "./context/TaskProvider.jsx";
import AppRoutes from "./routes/index.jsx";

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
