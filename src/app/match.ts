export class Match {
  display_name: string;
  age: number;
  job_title: string;
  height_in_cm: number;
  city: {
    name: string;
    lat: number;
    lon: number
  };
  main_photo: string;
  compatibility_score: number;
  contacts_exchanged: number;
  favourite: boolean;
  religion: string;
}