export interface SignUp{
    username: string;
    email: string;
    password: string;
    profile_pic : FileList | null;
}

export interface SignIn{
  email:string;
  password:string;
}

export interface MenuItem{
  $id?: string;
  name: string;
  description: string;
  type: MenuType;
  nation: NationType;
  price: number;
  imageUrl?: string;
  image: FileList;
}

export type MenuType = "Entree" | "Main" | "Dessert";
export type NationType = "German" | "Chinese" | "Japanese" | "Indian" | "French" | "Mexican";