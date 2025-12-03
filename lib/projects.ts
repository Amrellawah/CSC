import { promises as fs } from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

const DATA_FILE = path.join(process.cwd(), 'data', 'projects.json')

export interface Project {
  id: number
  title: string
  description: string
  category: string
  images: string[]
  featured: boolean
  order: number
  createdAt: string
  updatedAt: string
}

interface ProjectsData {
  projects: Project[]
  lastId: number
}

// Read projects from JSON file
export async function getProjects(): Promise<Project[]> {
  try {
    const fileContents = await fs.readFile(DATA_FILE, 'utf8')
    const data: ProjectsData = JSON.parse(fileContents)
    return data.projects.sort((a, b) => a.order - b.order)
  } catch (error) {
    console.error('Error reading projects:', error)
    return []
  }
}

// Get single project by ID
export async function getProjectById(id: number): Promise<Project | null> {
  const projects = await getProjects()
  return projects.find(p => p.id === id) || null
}

// Save projects to JSON file
async function saveProjects(data: ProjectsData): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf8')
}

// Create new project
export async function createProject(projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> {
  const fileContents = await fs.readFile(DATA_FILE, 'utf8')
  const data: ProjectsData = JSON.parse(fileContents)

  const newProject: Project = {
    ...projectData,
    id: data.lastId + 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  data.projects.push(newProject)
  data.lastId = newProject.id

  await saveProjects(data)
  return newProject
}

// Update existing project
export async function updateProject(id: number, projectData: Partial<Omit<Project, 'id' | 'createdAt'>>): Promise<Project | null> {
  const fileContents = await fs.readFile(DATA_FILE, 'utf8')
  const data: ProjectsData = JSON.parse(fileContents)

  const projectIndex = data.projects.findIndex(p => p.id === id)
  if (projectIndex === -1) return null

  data.projects[projectIndex] = {
    ...data.projects[projectIndex],
    ...projectData,
    updatedAt: new Date().toISOString(),
  }

  await saveProjects(data)
  return data.projects[projectIndex]
}

// Delete project
export async function deleteProject(id: number): Promise<boolean> {
  const fileContents = await fs.readFile(DATA_FILE, 'utf8')
  const data: ProjectsData = JSON.parse(fileContents)

  const projectIndex = data.projects.findIndex(p => p.id === id)
  if (projectIndex === -1) return false

  data.projects.splice(projectIndex, 1)
  await saveProjects(data)
  return true
}

// Get projects by category
export async function getProjectsByCategory(category: string): Promise<Project[]> {
  const projects = await getProjects()
  if (category === 'All') return projects
  return projects.filter(p => p.category === category)
}

// Get featured projects
export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await getProjects()
  return projects.filter(p => p.featured).sort((a, b) => a.order - b.order)
}

// Get all categories
export async function getCategories(): Promise<string[]> {
  const projects = await getProjects()
  const categories = new Set(projects.map(p => p.category))
  return Array.from(categories).sort()
}




