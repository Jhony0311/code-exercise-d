1. What is the difference between Component and PureComponent? Give an example where it might break my app.
- They are similar, pure component instead of letting you diff to avoid rerenders will skip next renders if props and state are the same. For example if your are trying to a component for complex values like object it might fail to diff props correctly.

Using a pure component without considering it might break your app because a component will not update when you expect it to update.

2. Context + ShouldComponentUpdate might be dangerous. Why is that?
- 

3. Describe 3 ways to pass information from a component to its PARENT.
- Event handler, context and render props

4. Give 2 ways to prevent components from re-rendering.
- Use the memo utility, use class component lifecycle methods to prevent re renders

5. What is a fragment and why do we need it? Give an example where it might break my app.
- Is a way to wrap two elements without a physical parent. It might break your app if you try to render those elements without it because is not valid, the reason is JSX cannot transpile to create react element to render that.

6. Give 3 examples of the HOC pattern.
- You want to access a context (better with hooks), you want to share functionality between components, you want to compose complexity separating it from the component render logic

7. What's the difference in handling exceptions in promises, callbacks and async...await?
- In promises you have the catch or error callback method. In callbacks you rely in the callback implementation but the normal convention for Node is that error will come as first parameter of the callback. With async await you have to try catch to get the exception

8. How many arguments does setState take and why is it async.
- Set state for class components can take 2 arguments, first one is the payload and second one is the callback function that will be called after state change is committed. setState is async since React is the one in charge of batching change operations, so every setState is scheduled and batched with others if necessary by React.

9. List the steps needed to migrate a Class to Function Component.
- Replace state with hooks, then replace any lifecycle methods with it logic counterpart with effects, finally replace any class internals with refs or other alternatives if needed.

10. List a few ways styles can be used with components.
- You can do regular css with targets like classes and ids, just importing the css file related to that component. For more safety you might do css modules to avoid style clashing. There are options to do CSS in JS also to couple styles and logic. If willing to, there is also the option of doing inline styles via style attribute of elements.

11. How to render an HTML string coming from the server.
- With the renderToString function from react-dom