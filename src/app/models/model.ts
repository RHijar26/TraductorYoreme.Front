export interface Model {
    id: number;
    name: string;
    description: string;
    state: number;
    class: string;
    bleuScore: string;
    chrScore: string;
    createDate: Date;    
}