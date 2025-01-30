interface Category {
  id: string;
  name: string;
}

interface Portfolio {
  id: number;
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
  category?: Category;
  categoryId: string;
}

interface User {
  id: number;
  name: string;
  email: string;
}

interface Experience {
  id: string;
  position: string;
  company: string;
  description: string;
  startDate: Date | null;
  endDate: Date | null;
  isWithLine: boolean;
  createdAt?: string;
}

interface Category {
  id: string;
  name: string;
}