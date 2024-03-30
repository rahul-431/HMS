import GlobalStyles from "./styles/GlobalStyle";

// global style component does not except child components so we need to add as a sibling
// to the main div component
export default function App() {
  return (
    <>
      <GlobalStyles />
      <div>
        <h1>This is a first app</h1>
      </div>
    </>
  );
}
