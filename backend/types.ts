export enum DietaryRestrictions {
    VEGAN = 'vegan',
    VEGETARIAN = 'vegetarian',
    GF = 'gf'
};

export enum Cuisine {
    ITALIAN = 'italian',
    MEXICAN = 'mexican',
    KOREAN = 'korean',
    AMERICAN = 'american'
};

export type PrepTime = {
    hours: number;
    minutes: number;
}

export type Recipe = {
    name: string;
    prepTime: PrepTime;
    cuisine: string;
    restrictions: string[];
    ingredients: string[];
    author: string;
    instructions: string;
    id?: string;
};