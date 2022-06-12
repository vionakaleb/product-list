import React from "react"
import { Redirect } from "react-router-dom"

// Public Pages
import PagesMaintenance from "../pages/Utility/pages-maintenance";
import PagesComingsoon from "../pages/Utility/pages-comingsoon";

// Dashboard
import Dashboard from "../pages/Dashboard/index"

//Pages
import DatatableTables from "../pages/Util/DatatableTables"

// Main Pages
import QuestionOne from "../pages/Question/One/List"
import QuestionTwo from "../pages/Question/Two/List"

const publicRoutes = [
  {
    path: "/page-maintenance", 
    component: PagesMaintenance 
  },
  {
    path: "/page-comingsoon", 
    component: PagesComingsoon 
  },
];

const userRoutes = [
  {
    path: "/",
    exact: true, 
    component: () => <Redirect to="/dashboard" /> 
  },
  {
    path: "/dashboard", 
    component: Dashboard 
  },

  // Main Pages
  {
    path: "/question/one", 
    component: QuestionOne 
  },
  {
    path: "/question/two", 
    component: QuestionTwo 
  },
  {
    path: "/tables-datatable", 
    component: DatatableTables 
  },
]

export {publicRoutes, userRoutes }