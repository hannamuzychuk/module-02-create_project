// import Product from './Product';

// export default function App() {
//   return (
//     <>
//       <h1>Best selling</h1>

//       <Product
//         name="Tacos With Lime"
//         imgUrl="https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?w=640"
//         price={10.99}
//       />
//       <Product
//         name="Fries and Burger"
//         imgUrl="https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?w=640"
//         price={14.29}
//       />
//     </>
//   );
// }

// src/components/App.tsx

// import Alert from "./Alert";

// export default function App() {
//   return (
//     <>
//       <Alert />
//       <Alert type="success"  />
//       <Alert type="error" />
//     </>
//   );
// }
// src/components/App.tsx

// import Button from "./Button";

// export default function App() {
//   return (
//     <>
//       <Button variant="primary" text="Login" />
//       <Button variant="secondary" text="Follow" />
//     </>
//   );
// }
// src/components/App.tsx

// export default function App() {

//   const handleClick = () => {
//     console.log("I'm a button!");
//   };

//   return <button onClick={handleClick}>Click me!</button>;
// }
// export default function App() {
//   const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
//     console.log("Clicked!", event);
//     console.log("Target:", event.target); // сам <button>
//   };

//   return <button onClick={handleClick}>Click me!</button>;
// }
// import { useState } from "react";

// export default function App() {
//   const [clicks, setClicks] = useState<number>(0);

//   const handleClick = () => {
//     setClicks(clicks + 1);
//   };

//   return <button onClick={handleClick}>Current: {clicks}</button>;
// }
// import { useState } from "react";
// import ClickCounter from "./ClickCounter";

// export default function App() {
//   const [clicks, setClicks] = useState(0);

//   const handleClick = () => {
//     setClicks(clicks + 1);
//   };

//   return (
//     <>
//       <ClickCounter value={clicks} onUpdate={handleClick}/>
//       <ClickCounter value={clicks} onUpdate={handleClick} />
//     </>
//   );
// }
// import { useState } from "react";

// export default function App() {
//   const [count, setCount] = useState(0);
//   const [isOpen, setIsOpen] = useState(false);

//   const handleClick = () => {
//     setCount(count + 1);
//   };

//   const toggleMessage = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <>
//       <button onClick={handleClick}>Clicked: {count}</button>
//       <button onClick={toggleMessage}>
//         {isOpen ? "Hide message" : "Show message"}
//       </button>

//       {isOpen && <p>🎉 Surprise! You toggled me.</p>}
//     </>
//   );
// }

// import { useState } from "react";

// interface Values {
//   x: number;
//   y: number;
// }

// export default function App() {
//   const [values, setValues] = useState<Values>({ x: 0, y: 0 });

  // const updateX = () => {
  //   setValues({
  //     ...values,
  //     x: values.x + 1,
  //   });
  // };
  // const updateY = () => {
  //   setValues({
  //     ...values,
  //     y: values.y + 1,
  //   });
  //  };
//   const updateValue = (key: keyof Values) => {
//     setValues({
//       ...values,
//       [key]: values[key] + 1,
//     });
// }

//   return (
//  <div>
//       <p>x: {values.x}, y: {values.y}</p>
//       <button onClick={() => updateValue("x")}>Update x</button>
//       <button onClick={() => updateValue("y")}>Update y</button>
//     </div>
//   );
// }
// export default function App() {
//   const handleSubmit = (event:
//     React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     const form = event.currentTarget;

//     const formData = new FormData(form);
//     const username = formData.get("username");
//     console.log("Username:", username);

//     form.reset();
//   };

//   return (
// <form onSubmit={handleSubmit}>
//       <input type="text" name="username" />
//       <button type="submit">Submit</button>
//     </form>
//   );
// }

// export default function App() {
//   const handleSubmit = (formData: FormData) => {
//     const username = formData.get("username") as string;
//     console.log("Name:", username);
//   };

//   return (
//     <form action={handleSubmit}>
//       <input type="text" name="username" />
//       <button type="submit">Submit</button>
//     </form>
//   )
// }

// export default function App() {
//   const handleSubmit = (formData: FormData) => {
//     const username = formData.get("username") as string;
//     console.log("Name:", username);
//   };

//   return (
//     <form action={handleSubmit}>
//       <input type="text" name="username" defaultValue="John Doe" />
//       <button type="submit">Submit</button>
//     </form>
//   )
// }
// import OrderForm from "./OrderForm";

// export default function App() {
//   const handleOrder = (data: string) => {
//     console.log("Order received from:", data);
//   }
//   return (
//     <>
//       <h1>Place your order</h1>
//       <OrderForm onSubmit={handleOrder} />
//     </>
//   );
// }
// import axios from "axios";
import SearchForm from "./SearchForm";
import { useState } from "react";
import type { Article } from "../types/article";
import ArticleList from "./ArticleList";
import { fetchArticles } from "../services/articleService";

export default function App() {
  const [articles, setArticles] = useState <Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  
  const handleSearch = async (topic: string) => {

    try {
      setIsLoading(true);
      setIsError(false);
      
      const data = await fetchArticles(topic);
      setArticles(data);
    } catch {
      setIsError(true);
    } finally {
setIsLoading(false);
    }
  };
  return (
    <>
      <SearchForm onSubmit={handleSearch} />
      {isLoading && <p>Loading data, please wait...</p>}
      {isError && <p>Whoops, something went wrong! Please try again!</p>}
    {articles.length > 0 && <ArticleList items={articles} /> }
    </>
  );

}