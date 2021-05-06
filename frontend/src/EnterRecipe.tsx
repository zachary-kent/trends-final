import { useState } from "react";
import {
    Checkbox,
    InputBar,
    SectionContainer,
    SectionHeader,
    SectionWrapper,
    SubmitButton
} from "./styles";

import { EnterRecipeProps } from './types';


const EnterRecipe = ({ onSubmit }: EnterRecipeProps) => {
    const [input, setInput] = useState<{
        readonly name: string;
        readonly hours: string;
        readonly minutes: string;
        readonly ingredients: ReadonlyArray<string>;
    }>({ name: '', hours: '', minutes: '', ingredients: [] });
    const [ingredient, setIngredient] = useState('');
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.currentTarget.name;
        const value = e.currentTarget.value;
        setInput({ ...input, [name]: value });
    };
    return (
        <SectionWrapper>
            <SectionHeader>Enter a Recipe!</SectionHeader>
            <SectionContainer>
                <form onSubmit={e => { }}>
                    <textarea rows={10} cols={20} placeholder='Instructions...' />
                    <label>Name
                        <InputBar name='name' onChange={handleInputChange} />
                    </label>
                    <br />
                    <label>Preparation time:
                        <InputBar name='hours' onChange={handleInputChange} />
                    hours
                    </label>
                    <label>
                        <InputBar name='minutes' onChange={handleInputChange} />
                    minutes
                    </label>
                    <br />
                    <span>Dietary Restrictions:</span>
                    <label>
                        Vegetarian
                        <Checkbox type='checkbox' />
                    </label>
                    <label>
                        Vegan
                        <Checkbox type='checkbox' />
                    </label>
                    <label>
                        Gluten Free
                        <Checkbox type='checkbox' />
                    </label>
                    <br />
                    <label>Enter Ingredient:
                        <InputBar onChange={e => setIngredient(e.currentTarget.value)} />
                    </label>
                    <button type='button' onClick={() => {
                        const ingredients = input.ingredients;
                        if (!ingredients.includes(ingredient)) {
                            setInput({
                                ...input, ingredients: [...ingredients, ingredient]
                            });
                        }
                    }}>
                        Add
                    </button>
                    {input.ingredients.map(i =>
                        <span key={i}>{i}</span>
                    )}
                    <br />
                    <SubmitButton type='submit' value='Submit Recipe!' />
                </form>
            </SectionContainer>
        </SectionWrapper>
    );
};

export default EnterRecipe;
