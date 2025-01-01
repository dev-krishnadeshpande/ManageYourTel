import { useMoveBack } from "../hooks/useMoveBack";
import "./page-not-found.css";

const PageNotFound = () => {
  const moveBack = useMoveBack();

  return (
    <main className="page-not-found-container">
      <div className="page-not-found-content">
        <h1>The page you are looking for could not be found 😢</h1>
        <button onClick={moveBack} size="large">
          &larr; Go back
        </button>
      </div>
    </main>
  );
};

export default PageNotFound;
