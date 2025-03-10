export interface Goal {
  name: string;
  checked: boolean;
}

export interface Exercise {
  checked: boolean,
  name: string;
  reps: number;
  makes: number;
  percentage: number;
  position: string;
}

export interface Session {
  id: string;
  name: string;
  exercises: Exercise[];
  duration: number;
}






