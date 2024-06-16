import {NextUIProvider} from "@nextui-org/react";
import Header from './components/navbar';
import { Route, Routes } from "react-router-dom";
import Login from "./components/login";
import Home from "./components/home";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Registre from "./components/registre";
import AddBook from "./components/addBook";
import Book from "./components/book";
import { Suspense } from "react";
import EditBook from "./components/editBook";
import { useNavigate } from "react-router-dom";
import AddDemande from "./components/addDemande";
import Dashboard from "./components/dashboard";


function App() {

  const queryClient = new QueryClient()
  const navigate = useNavigate()
  
  return (
    <QueryClientProvider client={queryClient}>

          <Header/>
          <div className="container mx-auto">
            <NextUIProvider className="dark" navigate={navigate}>
              <Routes>
                <Route path="/login" element={<Login/>}>
                </Route>
                <Route path="/" element={<Home/>}>
                </Route>
                <Route path="/registre" element={<Registre/>}>
                </Route>
                <Route path="/addBook" element={<AddBook/>}>
                </Route>
                <Route path="/books/:id" element={<Suspense fallback={"Loading..."}><Book/></Suspense>}>
                </Route>
                <Route path="/books/edit/:id" element={<Suspense fallback={"Loading ..."}><EditBook/></Suspense>}>
                </Route>
                <Route path="/addDemande" element={<AddDemande/>}>
                </Route>
                <Route path="/dashboard" element={<Dashboard/>}>
                </Route>
              </Routes>
            </NextUIProvider>
          </div>
    </QueryClientProvider>
  );
}

export default App;
