export type ProjectStatus = 'in progress' | 'completed' | 'on hold' | string;
export type ProjectCategory = 'technology' | 'marketing' | 'finance' | string;
export type ProjectPriority = 'high' | 'medium' | 'low' | string;
export type ProjectType =
  | 'software development'
  | 'marketing'
  | 'research'
  | string;

export type Projects = {
  id: string;
  nome: string;
  preco: string;
  quantidade: string;
  descricao: string;
  data_criacao: string;
};
