import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// Import all the page components here
import { Home } from './pages/Home/Home'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { WorldMap } from './pages/WorldMap'
import {
  Projects,
  ProjectsDetails,
  QuestDetails,
  SubmitSolution,
  Solution
} from './pages/Projects'
import { MyPage } from './pages/MyPage'
import { Ranking } from './pages/Ranking'
import { Contact } from './pages/Contact'
import { Community } from './pages/Community'
import { Admin } from './pages/Admin'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/worldmap',
    element: <WorldMap />
  },
  {
    path: '/projects/:categoryId',
    element: <Projects />
  },
  {
    path: '/projects/:categoryId/:projectId',
    element: <ProjectsDetails />
  },
  {
    path: '/projects/:categoryId/:projectId/quests/:questId',
    element: <QuestDetails />
  },
  {
    path: '/projects/:categoryId/:projectId/quests/:questId/submit-solution',
    element: <SubmitSolution />
  },
  {
    path: '/projects/:categoryId/:projectId/quests/:questId/solution/:solutionId',
    element: <Solution />
  },
  {
    path: '/my-page',
    element: <MyPage />
  },
  {
    path: '/ranking',
    element: <Ranking />
  },
  {
    path: '/contact',
    element: <Contact />
  },
  {
    path: '/community',
    element: <Community />
  },
  {
    path: '/admin',
    element: <Admin />
  }
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App
