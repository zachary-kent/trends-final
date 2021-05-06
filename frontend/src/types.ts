import { Recipe } from '../../backend/types'

export type TitleProps = {
    readonly title: string;
};

export type EnterRecipeProps = {
    readonly onSubmit: (recipe: Recipe) => void;
};

export type RecipeDisplayProps = {
    readonly recipe: Recipe;
};
