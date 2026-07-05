// import { createBrowserRouter } from "react-router-dom";
// import App from "../App";
// import HomePage from "../pages/HomePage";
// import MainServicesPage from "../components/Sections/ServiceSection/MainServicesPage";
// import MainAboutPage from "../components/Sections/AboutSection/MainAboutPage"
// import Portfolio from "../components/Sections/Portfolio/Portfolio";
// import FaqMainPage from "../components/Sections/FAQ/FaqMainPage";
// import ContactForm from "../components/Sections/ContactForm/ContactForm";
// import PageNotFound from "../components/Layout/PageNotFound/PageNotFound";

// export const router = createBrowserRouter([
//    {
//       path: "/",
//       element: <App />,
//       children: [
//          { index: true, element: <HomePage /> },
//          { path: "/about", element: <MainAboutPage /> },
//          { path: "/services", element: <MainServicesPage /> },
//          { path: "/portfolio", element: <Portfolio /> },
//          { path: "/faq", element: <FaqMainPage /> },
//          { path: "/contact", element: <ContactForm /> },
//       ]
//    },
//    // ❗ This is OUTSIDE of the App layout:
//    {
//       path: "*",
//       element: <PageNotFound />
//    }
// ]);