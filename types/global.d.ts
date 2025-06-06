interface Portfolio {
  _id: string;
  title: string;
  description: string;
  url: string;
  projectTypeName?: string;
  categoryName?: string;
  projectTypeId: string;
  categoryId: string;
}

interface User {
  _id: number;
  name: string;
  email: string;
}

interface Experience {
  _id: string;
  position: string;
  company: string;
  description: string;
  startDate: Date | null;
  endDate: Date | null;
  isPromoted: boolean;
  createdAt?: string;
}

interface Category {
  _id: string;
  name: string;
}

interface ProjectType {
  _id: string;
  name: string;
}

interface Skill {
  _id: string;
  name: string;
  application: string;
  mastery: number
  skillType: string;
}