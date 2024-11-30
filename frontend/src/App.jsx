import { 
   BrowserRouter,
   Routes, 
   Route ,
  } from "react-router-dom";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { Inspector } from "./pages/Inspector";
import { University } from "./pages/University";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/inspector" element={<Inspector />} />
          <Route path="/university" element={<University />} />
          {/* Optional: Handle undefined routes */}
          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
