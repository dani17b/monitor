import './artifact.css';

export const Artifact = ({ artifact } : {artifact : any}) => {
    return (
      <div className="artifact">
        <h2>{JSON.stringify(artifact)}</h2>
      </div>
    );
  }