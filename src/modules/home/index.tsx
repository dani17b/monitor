import React, { useEffect, useState } from "react";
import "./home.css";
import { Artifact } from "../../components/artifact";
import {
  Button,
  Chip,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  useDisclosure,
} from "@nextui-org/react";
import { ArtifactForm } from "../../components/artifactForm";
import { useConfig } from "../../context/ConfigContext";

export const Home = () => {
  const [artifacts, setArtifacts] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isArtifactFormOpen, setIsArtifactFormOpen] = useState(false);

  const [pendingDeployments, setPendingDeployments] = useState<any[]>([]);
  const [pendingDeploymentsLoading, setPendingDeploymentsLoading] = useState(true);

  const [showDeployLog, setShowDeployLog] = useState(false);
  const [deployLogData, setDeployLogData] = useState<any>(null);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedArtifact, setSelectedArtifact] = useState<any>(null);

  const config = useConfig();
  const getPendingDeployments = () => {
    fetch(`${config.apiURL}/pending_deployments`).then((response) => response.json()).then((data) => {
      setPendingDeployments(data);
      setPendingDeploymentsLoading(false);
    });
  }

  const getDeploymentLog = (deployKey : string) => {
    fetch(`${config.apiURL}/deploy_log?deploy_key=${deployKey}`).then((response) => response.text()).then((data) => {
      setDeployLogData(data);
    });
  }

  useEffect(() => {
    fetch(`${config.apiURL}/info`)
      .then((response) => response.json())
      .then((data) => {
        setArtifacts(data);
        setLoading(false);
      });

    getPendingDeployments();
  }, []);

  useEffect(() => {
    const pendingDeploymentsInteval = setInterval(() => {
      getPendingDeployments();
    }
    , 5000);

    return () => clearInterval(pendingDeploymentsInteval)
  }, []);

  useEffect(() => {
    const getDeploymentLogInterval = setInterval(() => {
      if(showDeployLog){
        getDeploymentLog(pendingDeployments[0].key);
      }
    }
    , 2000);

    return () => clearInterval(getDeploymentLogInterval)
  }, [showDeployLog]);

  const deploy = (artifact: any) => {
    fetch(`${config.apiURL}/deploy`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        artifactName: artifact.artifactName,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        getPendingDeployments();
      });
  };

  return (
    <div className="home">
      {loading && <div>Loading...</div>}
      <div className="flex gap-2 mb-2">
        {pendingDeployments.map((deployment: any) => (
          <Chip
            key={deployment.key}
            className={"rounded-none text-white" + (deployment.status === "running" ? ' cursor-pointer' : '')}
            onClick={deployment.status === "running" ? () => {
              setShowDeployLog(true);
              getDeploymentLog(deployment.key);
            } : undefined}
            color={
              deployment.status === "pending"
                ? "warning"
                : deployment.status === "running"
                ? "primary"
                : "default"
            }
            onClose={deployment.status === "pending" ? () => {
              fetch(`${config.apiURL}/pending_deployments`, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  key: deployment.key,
                }),
              }).then(() => {
                getPendingDeployments();
              });
            } : undefined}
          >
            <div className="flex items-center gap-1">
              {deployment.status === "running" &&
                <Spinner size="sm" color="white" className="mr-1"/>
              }
              {deployment.key}
            </div>
          </Chip>
        ))}
      </div>
      {!loading && artifacts && (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
          {Object.keys(artifacts).map((artifactKey: string) => (
            <Artifact
              key={artifactKey}
              artifact={artifacts[artifactKey]}
              deploy={() => {
                setSelectedArtifact(artifacts[artifactKey]);
                onOpen();
              }}
              showEditArtifact={() => {
                setSelectedArtifact(artifacts[artifactKey]);
                setIsArtifactFormOpen(true);
              }}
              showLogs={() => {
                setShowDeployLog(true);
                getDeploymentLog(artifacts[artifactKey].instance.lastDeployKey);
              }}
            />
          ))}
        </div>
      )}
      
        <Modal
          isOpen={showDeployLog}
          onOpenChange={() => setShowDeployLog(false)}
          className="rounded-none"
          scrollBehavior="inside"
          size="5xl"
          >
             {showDeployLog && (
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Deploy
                </ModalHeader>
                <ModalBody>
                  {deployLogData && deployLogData.split("\n").map((line : string, key : any) => (
                    <div key={key}>{line}<br/></div>
                  ))}
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        )}
          </Modal>

      <div className="flex justify-end mt-2">
        <Button onPress={() => setIsArtifactFormOpen(true)}>
          Nuevo artefacto
        </Button>
      </div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="rounded-none"
      >
        {selectedArtifact && (
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Deploy
                </ModalHeader>
                <ModalBody>
                  <Input
                    label="Artifact"
                    placeholder="Enter your name"
                    value={selectedArtifact.artifactName}
                    readOnly
                    disabled
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    color="primary"
                    onPress={() => {
                      onClose();
                      deploy(selectedArtifact);
                    }}
                  >
                    Deploy
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        )}
      </Modal>
      <ArtifactForm
        visible={isArtifactFormOpen}
        onClose={() => {
          setIsArtifactFormOpen(false);
          setSelectedArtifact(null);
        }}
        artifact={selectedArtifact}
        deploy={(artifactInfo: any) => {
          fetch(`${config.apiURL}/artifact`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(artifactInfo),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
            });
        }}
      />
    </div>
  );
};
