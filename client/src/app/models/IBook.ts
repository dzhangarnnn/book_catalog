export interface IBook {
  _id: string;
  title: string;
  subtitle?: string;
  authors?: string[];
  description?: string;
  imageLinks?: { [thumbnail: string]: string };
  publishedDate?: string;
  publisher?: string;
  categories?: string[];
}

export interface IResItem {
  id: string;
  volumeInfo: {
    title: string;
    subtitle?: string;
    authors?: string[];
    description?: string;
    imageLinks?: { [thumbnail: string]: string };
    publishedDate?: string;
    publisher?: string;
    categories?: string[];
    [key: string]: any;
  };
  [key: string]: any;
}

export interface IResFromGBooks {
  items: IResItem[];
  kind: string;
  totalItems: number;
}
