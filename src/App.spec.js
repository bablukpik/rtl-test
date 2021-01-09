import React from 'react';
import { render, screen } from '@testing-library/react';
import ReactDom from 'react-dom';
import { getQueriesForElement } from '@testing-library/dom'
import App from './App';
import { Provider } from 'react-redux';
import store from './store';

// Raw Basic
test('Basic', () => {
  const actual = true;
  const expected = true;
  if(actual !== expected) {
    throw new Error(`${actual} is not equal to ${expected}`);
  }
});

// Jest Basic
test('Jest Basic', () => {
  const actual = true;
  const expected = false;
  expect(actual).not.toBe(expected);
});

// Using ReactDom + Jest
test('Using ReactDom + Jest', () => {
  const root = document.createElement("div");
  ReactDom.render(
    <Provider store={store}>
      <App />
    </Provider>,
    root);

  const actual = root.querySelector("a").textContent;
  const expected = "Learn React";
  expect(actual).toBe(expected);
});

// Refactor ReactDom + Jest
test('Refactor ReactDom + Jest', () => {
  const root = document.createElement("div");
  const render = (component) => {
  ReactDom.render(
    <Provider store={store}>
      {component}
    </Provider>,
    root);
  };
  render(<App />);
  const actual = root.querySelector("a").textContent;
  const expected = "Learn React";
  expect(actual).toBe(expected);
});

// ReactDom + Jest + DTL
test('ReactDom + Jest + DTL', () => {
  const render = (component) => {
    const root = document.createElement("div");
    ReactDom.render(
      <Provider store={store}>
        {component}
      </Provider>,
      root
    );
    return getQueriesForElement(root);
  };
  const c = render(<App />);
  const actual = c.getByText('Learn React');
  expect(actual).not.toBeNull();
});

// Refactor ReactDom + Jest + DTL
test('Refactor ReactDom + Jest + DTL', () => {
  const render = (component) => {
    const root = document.createElement("div");
    ReactDom.render(
      <Provider store={store}>
        {component}
      </Provider>,
      root
    );
    return getQueriesForElement(root);
  };
  const {getByText} = render(<App />);
  getByText('Learn React');
});

// Jest + RTL
test('renders learn react link', () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
  expect(linkElement).toHaveTextContent('Learn React');
});

test("everything is a node", () => {
  const Foo = () => <div>Hello</div>;
  render(<Foo />);
  expect(screen.getByText("Hello")).toBeInstanceOf(Node);
});

test("the button has type of reset", () => {
  const ResetButton = () => (
    <button type="reset">
      <div>Reset</div>
    </button>
  );
  render(<ResetButton />);
  const node = screen.getByText("Reset");
  expect(node.closest("button")).toHaveProperty("type", "reset");
});

// Snapshot
test("Snapshot", ()=>{
  const view =  render(
    <Provider store={store}>
      <App />
    </Provider>);
  expect(view.getByText('Learn React')).toMatchSnapshot();
  expect(view.asFragment()).toMatchSnapshot();
});


