import React, { useEffect, useState } from 'react';
import './home.css';
import { Artifact } from '../../components/artifact';

export const Home = () => {
  const [artifacts, setArtifacts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://api.monitor.altiacamp.com/info').then((response) => response.json()).then((data) => {
      setArtifacts(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="home">
      {loading && <div>Loading...</div>}
      {!loading && artifacts && Object.keys(artifacts).map((artifactKey : string) => 
        <Artifact key={artifactKey} artifact={artifacts[artifactKey]} />
      )}
      
    </div>
  );
}
