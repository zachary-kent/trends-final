import { ChangeEvent, useState } from "react";
import Authentication from "./Authentication";
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
        readonly hours: number;
        readonly minutes: number;
        readonly ingredients: string[];
        readonly instructions: string;
    }>({ name: '', hours: 0, minutes: 0, ingredients: [], instructions: '' });
    const [restrictions, setRestrictions] = useState(new Set<string>());
    const [ingredient, setIngredient] = useState('');
    const [email, setEmail] = useState('');
    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const name = e.currentTarget.name;
        const value = e.currentTarget.value;
        setInput({ ...input, [name]: value });
    };
    const toggle = (e: ChangeEvent<HTMLInputElement>) => {
        const restriction = e.currentTarget.name;
        const copy = new Set(restrictions);
        if (copy.has(restriction)) {
            copy.delete(restriction);
        } else {
            copy.add(restriction);
        }
        setRestrictions(copy);
    };
    return (
        <SectionWrapper>
            <SectionHeader>Enter a Recipe!</SectionHeader>
            <SectionContainer>
                {email !== '' ?
                    <form onSubmit={() => {
                        const {
                            name, hours, minutes, ingredients, instructions
                        } = input;
                        onSubmit({
                            name: name,
                            ingredients: ingredients,
                            prepTime: {
                                hours: hours,
                                minutes: minutes
                            },
                            cuisine: '',
                            restrictions: Array.from(restrictions),
                            author: email,
                            instructions: instructions
                        });
                    }}>
                        <textarea 
                            name='instructions'
                            rows={10} 
                            cols={20} 
                            placeholder='Instructions...' 
                            onChange={handleInputChange}
                        />
                        <label>Name
                        <InputBar name='name' onChange={handleInputChange} />
                        </label>
                        <br />
                        <label>Preparation time:
                        <InputBar name='hours' type='number' onChange={handleInputChange} />
                    hours
                    </label>
                        <label>
                            <InputBar name='minutes' type='number' onChange={handleInputChange} />
                    minutes
                    </label>
                        <br />
                        <span>Dietary Restrictions:</span>
                        <label>
                            Vegetarian
                        <Checkbox type='checkbox' name='Vegetarian' onChange={toggle} />
                        </label>
                        <label>
                            Vegan
                        <Checkbox type='checkbox' name='Vegan' onChange={toggle} />
                        </label>
                        <label>
                            Gluten Free
                        <Checkbox type='checkbox' name='Gluten Free' onChange={toggle} />
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
                    :
                    <Authentication onAuth={setEmail} />
                }
            </SectionContainer>
        </SectionWrapper>
    );
};

export default EnterRecipe;
