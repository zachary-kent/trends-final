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

export type Recipe = {
    prepTime: number;
    cuisine: Cuisine;
    restrictions: DietaryRestrictions[];
    ingredients: string[];
    id?: string;
};