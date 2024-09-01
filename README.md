# To-do List

Lista de tarefas desenvolvida com o propósito de pôr em prática os conhecimentos obtidos sobre Redux, ContextAPI, e Typescript.

O artigo dedicado a apresentar o processo de desenvolvimento do jogo pode ser encontrado [neste link](https://medium.com/@freirart/como-eu-constru%C3%AD-do-zero-um-jogo-para-plataformas-web-618589702a94)!

Este repositório abrange o conteúdo apresentado na seção 30 "React + Typescript " do curso
["React - The Complete Guide 2024"](https://www.udemy.com/course/react-the-complete-guide-incl-redux/):

## Anotações 🗒

### Typescript Generics:

- `<T>` in front of the function name, params have type `T`
- fn can be used for many types but TS will try to infer the type based on the usage
- useful to avoid `any` type that does not hint anything to the developer when writing fns that are generic

### Defining React Function Component using TS

```jsx
const componentName: React.FC<{ customProp: propType }> = (props) => {...}
```

- that way TS expects props to have the children key
- fns that returns JSX code are considered `React.JSX.Component` and therefore will expect the `key` key by default

### Typescript Class

- Class + constructor to work both as type and creation shape to make the creation easier when there are standard procedures on the process (such as lastUpdatedAt and createdAt fields)

### useRef hook

- can be used to input values so it does not change state on every keyPressed

```jsx
const inputValue = useRef<HTMLInputElement>(null)
// ...
<input type="text" ref={inputValue} />
```

- acessa o valor através do `inputValue.current.value`
- `.current` representa o `HTMLInputElement` atual

### Functions as params

- `Function` // not very helpful
- `() => void` // practical and short
- explicitar o tipo do parâmetro (`MouseEvent`, `FormEvent`)

### ContextAPI

- works as redux but way simpler

```jsx
export const ContextValue =
  React.createContext < contextShape > { contextDefaultValue: defaultValue };

const ContextValueProvider: React.FC = (props) => {
  // fns and states that manipulates contextShape values

  const value: contextShape = {
    // manipulated ContextValue
  };

  return (
    <ContextValue.Provider value={value}>
      {props.children}
    </ContextValue.Provider>
  );
};

export default ContextValueProvider;
```

- wrap the components that will use the context with `ContextValueProvider`
- use the context with:

```jsx
import { ContextValue } from "...";

const ctx = useContext(ContextValue);
```

- facilitates TS usage because it shortens the number of type definitions since values are not used as params anymore
- the behavior is similar to "lift the state up" although it has its performance advantages

> wrap input in form tag when using a submit button so Enter will hit submit button by default !!!
